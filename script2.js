let price = 3.26;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

// 👇 get the html elements 👇
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const displayTotal = document.getElementById("display-total");
const cidDisplay = document.querySelector(".cid");




// 👇 calculations here 👇
//cid array is difficult to work with. Change to object with values stored in cents
for (let i = 0; i < cid.length; i++) {
    // cid[i][0] = cid[i][0].toLowerCase();
    cid[i][1] = Math.round(cid[i][1] * 100);
    // cid[i][0] = cid[i][0].replace('one hundred', 'oneHundred');
    
}
cid.reverse();
const cidObject = Object.fromEntries(cid);
console.log(cidObject);

//show cash in drawer - default hidden until activated w/click or enter && if(true)
const formatCidDisplay = () => {
    cidDisplay.innerHTML = "";
    for (const key in cidObject) {
        cidDisplay.innerHTML += `<p>${key} = ${cidObject[key] / 100}<p>`;
    }
    cidDisplay.style.display = "block";
};

//set runninTotal & totalInRegister - call w/click || enter
let runningTotal = 0;

const totalInRegister = (cidObject) => {
    let registerTotal = 0;

    for (const value in cidObject) {
        console.log("NEGATIVE in register CHECK", cidObject[value]);
        if (cidObject[value] <= 0) {
            cidObject[value] = 0;
        }
    }
    
    for (const key in cidObject) {
        const value = cidObject[key];
        registerTotal += value;
    }
    runningTotal = registerTotal / 100;
};

const currencyUnits = {
    "ONE HUNDRED": 10000,
    "TWENTY": 2000,
    "TEN": 1000,
    "FIVE": 500,
    "ONE": 100,
    "QUARTER": 25,
    "DIME": 10,
    "NICKEL": 5,
    "PENNY": 1,
};

// const getChangeDue = (cashInput, price) => {
    
// }
// console.log(getChangeDue(parseFloat(cash.value), price));

// CALCULATE FUNCTION
let drawerStatus = "";
const calculateFunction = (cashInput, price) => {
    let changeDueInCents = Math.round((cashInput - price) * 100);

    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        cash.value = "";
        // cidDisplay.style.display = "none";
        return;
    }

    if (cashInput == parseFloat(price)) {
        console.log("No change due - customer paid with exact cash");
        changeDue.textContent = "No change due - customer paid with exact cash";
        cash.value = "";
        // cidDisplay.style.display = "none";
        return;
    }


        cidDisplay.style.display = "block";

        console.log("Jirre, hier gat oss weer 👉👉👉👉");
        console.log("CASH INPUT ", cashInput, "PRICE ", price)

        const changeDueArray = [];

        
        console.log("changeDueInCents - ", changeDueInCents);

        let checkIfClosed = 0;
        
        for (const key in cidObject) { // iterate the denominations in the drawer using KEYs to both subtract them from
                                       // changeDueInCents and also .push() them to changeDueArray
            console.log("KEY && cidObject[key] ====>", key,"--", cidObject[key]);

            

            if (changeDueInCents >= currencyUnits[key] && cidObject[key] >= currencyUnits[key]) { // IF change is >= than available denom, subtract denom from change
                if (cidObject[key] === 0) {
                    checkIfClosed++;
                }   

                if (checkIfClosed === 9) {
                    changeDue.innerHTML += "Status: CLOSED";
                    return;
                }

                 while (changeDueInCents >= currencyUnits[key] && cidObject[key] >= currencyUnits[key]) {
                    console.log("currencyUnits[key] 🐶🐶🐶", key, "--", currencyUnits[key]); // and .push() that denomination KEY and COUNT to changeDueArray
                    changeDueInCents -= currencyUnits[key];
                    cidObject[key] -= currencyUnits[key]; 
                    console.log("KEY && cidObject[key] ====>🔥🔥🔥", key,"--", cidObject[key]);
                    changeDueArray.push(key);
                 }
            }
        }

        // ⚡⚡⚡ Fucking finally - Simplified Change Formatting Logic ⚡⚡⚡
        const denominationCounts = {}; // Object to count denominations
        changeDueArray.forEach(denomName => {
            denominationCounts[denomName] = (denominationCounts[denomName] || 0) + 1;
        });
        
        changeDue.innerHTML = ""; // Clear previous content

        if (changeDueArray.length !== 0 && changeDueInCents === 0) {
            changeDue.innerHTML += "Status: OPEN";
            for (const denomName in denominationCounts) {
                const count = denominationCounts[denomName];
                const amountInDollars = (count * currencyUnits[denomName]) / 100; // Calculate dollar amount
                changeDue.innerHTML += `<p>${denomName}: $${amountInDollars.toFixed(2)}</p>`; // Format output
            }
        } else {
            changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
        }
        
        console.log("change due array -- ⚡⚡⚡", changeDueArray); 
}


// 👇 update UI here 👇
//display price
displayTotal.textContent = `Total: ${price}`;

//reset UI - call in eventListener
const reset = () => {
    changeDue.textContent = "";
    // drawerStatus = "CLOSED";
}

//event listeners
purchaseBtn.addEventListener("click", () => {
    reset();
    console.log("click works");
    console.log(cash.value);
    totalInRegister(cidObject);
    calculateFunction(parseFloat(cash.value), price);
    console.log("Click ", runningTotal);
});
cash.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        reset();
        console.log("enter works");
        console.log(cash.value);
        totalInRegister(cidObject);
        calculateFunction(parseFloat(cash.value), price);
        formatCidDisplay();
        console.log("Enter ", runningTotal);
    }
});
