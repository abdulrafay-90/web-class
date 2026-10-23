// 1. Print numbers 1 to 10  
// Write a program using a for loop to print numbers from 1 to 10.

for (let i=1; i<=10; i++){
    console.log(i);
}

// 2. Sum of first N numbers  
// Use a while loop to calculate the sum of the first N natural numbers.

let n=5;
let i=1;
let sum=0;
while(i<=num){
    sum=sum+i;
    i++;
}
console.log("Sum is:"+sum);
// 3. Multiplication table  
// Print the multiplication table of a given number using a for loop.

let num2=3;
for(let i=1; i<=10;i++){
    console.log(num2 + " x " + i + " = " +(num2*i))
}
// 4. Factorial calculation  
// Write a program using a while loop to find the factorial of a given number.
let num3=4;
let fact=1;
while(num3>0){
    fact=fact*num3;
    i--;
}
console.log("Factorial ="+fact);
// 5. Reverse counting  
// Print numbers from 10 down to 1 using a for loop.
 for(let i=10; i >=1;i--){
    console.log(i);
 }
// 6. Even numbers up to N  
// Use a do-while loop to print all even numbers up to N.
let num4=10;
let e = 2;
do{
    console.log(e);
    e=e+2;
}
while(e<=num4);

// 7. Sum of digits  
// Write a program using a while loop to calculate the sum of digits of a given number.

let num5 = 1234;
let sum1=0;
while(num5>0){
    let digit=num5%10;
    sum1= sum1+digit;
    num5=Math.floor(num5/10);
}
console.log("sum of Digits=",sum1);

// 8. Fibonacci series  
// Generate the first 10 terms of the Fibonacci series using a for loop.

let c=0;
let d=1;
for(let i = 1;i<=10;i++){
    console.log(c);
    let next=c+d;
    c=d;
    d=next;
}
// 9. Guessing game  
// Use a do-while loop to keep asking the user for a number until they guess the correct one.
// Q9: Guess the correct number

let correct = 7;
let guess;
do {
    guess = 7;
} while (guess !== correct);

console.log("Correct Guess!");

// 10. Prime number check  
// Write a program using a for loop to check if a given number is prime.

let num6 = 7;
let prime = true;
if (num6 <= 1) {
    prime = false;
}
for (let i = 2; i < num6; i++) {
    if (num6 % i === 0) {
        prime = false;
        break;
    }
}
if (prime) {
    console.log("Prime Number");
} else {
    console.log("Not a Prime Number");
}