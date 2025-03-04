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

//variable to update after each successful transaction
let runningTotal = 0;

const totalInRegister = () => {
    let totalInCents = 0;
    for (const value of cid) {
        totalInCents += value[1] * 100;
    }
    return totalInCents;
};

displayTotal.textContent = `Total: ${price}`;

const calculateFunction = (cashInput, price) => {
    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        cash.value = "";
        return;
    }
    if ((cashInput - price) > runningTotal) {
        console.log("Not enough cash in drawer");
        alert("Not enough cash in drawer");
        cash.value = "";
        return;
    }
    if (cashInput == parseFloat(price)) {
        console.log("No change due - customer paid with exact cash");
        changeDue.textContent = "No change due - customer paid with exact cash";
        cash.value = "";
        return;
    }
    if (cashInput > price && cashInput <= runningTotal) {
        //Work out the amount of change IN CENTS
        let changeInCents = (cashInput * 100) - (price * 100);
        let changeInDollars = changeInCents / 100;
        console.log("Change in CENTS - ", changeInCents, "Change in DOLLARS $$ - ", changeInDollars);
        console.log("cid.length- ", cid.length);

        //outputs
        const denominationsAndAmounts = [];

        const denominationValues = [
            { name: 'ONE HUNDRED', value: 10000 },
            { name: 'TWENTY', value: 2000 },
            { name: 'TEN', value: 1000 },
            { name: 'FIVE', value: 500 },
            { name: 'ONE', value: 100 },
            { name: 'QUARTER', value: 25 },
            { name: 'DIME', value: 10 },
            { name: 'NICKEL', value: 5 },
            { name: 'PENNY', value: 1 }
          ];
      
          //getting specific denominations and amounts
          for (const denomination of denominationValues) {
            const denominationName = denomination.name;
            const denominationValue = denomination.value;
      
            while (changeInCents >= denominationValue) {
              changeInCents -= denominationValue;
              denominationsAndAmounts.push(denominationName);
            }
          }

        //   subtracting denominations and amounts from Cash-In-Drawer (cid) 
          for (let i = 0; i < cid.length; i++) {
            switch (denominationsAndAmounts[i]) {
                case "ONE HUNDRED":
                    cid[8][1] -= 100;
                    break;
                case "TWENTY":
                    cid[7][1] -= 20;
                    break;
                case "TEN":
                    cid[6][1] -= 10;
                    break;
                case "FIVE":
                    cid[5][1] -= 5;
                    break;
                case "ONE":
                    cid[4][1] -= 1;
                    break;
                case "QUARTER":
                    cid[3][1] -= 0.25;
                    break;
                case "DIME":
                    cid[2][1] -= 0.10;
                    break;
                case "NICKEL":
                    cid[1][1] -= 0.5;
                    break;
                case "PENNY":
                    cid[0][1] -= 0.01;
                    break;
            }
          }
          console.log("CID - ", cid);
        
        console.log("denominations and amounts: ", denominationsAndAmounts);
        console.log("changeInDollarsAfterDen - ", changeInCents / 100);

    }
};

//TODO html reset function

purchaseBtn.addEventListener("click", () => {
    //calculate function
    console.log("click works");
    console.log(cash.value);
    runningTotal = totalInRegister() / 100;
    calculateFunction(cash.value, price);
    
    console.log("Click ", runningTotal);
});
cash.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        //calculate function
        console.log("enter works");
        console.log(cash.value);
        runningTotal = totalInRegister() / 100;
        calculateFunction(cash.value, price);
        
        console.log("Enter ", runningTotal);
    }
});

