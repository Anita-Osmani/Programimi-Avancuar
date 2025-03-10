// Import required modules
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get user input with error handling
function getName() {
    return new Promise((resolve, reject) => {
        rl.question('Please enter your name: ', (name) => {
            // Trim whitespace and check for empty input
            if (name.trim() === '') {
                reject(new Error('Name cannot be empty'));
            } else {
                resolve(name.trim());
            }
        });
    });
}

// Main async function to handle program flow
async function main() {
    try {
        // Print initial greeting
        console.log('Hello, World!');
        
        // Get valid user name with retry logic
        let userName;
        while (true) {
            try {
                userName = await getName();
                break; // Exit loop if valid
            } catch (error) {
                console.log(error.message);
            }
        }

        // Display personalized greeting
        console.log(`Hello, ${userName}!`);
        
        // Show current date and time
        const now = new Date();
        console.log(`Current date and time: ${now.toLocaleString()}`);

    } catch (error) {
        // Catch unexpected errors
        console.error('An error occurred:', error.message);
    } finally {
        // Always close the readline interface
        rl.close();
    }
}

// Run the program
main();