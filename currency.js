
const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")

for (let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name==="from"&& currCode=="USD"){
          newOption.selected="selected";
        }else if (select.name==="to"&& currCode=="INR"){
          newOption.selected="selected";
        }
        
        select.append(newOption);
    };

    select.addEventListener("change",(evt) =>{
   updateFlag(evt.target);
    })
}
const updateFlag =(element)  => {
  let currCode = element.value;
  let countryCode=countryList[currCode];
  let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img =element.parentElement.querySelector("img");
  img.src =newSrc;
};
btn.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  getExchangeRate()
});
function getExchangeRate(){
const amount= document.querySelector(".amount input");
let amtVal=amount.value;
console.log(amtVal);
if (amtVal===""|| amtVal<1){
  amtVal=1;
  amount.value="1";
}
 let url = `https://v6.exchangerate-api.com/v6/45188998e0b977146a17e232/latest/${fromCurr.value}`;
  fetch(url).then (response => (response.json()).then(result =>{
    let exchangeRate = result.conversion_rates[toCurr.value];
    let totalExChangeRate =(amtVal* exchangeRate).toFixed(2);
    const exchangeRateTxt= document.querySelector(".msg");
    exchangeRateTxt.innerText=`${amtVal} ${fromCurr.value} =${totalExChangeRate} ${toCurr.value}`
  }));
}
