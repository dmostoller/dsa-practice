// 3D Geospatial Data Integration
// Description
// You are tasked with developing a function that integrates multiple data sources into a single 3D geospatial visualization. Given a list of data points, each represented by its 3D coordinates (x, y, z), your function should return the centroid of these points. The centroid is the average position of all the points in the space.
// Constraints
// * The number of data points will be between 1 and 10^5.
// * Each coordinate (x, y, z) will be an integer between -10^6 and 10^6.
// Examples
// Example 1:
// Input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// Output: [4, 5, 6]
// Example 2:
// Input: [[-1, -2, -3], [1, 2, 3]]
// Output: [0, 0, 0]


function findCentroid(points) {
  // Your code here
}

// Test cases
const testCases = [
  { input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], expected: [4, 5, 6] },
  { input: [[-1, -2, -3], [1, 2, 3]], expected: [0, 0, 0] },
];

// Test runner
for (const { input, expected } of testCases) {
  const result = findCentroid(input);
  console.log(result.toString() === expected.toString() ? 'Pass' : 'Fail');
}


function findCentroid(points) {
    if (points.length === 0) {
        return null; // Handle empty array
    }

    const dimension = points[0].length;

    // Validate points
    for (const point of points) {
        if (point.length !== dimension) {
            throw new Error("All points must have the same number of dimensions");
        }
        if (!point.every(coord => typeof coord === "number")) {
            throw new Error("All coordinates must be numbers");
        }
    }

    // Initialize sums
    const sums = Array(dimension).fill(0);

    // Compute sums for each dimension
    for (const point of points) {
        for (let i = 0; i < dimension; i++) {
            sums[i] += point[i];
        }
    }

    // Compute averages for each dimension
    return sums.map(sum => sum / points.length);
}