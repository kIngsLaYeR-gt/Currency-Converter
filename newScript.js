let mainUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/aed.json";
const choices = document.querySelectorAll(".choices select");
const amount = document.querySelector("input");
const btn = document.querySelector("button");
const result = document.querySelector(".final-message p");
let index=0;
let def = "aed"

for (let select of choices) {
  for (let i in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = i;
    select.append(newOption);
  }

  if (index === 0) {
    // First select element
    select.addEventListener("change", async (e) => {
      console.log("First select clicked");
      updateFlag(e.target);
      setUrl(e.target);
      def = e.target.value.toLowerCase();
    });
  } else if (index === 1) {
    // Second select element
    select.addEventListener("click", async (e) => {
      console.log("Second select clicked");
      updateFlag(e.target);
      await getData(e.target);
    });
  }

  index++;
}
const setUrl = (element) => {
    mainUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${element.value.toLowerCase()}.json`
}


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  // console.log(countryCode)
  let newSrc = "https://flagsapi.com/" + countryCode + "/flat/64.png";
  let image = element.parentElement.querySelector("img");
  image.src = newSrc;
};
const getData = async (element) => {
  let currCode = element.value;
  let newCurrCode = currCode.toLowerCase();
  const response = await fetch(mainUrl);
  const data = await response.json();
  const rate = data[def];
  for (let i in rate) {
    if (i === `${newCurrCode}`) {
      console.log(rate[newCurrCode]);
      btn.addEventListener("click", (evt) => {
        evt.preventDefault();
        let amount = document.querySelector("form input");
        let amtval = amount.value;
        result.innerHTML = `Connverted Amount:  ${Math.abs(amtval * rate[newCurrCode]).toFixed(3)}${currCode}`;
      });
    }
  }
};
btn.addEventListener("click", (evt) => {
        evt.preventDefault();
        let amount = document.querySelector("form input");
        let amtval = amount.value;
        result.innerHTML = `Connverted Amount:  ${Math.abs(amtval * 0.043).toFixed(3)}${"AED"}`;
});