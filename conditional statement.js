//1. Write a program that checks if a number is positive, negative, or zero.
let num=6;
if(num>0){
    console.log(`${num} Positive Number.`);
}
else if(num<0){
    console.log(`${num}Negative Number.`);
}
else {
    console.log(`${num}Zero`);
}
//2. Even or odd check  
//Using an if-else statement, determine whether a given integer is even or odd.

let num1=7;
if(num1%2 ==0 ){
    console.log(`${num1} is an even number`);
}
else{
     console.log(`${num1} is an odd number`);
}
//3. Largest of two numbers  
//Write a program that takes two numbers and prints the larger one using conditional statements.

let a=23;
let b=45;
if(a>b){
    console.log(a+" "+"is a larger.");
}
else if(b>a){
    console.log(b+" "+"is a larger.")
}
else{
    console.log("Both a and b are equal.")
}
//4. Grade evaluation  
//Using if-else-if, assign grades (A, B, C, D, F) based on a student’s percentage score.

let marks= 80;
if(marks>=80){
    console.log(marks+" "+"Grade A+");
}
else if(marks>=70){
     console.log(marks+" "+"Grade A");
}
else if(marks>=60){
     console.log(marks+" "+"Grade B");
}
else if(marks>=50){
     console.log(marks+" "+"Grade C");
}
else if(marks>=40){
     console.log(marks+" "+"Grade D");
}
else{
    console.log("Fail.")
}

// 5. Leap year check  
// Write a program that checks if a given year is a leap year using conditional statements.

let year= 2016;
if(year%400==0 || (year%4==0 && year%100 !=0)){
    console.log("Leap year.");
}
else{
    console.log("Not a leap year.");
}

// 6. Day of week switch  
// Use a switch-case to print the name of the day when given a number (1 = Monday, 2 = Tuesday, … 7 = Sunday).

let day="Sunday";
switch(day){
    case "Monday":
        console.log("Monday");
        break;
    case "Tuesday":
        console.log("Tuesday");  
        break; 
     case "Wednesday":
        console.log("Wednesday");  
        break;  
     case "Thursday":
        console.log("Thursday");  
        break;   
     case "Friday":
        console.log("Friday");  
        break;  
     case "Saturday":
        console.log("Saturday");  
        break;  
     case "Sunday":
        console.log("Sunday");  
        break; 
    default:
        console.log("Invalid day.");     
}

// 7. Calculator switch  
// Create a simple calculator using switch-case that performs addition, subtraction, multiplication, or division based on user input.

let x = 23;
let y = 45;
let op= '+';
switch(op){
case '+':
    console.log(x+y);
    break;
case '-':
    console.log(x-y);
    break;
case '*':
    console.log(x*y);
    break;
case '/':
    console.log(x/y);
    break;
default:
    console.log("Invalid Operation.")
}

// 8. Vowel or consonant  
// Write a program that checks whether a given character is a vowel or consonant using switch-case.

let ch="e";
switch(ch){
    case "a":
        console.log(ch+" "+"Vowel");
        break;
    case "e":
        console.log(ch+" "+"Vowel");
        break;
    case "i":
        console.log(ch+" "+"Vowel");
        break;
    case "o":
       console.log(ch+" "+"Vowel");
        break;
    case "u":
        console.log(ch+" "+"Vowel");
        break;
    default:
        console.log("It's not a vowel.");   
}

// 9. Traffic light system  
// Using switch-case, print instructions based on traffic light color (Red = Stop, Yellow = Wait, Green = Go).

let color= "Yellow";
switch(color){
    case "Red":
        console.log(color+" "+"Mean Stop.");
        break;
     case "Yellow":
        console.log(color+" "+"Mean Wait.");
        break;
     case "Green":
        console.log(color+" "+"Mean Go.");
        break;
    default:
        console.log("Invalid Color");
}


// 10. Menu-driven program  
// Write a program using switch-case where the user selects from a menu (e.g., 1 = Check Balance, 2 = Deposit, 3 = Withdraw, 4 = Exit).

let choice1= "Check Balance";
let choice2= "Deposit";
let choice3= "Withdraw";
let choice4= "Exit";
let choice=choice2;
let Balance = 10000;
console.log(choice2+ "..." + "Option is Selected.")
switch(choice){
    case "Check Balance":
        console.log("Balance:"+ Balance);
        break;
    case "Deposit":
        console.log("Deposit selected");
        break;
     case "Withdraw":
        console.log("Withdraw selected");
        break;
     case "Exit":
        console.log("Thank You");
        break;
    default:{
        console.log("Invalid Choice.");
    }      
}