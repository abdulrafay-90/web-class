"use strict";
const $ = (s) => document.querySelector(s);
const el = {
  form: $("#searchForm"),
  input: $("#cityInput"),
  btn: $("#searchButton"),
  btnText: $("#searchButtonText"),
  spin: $("#searchSpinner"),
  status: $("#statusMessage"),
  empty: $("#emptyState"),
  panel: $("#weatherPanel"),
  list: $("#forecastList"),
  recentWrap: $("#recentWrap"),
  recent: $("#recentList"),
  geo: $("#geoButton"),
  unit: $("#unitToggle"),
};

// ---------- State & storage ----------
const store = {
  get(k, d) {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* storage blocked */
    }
  },
};
let unit = store.get("cloudline-unit", "C");
let recent = store.get("cloudline-recent", []);
let current = null; // { place, data } -> re-rendered when unit changes
let controller = null; // cancels outdated requests

// ---------- Helpers ----------
const temp = (c) => Math.round(unit === "F" ? (c * 9) / 5 + 32 : c);
const text = (sel, v) => {
  $(sel).textContent = v;
};

async function fetchJSON(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok)
    throw new Error(`Server returned HTTP ${res.status}. Please try again.`);
  return res.json();
}

async function findCity(name, signal) {
  const q = new URLSearchParams({
    name,
    count: "1",
    language: "en",
    format: "json",
  });
  const data = await fetchJSON(
    `https://geocoding-api.open-meteo.com/v1/search?${q}`,
    signal,
  );
  if (!Array.isArray(data.results) || !data.results.length)
    throw new Error(`No city found for “${name}”. Please check the spelling.`);
  return data.results[0];
}

async function getWeather(lat, lon, signal) {
  const q = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "5",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
  });
  const d = await fetchJSON(
    `https://api.open-meteo.com/v1/forecast?${q}`,
    signal,
  );
  if (!d.current || !d.daily || !Array.isArray(d.daily.time))
    throw new Error("Weather data is unavailable right now. Please try later.");
  return d;
}

function getWeatherInfo(code, isDay = true) {
  if (code === 0)
    return { description: "Clear sky", icon: isDay ? "☀️" : "🌙" };
  if (code === 1)
    return { description: "Mainly clear", icon: isDay ? "🌤️" : "🌙" };
  if (code === 2) return { description: "Partly cloudy", icon: "⛅" };
  if (code === 3) return { description: "Overcast", icon: "☁️" };
  if ([45, 48].includes(code)) return { description: "Foggy", icon: "🌫️" };
  if ([51, 53, 55, 56, 57].includes(code))
    return { description: "Drizzle", icon: "🌦️" };
  if ([61, 63, 65, 66, 67].includes(code))
    return { description: "Rainy", icon: "🌧️" };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { description: "Snowy", icon: "❄️" };
  if ([80, 81, 82].includes(code))
    return { description: "Rain showers", icon: "🌦️" };
  if ([95, 96, 99].includes(code))
    return { description: "Thunderstorm", icon: "⛈️" };
  return { description: "Weather conditions", icon: "🌤️" };
}

const fmtDate = (s, o) =>
  new Intl.DateTimeFormat("en-US", o).format(new Date(`${s}T12:00:00`));

function setStatus(msg, isError = false) {
  el.status.textContent = msg;
  el.status.classList.toggle("is-error", isError);
  el.status.hidden = !msg;
}
function setLoading(on) {
  el.btn.disabled = el.geo.disabled = on;
  el.btnText.textContent = on ? "Loading..." : "Get weather";
  el.spin.hidden = !on;
  el.form.setAttribute("aria-busy", String(on));
}

// ---------- Rendering ----------
function makeEl(tag, cls, content) {
  const n = document.createElement(tag);
  n.className = cls;
  if (content !== undefined) n.textContent = content;
  return n;
}

function render() {
  if (!current) return;
  const { place, data } = current;
  const c = data.current,
    isDay = c.is_day === 1;
  const info = getWeatherInfo(c.weather_code, isDay);
  const u = `°${unit}`;

  text("#current-heading", place.name);
  text(
    "#countryName",
    [place.admin1, place.country].filter(Boolean).join(", "),
  );
  text("#localTime", `${(c.time || "").split("T")[1] || "Now"} local`);
  text("#temperature", `${temp(c.temperature_2m)}°`);
  text("#weatherDescription", info.description);
  text("#feelsLike", `${temp(c.apparent_temperature)}${u}`);
  text("#humidity", `${Math.round(c.relative_humidity_2m)}%`);
  text("#windSpeed", `${Math.round(c.wind_speed_10m)} km/h`);
  text("#precipitation", `${c.precipitation} mm`);
  text("#weatherIcon", info.icon);
  $("#weatherIcon").setAttribute("aria-label", info.description);
  document.body.dataset.theme = isDay ? "day" : "night";

  el.list.replaceChildren();
  data.daily.time.forEach((date, i) => {
    const d = getWeatherInfo(data.daily.weather_code[i]);
    const card = makeEl("article", "forecast-day");
    const icon = makeEl("p", "forecast-icon", d.icon);
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", d.description);
    const temps = makeEl("div", "forecast-temps");
    temps.append(
      makeEl("span", "", `${temp(data.daily.temperature_2m_max[i])}°`),
      makeEl(
        "span",
        "forecast-low",
        `${temp(data.daily.temperature_2m_min[i])}°`,
      ),
    );
    card.append(
      makeEl(
        "p",
        "forecast-name",
        i === 0 ? "Today" : fmtDate(date, { weekday: "short" }),
      ),
      makeEl(
        "p",
        "forecast-date",
        fmtDate(date, { month: "short", day: "numeric" }),
      ),
      icon,
      makeEl("p", "forecast-condition", d.description),
      temps,
    );
    el.list.append(card);
  });
  el.empty.hidden = true;
  el.panel.hidden = false;
}

function renderRecent() {
  el.recent.replaceChildren();
  recent.forEach((name) => {
    const b = makeEl("button", "chip", name);
    b.type = "button";
    b.addEventListener("click", () => {
      el.input.value = name;
      searchWeather(name);
    });
    el.recent.append(b);
  });
  el.recentWrap.hidden = recent.length === 0;
}

function remember(name) {
  recent = [
    name,
    ...recent.filter((n) => n.toLowerCase() !== name.toLowerCase()),
  ].slice(0, 4);
  store.set("cloudline-recent", recent);
  renderRecent();
}

// ---------- Main flows ----------
async function load(task, label) {
  controller?.abort();
  const mine = (controller = new AbortController());
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    mine.abort();
  }, 10000);
  setLoading(true);
  setStatus(label);
  try {
    current = await task(mine.signal);
    render();
    setStatus("");
    return true;
  } catch (err) {
    if (err.name === "AbortError" && !timedOut) return false; // replaced by a newer search
    setStatus(
      timedOut
        ? "The request timed out. Check your connection."
        : err.message || "Something went wrong.",
      true,
    );
    return false;
  } finally {
    clearTimeout(timer);
    if (controller === mine) {
      setLoading(false);
      controller = null;
    }
  }
}

async function searchWeather(name) {
  const city = name.trim();
  if (!city) {
    setStatus("Please enter a city name.", true);
    el.input.focus();
    return;
  }
  const ok = await load(async (signal) => {
    const place = await findCity(city, signal);
    return {
      place,
      data: await getWeather(place.latitude, place.longitude, signal),
    };
  }, `Finding weather for ${city}...`);
  if (ok) remember(current.place.name);
}

function useMyLocation() {
  if (!navigator.geolocation) {
    setStatus("Geolocation is not supported in this browser.", true);
    return;
  }
  setStatus("Getting your location...");
  navigator.geolocation.getCurrentPosition(
    ({ coords }) =>
      load(
        async (signal) => ({
          place: {
            name: "Your location",
            country: `${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)}`,
          },
          data: await getWeather(coords.latitude, coords.longitude, signal),
        }),
        "Loading weather for your location...",
      ),
    () =>
      setStatus("Location permission denied. Search for a city instead.", true),
    { timeout: 10000 },
  );
}

// ---------- Events ----------
el.form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchWeather(el.input.value);
});
document.querySelectorAll(".chip[data-city]").forEach((b) =>
  b.addEventListener("click", () => {
    el.input.value = b.dataset.city;
    searchWeather(b.dataset.city);
  }),
);
el.geo.addEventListener("click", useMyLocation);
el.unit.addEventListener("click", () => {
  unit = unit === "C" ? "F" : "C";
  store.set("cloudline-unit", unit);
  el.unit.textContent = `°${unit}`;
  render();
});

el.unit.textContent = `°${unit}`;
renderRecent();
el.input.value = "Karachi";
searchWeather("Karachi");
