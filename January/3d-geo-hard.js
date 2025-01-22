// 3D Geospatial Data Integration
// Description
// You are tasked with developing a function that integrates multiple geospatial data sources into a unified 3D visualization model. The data sources include design files, aerial imagery, and other project-relevant data. Your function should efficiently merge these data sources, ensuring that the resulting model is optimized for rendering in a web-based 3D visualization tool.

// The function should take in a list of data sources, each represented as a 3D matrix of integers, where each integer represents a specific data point's elevation. The goal is to merge these matrices into a single 3D matrix that represents the combined elevation data.

// Constraints
// The number of data sources (matrices) will not exceed 100.
// Each matrix will have dimensions of at most 100x100x100.
// Elevation values are integers ranging from -1000 to 1000.
// Examples
// Example 1:

// Input: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
// Output: [[6, 8], [10, 12]]
// Example 2:

// Input: [[[0, 0, 0], [0, 0, 0]], [[1, 1, 1], [1, 1, 1]], [[2, 2, 2], [2, 2, 2]]]
// Output: [[3, 3, 3], [3, 3, 3]]|


function mergeGeospatialData(dataSources) {
    if (!dataSources || dataSources.length === 0) return [];
    
    // Determine the maximum dimensions
    let maxX = 0, maxY = 0, maxZ = 1; // Default depth to 1 for 2D matrices
    for (const matrix of dataSources) {
        const is3D = Array.isArray(matrix[0][0]); // Check if it's 3D
        maxX = Math.max(maxX, matrix.length);
        maxY = Math.max(maxY, matrix[0]?.length || 0);
        maxZ = is3D ? Math.max(maxZ, matrix[0][0]?.length || 0) : Math.max(maxZ, 1);
    }

    // Initialize the result matrix with zeros
    const result = Array.from({ length: maxX }, () => 
        Array.from({ length: maxY }, () => 
            Array.from({ length: maxZ }, () => 0)
        )
    );

    // Add each matrix to the result
    for (const matrix of dataSources) {
        const is3D = Array.isArray(matrix[0][0]); // Check if it's 3D
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < (matrix[i]?.length || 0); j++) {
                if (is3D) {
                    // Add values for 3D matrices
                    for (let k = 0; k < (matrix[i][j]?.length || 0); k++) {
                        result[i][j][k] += matrix[i][j][k];
                    }
                } else {
                    // Add values for 2D matrices (treat depth as 1)
                    result[i][j][0] += matrix[i][j];
                }
            }
        }
    }

    return result;
}

// Test cases
const testCases = [
    // Case 1: Mixed 2D and 3D matrices
    { 
        input: [
            [[1, 2], [3, 4]], // 2D matrix
            [[[5, 6], [7, 8]], [[9, 10], [11, 12]]] // 3D matrix
        ], 
        expected: [[[6, 8], [10, 12]], [[9, 10], [11, 12]]]
    },
    // Case 2: Only 2D matrices
    { 
        input: [
            [[1, 2], [3, 4]],
            [[5, 6], [7, 8]]
        ], 
        expected: [[[6, 8]], [[10, 12]]]
    },
    // Case 3: Only 3D matrices
    { 
        input: [
            [[[0, 0, 0]], [[1, 1, 1]]],
            [[[2, 2, 2], [3, 3, 3]], [[4, 4, 4]]]
        ], 
        expected: [[[2, 2, 2], [3, 3, 3]], [[5, 5, 5]]]
    }
];

// Test runner
for (const { input, expected } of testCases) {
    const result = mergeGeospatialData(input);
    console.log(result.toString() === expected.toString() ? 'Pass' : 'Fail');
}