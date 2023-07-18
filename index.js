let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let butitle = document.getElementById("searchbytitle");
let bucategory = document.getElementById("searchbycategory");
let mood = "create";
let tmp;
// total function

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "rgba(255, 0, 0, 0.438)";
  }
}

// total function

// create function

let databro;
if (localStorage.product != null) {
  databro = JSON.parse(localStorage.product);
} else {
  databro = [];
}

create.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 100
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          databro.push(newpro);
        }
      } else {
        databro.push(newpro);
      }
    } else {
      databro[tmp] = newpro;
      mood = "create";
      count.style.display = "block";
      create.innerHTML = "create";
    }
    empty();
    getTotal();
  }

  localStorage.product = JSON.stringify(databro);
  showData();
};

// create function

function empty() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < databro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${databro[i].title}</td>
    <td>${databro[i].price}</td>
    <td>${databro[i].taxes}</td>
    <td>${databro[i].ads}</td>
    <td>${databro[i].discount}</td>
    <td>${databro[i].total}</td>
    <td>${databro[i].category}</td>
    <td><button onclick="update(${i})"  id="update">update</button></td>
    <td><button id="delete" onclick="del(${i})">delete</button></td>
    </tr>
    `;

    let btn = document.getElementById("deleteAll");

    if (databro.length > 0) {
      btn.innerHTML = `
      <button onclick="remove()">delete All</button>
      `;
    } else {
      btn.innerHTML = "";
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

showData();

function del(i) {
  databro.splice(i, 1);
  localStorage.product = JSON.stringify(databro);
  showData();
}

function remove() {
  localStorage.clear();
  databro.splice(0);
  showData();
}

function update(i) {
  title.value = databro[i].title;
  price.value = databro[i].price;
  taxes.value = databro[i].taxes;
  ads.value = databro[i].ads;
  discount.value = databro[i].discount;
  category.value = databro[i].category;
  count.style.display = "none";
  create.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}

let searchmood = "title";
function searchby(id) {
  if (id === "searchbytitle") {
    searchmood = "title";
    search.placeholder = "search by title";
  } else {
    searchmood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value.toLowerCase();
  search.value = "";
  showData();
}

function searchdata(value) {
  let table = "";
  if (searchmood == "title") {
    for (let i = 0; i < databro.length; i++) {
      if (databro[i].title.includes(value)) {
        table += `
  <tr>
  <td>${i}</td>
  <td>${databro[i].title}</td>
  <td>${databro[i].price}</td>
  <td>${databro[i].taxes}</td>
  <td>${databro[i].ads}</td>
  <td>${databro[i].discount}</td>
  <td>${databro[i].total}</td>
  <td>${databro[i].category}</td>
  <td><button onclick="update(${i})"  id="update">update</button></td>
  <td><button id="delete" onclick="del(${i})">delete</button></td>
  </tr>
  `;
      }
    }
  } else {
    if (searchmood == "category") {
      for (let i = 0; i < databro.length; i++) {
        if (databro[i].category.includes(value)) {
          table += `
    <tr>
    <td>${i}</td>
    <td>${databro[i].title}</td>
    <td>${databro[i].price}</td>
    <td>${databro[i].taxes}</td>
    <td>${databro[i].ads}</td>
    <td>${databro[i].discount}</td>
    <td>${databro[i].total}</td>
    <td>${databro[i].category}</td>
    <td><button onclick="update(${i})"  id="update">update</button></td>
    <td><button id="delete" onclick="del(${i})">delete</button></td>
    </tr>
    `;
        }
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
