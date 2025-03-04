let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
// 👇 get the html elements 👇
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const displayTotal = document.getElementById("display-total");
const cidDisplay = document.querySelector(".cid");




// 👇 calculations here 👇
//cid array is difficult to work with. Change to object with values stored in cents
for (let i = 0; i < cid.length; i++) {
    cid[i][0] = cid[i][0].toLowerCase();
    cid[i][1] = Math.round(cid[i][1] * 100);
    cid[i][0] = cid[i][0].replace('one hundred', 'oneHundred');
    cid.reverse();
    
}
const cidObject = Object.fromEntries(cid);
console.log(cidObject);

//show cash in drawer - default hidden until activated w/click or enter && if(true)
const formatCidDisplay = () => {
    cidDisplay.innerHTML = "";
    for (let i = 0; i < cid.length; i++) {
        cidDisplay.innerHTML += `<p>${cid[i][0]} = ${cid[i][1] / 100}<p>`;
    }
    cidDisplay.style.display = "block";
    drawerStatus = "OPEN";
};

//set runninTotal & totalInRegister - call w/click || enter
let runningTotal = 0;

const totalInRegister = (cidObject) => {
    let registerTotal = 0;
    
    for (const key in cidObject) {
        const value = cidObject[key];
        registerTotal += value;
    }
    runningTotal = registerTotal / 100;
};

// isChangePossible FUNCTION
const isChangePossible = (cashInput, price) => {
    if (cashInput > price && (cashInput - price ) <= runningTotal) {
        let denominationFactors = {};

        for (const key in cidObject) {
            
        }
    }
}

// CALCULATE FUNCTION
const calculateFunction = (cashInput, price) => {
    if (cashInput < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    cidDisplay.style.display = "none";
    return;
    }
    if ((cashInput - price) > runningTotal) {
        console.log("Not enough cash in drawer");
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        cash.value = "";
        cidDisplay.style.display = "none";
        return;
    }
    if (cashInput == parseFloat(price)) {
        console.log("No change due - customer paid with exact cash");
        changeDue.textContent = "No change due - customer paid with exact cash";
        cash.value = "";
        cidDisplay.style.display = "none";
        drawerStatus = "CLOSED";
        return;
    }
    if (isChangePossible(cashInput, price)) {
        console.log("foo");
        formatCidDisplay();
    }   else {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    }

}


// 👇 update UI here 👇
//display price
displayTotal.textContent = `Total: ${price}`;

//reset UI - call in eventListener
const reset = () => {
    changeDue.textContent = "";
    drawerStatus = "CLOSED";
}

//event listeners
purchaseBtn.addEventListener("click", () => {
    reset();
    console.log("click works");
    console.log(cash.value);
    totalInRegister(cidObject);
    calculateFunction(cash.value, price);
    console.log("Click ", runningTotal);
});
cash.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        reset();
        console.log("enter works");
        console.log(cash.value);
        totalInRegister(cidObject);
        calculateFunction(cash.value, price);
        
        console.log("Enter ", runningTotal);
    }
});
