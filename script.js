import {insertProductToBasket, getProductFromBasket, deleteProductFromBasket} from './scripts/api.js';

let input = document.querySelector('input');
let text = document.querySelector('#text');
const buttonCreate = document.querySelector('.btn_create');
const backet = document.querySelector('.productList');
const finalPrice = document.querySelector('.final-price');

let getProductFromFacestore = async function () {
  const res = await fetch('https://fakestoreapi.com/products');
  return await res.json();
};

// document.body.style.opacity = '0';
let products = await getProductFromFacestore();
document.body.style.opacity = '1';

products.forEach(element => {
  displayProductTable(element.title, element.price, element.id)
});

function displayProductTable(value, price, num = false) {
  let table = document.getElementById("myTableBody");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  cell1.classList.add("cell-num");
  let cell2 = row.insertCell(1);
  cell2.classList.add("cell-text");
  let cell3 = row.insertCell(2);
  cell3.classList.add("cell-price");
  let cell4 = row.insertCell(3);
  cell4.classList.add("cell-text");

  //add
  const buttonAdd = document.createElement('button');
  buttonAdd.type = 'button';
  buttonAdd.textContent = '+';
  buttonAdd.className = 'btn_add button is-link is-light';

  let rows = table.querySelectorAll('tr');
  num ? cell1.textContent = num : cell1.textContent = rows.length;
  cell2.textContent = value;
  cell3.textContent = price;
  cell4.appendChild(buttonAdd);

  buttonAdd.addEventListener("click", function () {
    addToProductList(row);
  });

  async function addToProductList(row) {
    let basketElement = {
      name: row.querySelector('.cell-text').textContent,
      price: Number(row.querySelector('.cell-price').textContent),
    };
    await insertProductToBasket(basketElement);
    createBasketList();
  }
}

async function createBasketList() {
  backet.innerHTML = '';
  let result = await getProductFromBasket();

  result.forEach(element => {
    let productNote = document.createElement('div');    
    productNote.className = 'box is-flex is-justify-content-space-between has-background-link-light';

    let text = document.createElement('span');
    text.className = "has-text-link-dark";

    let price = document.createElement('span');
    price.className = "has-text-danger";

    text.textContent = 'Product: ' + element.name;
    price.textContent = 'Price: ' + element.price;

    if (finalPrice.textContent.includes('0$')) {
      finalPrice.textContent = Number(element.price);
    } else {
      finalPrice.textContent = (Number(finalPrice.textContent) + Number(element.price)).toFixed(2);
    }

    const buttonDelete = document.createElement('button');
    buttonDelete.type = 'button';
    buttonDelete.textContent = 'x';
    buttonDelete.className = 'btn_delete button is-danger';

    buttonDelete.addEventListener("click", async function () {
      let id = {
        id: element.id,
      };

      await deleteProductFromBasket(id);
      createBasketList();
    });

    productNote.append(text, price, buttonDelete);
    backet.append(productNote);
  });
}

createBasketList();