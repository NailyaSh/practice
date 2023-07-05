let input = document.querySelector('input');
let text = document.querySelector('#text');
const buttonCreate = document.querySelector('.btn_create');
const closeModal = document.querySelector('.model_close');
const update = document.querySelector('.btn_update');
const backet = document.querySelector('.productList');
const finalPrice = document.querySelector('.final-price');

let test = async function () {
  const res = await fetch('https://fakestoreapi.com/products');
  console.log(3);
  return await res.json();
};
// document.body.style.opacity = '0';
let products = await test();
document.body.style.opacity = '1';

console.log(products);

products.forEach(element => {
  myFunction(element.title, element.price, element.id)
});


function myFunction(value, price, num = false) {
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

function addToProductList(row) {
  let productNote = document.createElement('div');
  productNote.className = 'box is-flex is-justify-content-space-between';

  let text = document.createElement('span');
  text.className = "has-text-primary";

  let price = document.createElement('span');
  price.className = "has-text-info";

  text.textContent = 'Product: ' + row.querySelector('.cell-text').textContent;
  price.textContent = 'Price: ' + row.querySelector('.cell-price').textContent;
 
  if (finalPrice.textContent.includes('0$')) {
    finalPrice.textContent = Number(row.querySelector('.cell-price').textContent);
  } else {
    finalPrice.textContent =  (Number(finalPrice.textContent) + Number(row.querySelector('.cell-price').textContent)).toFixed(2);
    
  }

  productNote.append(text, price);
  backet.append(productNote);
  }

}
