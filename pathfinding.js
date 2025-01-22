/**
 * Represents a construction site grid for pathfinding
 * This class implements the A* pathfinding algorithm optimized for construction equipment
 * movement while considering obstacles and terrain constraints.
 */
class ConstructionSite {
    /**
     * Initialize a construction site with a grid of specified dimensions
     * @param {number} width - Width of the construction site grid
     * @param {number} height - Height of the construction site grid
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        // Create a 2D grid filled with default terrain cost of 1
        // Higher numbers could represent harder to traverse terrain
        this.grid = Array(height).fill().map(() => Array(width).fill(1));
        // Using a Set for O(1) lookup time when checking obstacles
        this.obstacles = new Set(); // Stores obstacles as "x,y" strings for efficient lookup
    }

    /**
     * Add an obstacle to the construction site
     * In real applications, this could be materials, other equipment, or restricted areas
     * @param {number} x - X coordinate of the obstacle 
     * @param {number} y - Y coordinate of the obstacle
     */
    addObstacle(x, y) {
        this.obstacles.add(`${x},${y}`);
        this.grid[y][x] = 0; // Mark as impassable in the grid
    }

    /**
     * Implements A* pathfinding algorithm
     * A* is optimal for this use case because it:
     * 1. Guarantees the shortest path (unlike Dijkstra's algorithm)
     * 2. Is more efficient than Dijkstra's by using a heuristic
     * 3. Can handle different terrain costs
     * 
     * @param {Object} start - Starting position {x, y}
     * @param {Object} end - Target position {x, y}
     * @returns {Array} Array of positions forming the optimal path, or null if no path exists
     */
    findOptimalPath(start, end) {
        // openSet contains nodes to be evaluated
        // Using Set for O(1) lookup time
        const openSet = new Set([JSON.stringify(start)]);
        
        // cameFrom stores the best previous node for each node
        // Used to reconstruct the path once we reach the end
        const cameFrom = new Map();
        
        // gScore maps nodes to their cost from start
        // Using Map for O(1) lookup time
        const gScore = new Map();
        gScore.set(JSON.stringify(start), 0);
        
        // fScore = gScore + heuristic
        // Represents our best guess of total path cost through this node
        const fScore = new Map();
        fScore.set(JSON.stringify(start), this.heuristic(start, end));
        
        // Main A* loop
        while (openSet.size > 0) {
            // Find node in openSet with lowest fScore
            // This is the most promising node to explore next
            const current = JSON.parse(
                Array.from(openSet).reduce((a, b) => 
                    (fScore.get(a) || Infinity) < (fScore.get(b) || Infinity) ? a : b
                )
            );
            
            // Check if we've reached our destination
            if (current.x === end.x && current.y === end.y) {
                return this.reconstructPath(cameFrom, current);
            }
            
            // Remove current node from open set since we're processing it
            openSet.delete(JSON.stringify(current));
            
            // Check all possible movements from current position
            for (const neighbor of this.getNeighbors(current)) {
                const neighborStr = JSON.stringify(neighbor);
                
                // Calculate total cost to reach this neighbor through current node
                // Includes terrain cost for more realistic pathfinding
                const tentativeGScore = (gScore.get(JSON.stringify(current)) || Infinity) + 
                    this.getTerrainCost(neighbor);
                
                // If this path to neighbor is better than any previous one
                if (tentativeGScore < (gScore.get(neighborStr) || Infinity)) {
                    // Update our path info
                    cameFrom.set(neighborStr, current);
                    gScore.set(neighborStr, tentativeGScore);
                    fScore.set(neighborStr, tentativeGScore + this.heuristic(neighbor, end));
                    
                    // Add neighbor to openSet if it's not already there
                    if (!openSet.has(neighborStr)) {
                        openSet.add(neighborStr);
                    }
                }
            }
        }
        
        return null; // No valid path exists
    }
    
    /**
     * Get all valid neighboring positions for a given position
     * Includes diagonal movement for more realistic equipment paths
     * Could be modified to consider equipment turning radius
     * @param {Object} pos - Current position {x, y}
     * @returns {Array} Array of valid neighboring positions
     */
    getNeighbors(pos) {
        const neighbors = [];
        // Include both cardinal and diagonal directions
        // Real equipment might have different movement capabilities
        const directions = [
            {x: 0, y: 1},   // down
            {x: 1, y: 0},   // right
            {x: 0, y: -1},  // up
            {x: -1, y: 0},  // left
            {x: 1, y: 1},   // diagonal down-right
            {x: -1, y: 1},  // diagonal down-left
            {x: 1, y: -1},  // diagonal up-right
            {x: -1, y: -1}  // diagonal up-left
        ];
        
        for (const dir of directions) {
            const newX = pos.x + dir.x;
            const newY = pos.y + dir.y;
            
            // Validate new position
            if (this.isValidPosition(newX, newY) && !this.obstacles.has(`${newX},${newY}`)) {
                neighbors.push({x: newX, y: newY});
            }
        }
        
        return neighbors;
    }
    
    /**
     * Calculate heuristic distance between two points
     * Uses Manhattan distance as it's fast to calculate and never overestimates
     * Could be modified for different equipment movement patterns
     * @param {Object} pos - Current position
     * @param {Object} end - Target position
     * @returns {number} Estimated distance
     */
    heuristic(pos, end) {
        return Math.abs(end.x - pos.x) + Math.abs(end.y - pos.y);
    }
    
    /**
     * Validate if a position is within the construction site bounds
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {boolean} Whether position is valid
     */
    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
    
    /**
     * Get the cost of traversing a particular position
     * Could be extended to include different terrain types:
     * - Mud (higher cost)
     * - Gravel (medium cost)
     * - Paved roads (low cost)
     * @param {Object} pos - Position to check
     * @returns {number} Cost of traversing this position
     */
    getTerrainCost(pos) {
        return this.grid[pos.y][pos.x];
    }
    
    /**
     * Reconstruct the path from start to end using the cameFrom map
     * @param {Map} cameFrom - Map of each position to its predecessor
     * @param {Object} current - End position
     * @returns {Array} Array of positions forming the path
     */
    reconstructPath(cameFrom, current) {
        const path = [current];
        let currentStr = JSON.stringify(current);
        
        while (cameFrom.has(currentStr)) {
            current = cameFrom.get(currentStr);
            currentStr = JSON.stringify(current);
            path.unshift(current);
        }
        
        return path;
    }
}

// Example usage showing how to set up and use the pathfinding system
function demonstratePathfinding() {
    // Create a 10x10 construction site
    const site = new ConstructionSite(10, 10);
    
    // Add some sample obstacles
    // In real applications, these could be:
    // - Other equipment
    // - Material storage areas
    // - Restricted zones
    // - Safety barriers
    site.addObstacle(2, 2);
    site.addObstacle(2, 3);
    site.addObstacle(2, 4);
    site.addObstacle(3, 2);
    site.addObstacle(4, 2);
    
    // Define start and end points
    const start = {x: 0, y: 0};
    const end = {x: 9, y: 9};
    
    // Find and return the optimal path
    const path = site.findOptimalPath(start, end);
    console.log("Optimal path:", path);
    return path;
}

// Execute the demonstration
demonstratePathfinding();