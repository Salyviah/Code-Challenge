const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run() {
    rl.question("Enter the speed of the car (in km/h): ", (speed) => {
        // Check if speed is less than 70 km/h
        if (speed < 70) {
            console.log("Ok");
            rl.close();
            return;
        }

        // Calculate demerit points
        const speedLimit = 70;
        const kmPerViolationPoints = 5;
        const ViolationPoints = Math.floor((speed - speedLimit) / kmPerViolationPoints);

        // Print demerit points
        console.log("Points:", ViolationPoints);

        // Check if demerit points exceed threshold for license suspension
        if (ViolationPoints >= 12) {
            console.log("License suspended");
        }

        rl.close();
    });
}

// Example usage:
run();
