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

for (let i = 0; i < cid.length; i++) {
    cid[i][1] = Math.round(cid[i][1] * 100);
};

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const displayTotal = document.getElementById("display-total");
const cidDisplay = document.querySelector(".cid");
let drawerStatus = "CLOSED";

const formatCidDisplay = () => {
    cidDisplay.innerHTML = "";
    for (let i = 0; i < cid.length; i++) {
        cidDisplay.innerHTML += `<p>${cid[i][0]} = ${cid[i][1] / 100}<p>`;
    }
    cidDisplay.style.display = "block";
    drawerStatus = "OPEN";
};




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
        cidDisplay.style.display = "none";
        drawerStatus = "CLOSED";
        return;
    }
    if ((cashInput - price) > runningTotal) {
        console.log("Not enough cash in drawer");
        alert("Not enough cash in drawer");
        cash.value = "";
        cidDisplay.style.display = "none";
        drawerStatus = "CLOSED";

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
              denominationsAndAmounts.push([denominationName, (denominationValue / 100)]);
              for (const name in cid) {
                if (cid[name][1] > 0) {
                    cid[name][1] -= denominationValue;
                } else {
                    // logic should subtract from lower denominations. Idfk how yet. 
                }
              }

            }
          }

        //   subtracting denominations and amounts from Cash-In-Drawer (cid) 
          for (let i = 0; i < cid.length; i++) {
            switch (denominationsAndAmounts[i]) {
                case "ONE HUNDRED":
                    cid[8][1] -= 10000;
                    break;
                case "TWENTY":
                    cid[7][1] -= 2000;
                    break;
                case "TEN":
                    cid[6][1] -= 1000;
                    break;
                case "FIVE":
                    cid[5][1] -= 500;
                    break;
                case "ONE":
                    cid[4][1] -= 100;
                    break;
                case "QUARTER":
                    cid[3][1] -= 25;
                    break;
                case "DIME":
                    cid[2][1] -= 10;
                    break;
                case "NICKEL":
                    cid[1][1] -= 5;
                    break;
                case "PENNY":
                    cid[0][1] -= 1;
                    break;
            }
          }
          console.log("CID - ", cid);
        

        
        console.log("denominations and amounts: ", denominationsAndAmounts);
        console.log("changeInDollarsAfterDen - ", changeInCents / 100);
        formatCidDisplay();

    }
};

//TODO html reset function
const reset = () => {
    cidDisplay.textContent = "";
    drawerStatus = "CLOSED";
}

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

