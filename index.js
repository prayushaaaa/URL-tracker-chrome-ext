//  chrome://extensions/
let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");

var leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render();
}

inputBtn.addEventListener("click", () => {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  inputEl.value = " ";

  render();
});

function render() {
  let listitems = "";

  for (let i = 0; i < myLeads.length; i++) {
    listitems += `
    <li>
    <a target = '_blank' href= '${myLeads[i]}'> ${myLeads[i]} </a>
    </li>`;
  }
  ulEl.innerHTML = listitems;
}

delBtn.addEventListener("click", () => {
  localStorage.clear();
  myLeads = [];
  ulEl.innerHTML = null;
});

tabBtn.addEventListener("click", () => {
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

  // });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render();
  });
});
