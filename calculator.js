const readline = require('readline')

function calculatePayee(grossSalary){
    const taxGroup =[
        {annualTaxablePay: 288000, rate: 0.1},
        {annualTaxablePay:288001 - 388000, rate:0.25},
        {annualTaxablePay:388001 - 6000000, rate:30.0},
        {annualTaxablePay:	6000001 - 9600000, rate:32.5},
        {annualTaxablePay: Infinity, rate:35.0}
    ]

    let tax = 0;

    let remainingGrossSalary = grossSalary;

    for (const group of taxGroup){
        if (remainingGrossSalary <= 0) break;

         const taxableAmount = Math.min(remainingGrossSalary, group.annualTaxablePay)

        tax += taxableAmount * group.rate;

        remainingGrossSalary -= taxableAmount
    }
    return tax;
}

function calculateNHIFDeductions(grossPay){
    const nhifRates = [
        {grossPay:5999, deduction: 150},
        {grossPay:11999, deduction: 400},
        {grossPay:29999, deduction: 850},
        {grossPay:100000, deduction: 1700},

    ];
    for (const rate of nhifRates){
        if (grossPay<= rate.annualTaxablePay){
            return rate.deduction;
        }
    }
    //exceed the highest limit
   return nhifRates[nhifRates.length - 1].deduction;

}


//define nssf rates 
function calculateNSSFContributions(PensionablePay){
    //employee contribution rate for tier 1
    const tierIRate = 0.06;
    //lowerlimit foe tier II
    const tierIILeastLimit = 7001; 

if(PensionablePay <= tierIILeastLimit){
    //is it within? calc contr based on tier 1 rate
    return PensionablePay  * tierIRate;
} else {
    //if it exceeds
    return tierIILeastLimit * tierIRate;
}
}

//calc our net salary
function calculateNetSalary(basicSalary, benefits){
    //calc gross salary>>> adding basic salary and benefits
    const grossSalary = basicSalary + benefits;
    //calc tax 
    const tax = calculatePayee(grossSalary);
    //calc NHIF decuctions based on grosssalary
    const NHIFDeductions = calculateNHIFDeductions(grossSalary);
    //calc NSSF ded based on basic
    const NSSFDeductions = calculateNSSFContributions(basicSalary);
    //net salary>> sub tax,nhif ded, & nssf ded from gross salary
    const netSalary = grossSalary - tax - NHIFDeductions - NSSFDeductions;

    //results
    return{
        grossSalary,
        tax,
        NHIFDeductions,
        NSSFDeductions,
        netSalary
    };
}

//function to get the user input
function getUserInput(question){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout

    });
 
 return new Promise((resolve) => {
    rl.question(question, (answer) =>{
        rl.close();
        resolve(parseFloat(answer));
    });
 });
}
 //function to run the program
 async function run(){
    //get user input for basic salary

    const basicSalary = await getUserInput("your basic salary = ");

    //get user benefits 
    const benefits = await getUserInput("Your Benefits = ");

    //calc net salary in response to user input
    const salaryDetails = calculateNetSalary(basicSalary, benefits);

    //display the calc
    console.log("Gross = ", salaryDetails.grossSalary);
    console.log("Tax = ", salaryDetails.tax);
    console.log("NHIF Ded = ", salaryDetails.NHIFDeductions);
    console.log("NSSF Ded = ", salaryDetails.NSSFDeductions);
    console.log("Net = ", salaryDetails.netSalary);
 }

 run(); 
