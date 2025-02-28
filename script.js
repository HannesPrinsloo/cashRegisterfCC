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

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const displayTotal = document.getElementById("display-total");

const totalInRegister = () => {
    let total = 0;
    for (const value of cid) {
        total += value[1];
    }
    return total;
};

const runningTotal = totalInRegister();
console.log(runningTotal);

displayTotal.textContent = `Total: ${price}`;

const calculateFunction = (cash, price) => {
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        cash.value = 0;
        return;
    }
    if ((cash - price) > runningTotal) {
        console.log("Not enough cash in drawer");
        alert("Not enough cash in drawer");
    }
};

purchaseBtn.addEventListener("click", () => {
    //calculate function
    console.log("click works");
    console.log(cash.value);
    calculateFunction(cash.value, price);
});
cash.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        //calculate function
        console.log("enter works");
        console.log(cash.value);
        calculateFunction(cash.value, price);


    }
});

