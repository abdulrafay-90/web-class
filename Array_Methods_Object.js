// 1. Create a function that takes an array of numbers and returns a new array where each number is squared. Use map method.
function squareNumber (numbers){
    return numbers.map(num => num*num);
}
let number=[2,3,4,5];
let result = squareNumber(number);
console.log(result);

// 2. Write a function that takes an array of objects with name and age properties. Filter out only the users whose age is greater than 18.

function filterUser(user){
    return user.map( user => user.age > 18);
}
let user =[
    {name:"Ali", age:16},
    {name:"Abdul Rafay", age:21},
    {name:"Sara", age:17},
    {name:"Osman", age:20}
];
let result1=filterUser(user);
console.log(result1);


// 3. Given an array of products with price, use reduce to calculate the total price of all products.
let product=[
    {name:"laptop",price:50000},
    {name:"Mouse",price:1000},
    {name:"Keyboard", price:2000}
];
let total= product.reduce((sum,product)=>{
    return sum+ product.price;
},0);
console.log(total);

// 4. Create an array of students with marks. Sort the array in descending order based on marks.

let students =[
    { name: "Ali", marks:75},
    {name:"Rafay", marks:90},
    {name:"Sara", marks:85},
    {name:"Osman",marks:60}
];

students.sort((a,b)=>b.marks-a.marks);
console.log(students);

// 5. Write a function that takes an array of strings and finds the first string with length greater than 5 using find method.

function findString(words){
    return words.find(words => words.length > 5);
}
let words=["Apple","Banana","Cat","Orange"];
let result2 = findString(words);
console.log(result2);



// 6. Create an object named person with properties firstName, lastName and a method fullName that returns the full name using this keyword. Explain how this works in this context.

let person ={
    firstName:"Abdul",
    LastName:"Rafay",

    fullname:function(){
        return this.firstName+ " " +this.LastName;

    }
};
console.log(person.fullname());

// 7. What will be the output of this code and why? Create an example to show the difference between regular function and arrow function when using this inside an object.
// Regular Function
let person_1={
    name:"Abdullah",
    greet:function(){
        console.log(this.name);
    }

};
person_1.greet();

// Arrow Function

let person_2 = {
    name: "Ali",
    greet: () => {
        console.log(this.name);
    }
};
person_2.greet();



// 8. Write a function that takes an array of numbers, filters even numbers, then doubles them using map, and finally returns the sum of those doubled numbers using reduce. Do it in a chain.

function calculationSum(nmubers){
    return numbers.filter(num => num %2 ===0)
    .map(num => num*2)
    .reduce((sum,num)=>sum+num,0);
}
let numbers =[1,2,3,4,5,6];

let result3= calculationSum(numbers);
console.log(result3);

// 9. Create an array of employees with name, department and salary. Write code to:
let employees=[
    {name:"Ali", Department:"IT", Salary:50000},
    {name:"Ahmed", Department:"HR", Salary:30000},
    {name:"SAra", Department:"Finance", Salary:40000},
     {name:"Rafay", Department:"HR", Salary:35000},
];
//  a) Find an employee who works in HR department
let hremployee= employees.find(emp => emp.Department ==="HR");
console.log(hremployee);
//  b) Sort employees by salary in ascendin
let sortemployee=[...employees].sort((a,b) => a.Salary-b.Salary);
console.log(sortemployee);

// 10. Create a function that takes an object and returns an array of its keys and values separately, then create a new object from an array of key-value pairs. Use Object.keys, Object.values, and Object.fromEntries
 let person_4={
    name:"Rafay",
    age:22,
    city:"karachi"
 }
 let keys=Object.keys(person_4);

 let values=Object.values(person_4);

 let entries = [
    ["name","Ahmed"],
    ["age",22],
    ["ciyt","lahore"]
 ];
 let newPerson=Object.fromEntries(entries);
 console.log(keys);
 console.log(values);
 console.log(newPerson);




