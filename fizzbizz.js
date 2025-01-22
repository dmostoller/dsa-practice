/**
 * The FizzBuzz Problem:
 * Write a program that prints numbers from 1 to n.
 * For multiples of 3, print "Fizz" instead of the number.
 * For multiples of 5, print "Buzz" instead of the number.
 * For numbers which are multiples of both 3 and 5, print "FizzBuzz".
 */

// Solution 1: Basic if-else approach
function fizzBuzz1(n) {
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(String(i));
        }
    }
    
    return result;
}

// Solution 2: String concatenation approach (more scalable)
function fizzBuzz2(n) {
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        let str = "";
        
        if (i % 3 === 0) str += "Fizz";
        if (i % 5 === 0) str += "Buzz";
        
        result.push(str || String(i));
    }
    
    return result;
}

// Solution 3: Object-based approach (most maintainable)
function fizzBuzz3(n) {
    const rules = {
        3: "Fizz",
        5: "Buzz"
    };
    
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        let str = Object.entries(rules)
            .reduce((acc, [divisor, word]) => 
                i % Number(divisor) === 0 ? acc + word : acc
            , "");
            
        result.push(str || String(i));
    }
    
    return result;
}

// Solution 4: One-liner using Array methods (clever but less readable)
const fizzBuzz4 = n => Array.from({length: n}, (_, i) => 
    ((i + 1) % 3 ? '' : 'Fizz') + ((i + 1) % 5 ? '' : 'Buzz') || String(i + 1)
);

// Test function to compare all solutions
function testFizzBuzz(n) {
    console.log("Testing FizzBuzz implementations for n =", n);
    
    const solutions = [fizzBuzz1, fizzBuzz2, fizzBuzz3, fizzBuzz4];
    
    solutions.forEach((fn, index) => {
        console.log(`\nSolution ${index + 1}:`);
        console.log(fn(n).join(", "));
    });
}

// Run test for first 15 numbers
testFizzBuzz(15);