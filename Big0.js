// O(1) - Constant Time
array[0]                    // Array access
object.key                  // Object property access
Math.max(a, b)             // Simple calculations

// O(log n) - Logarithmic
// Divides problem in half each time
binarySearch(sortedArray)   // Binary search
Math.floor(Math.log(n))    // Getting number of digits

// O(n) - Linear
for (let i = 0; i < n; i++) // Single loop
array.forEach()             // Array iteration
array.map()                 // Array transformation

// O(n log n) - Linearithmic
array.sort()               // Most sorting algorithms
mergeSort(array)           // Merge sort
quickSort(array)           // Quick sort

// O(n²) - Quadratic
// Nested loops over same data
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // do something
    }
}

// O(2ⁿ) - Exponential
// Solutions double with each addition
fibonacci(n)               // Recursive fibonacci
calculateAllSubsets(n)     // Power set

// Common Space Complexity Examples
let x = 5                  // O(1) space
let arr = new Array(n)     // O(n) space
let matrix = Array(n).fill().map(() => Array(n)) // O(n²) space