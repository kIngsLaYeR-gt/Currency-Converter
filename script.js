const mainUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json";
const choices = document.querySelectorAll(".choices select");
const amount = document.querySelector("input");
const btn = document.querySelector("button");
const result = document.querySelector(".final-message p");

for (let select of choices) {
  for (i in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = i;
    select.append(newOptions);
  }
  select.addEventListener("click", async (e) => {
    updateFlag(e.target);
    await getData(e.target);
  });
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
  const rate = data["inr"];
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