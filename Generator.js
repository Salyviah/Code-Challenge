const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function calculateGrade(grade) {
    if (grade >= 79 && grade <= 100){
        return "A";
    } else if (grade >= 60 && grade <= 79){
        return "B-";
    } else if (grade >= 50 && grade <= 59){
        return "C-";
    } else if (grade >= 40 && grade <= 49){
        return "D-";
    } else if (grade < 40 && grade >= 0){
        return "E";
    } else {
        return "Invalid grade";
    }
}

// Prompt user to input student grade
rl.question("Enter student grade: ", (input) => {
    const grade = parseFloat(input);

    if (isNaN(grade) || grade < 0 || grade > 100) {
        console.log("Invalid input! Grade should be between 0 and 100.");
    } else {
        if (grade >= 79 && grade <= 100){
            console.log("Student has an A");
        } else if (grade >= 60 && grade <= 79){
            console.log("Student has a B-");
        } else if (grade >= 50 && grade <= 59){
            console.log("Student has a C-");
        } else if (grade >= 40 && grade <= 49){
            console.log("Student has a D-");
        } else if (grade < 40 && grade >= 0){
            console.log("Student has failed");
        }
    }

    rl.close();
});
