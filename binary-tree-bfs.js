// Definition for a binary tree node
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Performs a BFS traversal of a binary tree.
 * @param {TreeNode} root - The root node of the binary tree
 * @returns {number[]} - Array of values in BFS order
 */
function breadthFirstSearch(root) {
    // Handle empty tree case
    if (!root) {
        return [];
    }
    
    // Initialize queue with root node and result array
    const queue = [root];
    const result = [];
    
    // Continue BFS while there are nodes in the queue
    while (queue.length > 0) {
        // Get the current level size
        const levelSize = queue.length;
        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            // Remove the first node from queue
            const current = queue.shift();
            // Add current node's value to result
            result.push(current.val);
            // Add left child to queue if it exists
            if (current.left) {
                queue.append(current.left);
            }
            // Add right child to queue if it exists
            if (current.right) {
                queue.append(current.right);
            }
        }
    }
    
    return result;
}

// Example usage
function example() {
    // Create a sample binary tree:
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6
    
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    
    // Perform BFS
    const result = breadthFirstSearch(root);
    console.log("BFS traversal:", result); // Output: [1, 2, 3, 4, 5, 6]
}

// Run the example
example();