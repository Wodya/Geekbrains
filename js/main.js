const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = ({title, price} = {title:"Неизвестный товар", price:"Очень много"}) => {
  return `<div class="product">
            <img class="product__img" src="https://placeimg.com/100/100/any" alt="" >
            <p class="product__name">${title}</p>
            <p class="product__price">${price} руб</p>
            <button class="product__add button"><i class="fas fa-cart-plus "></i></button>
        </div>`;
};

const renderProducts = (list) => {
  const productList = list.map(good =>renderProduct(good)).join("");
  console.log(productList);
  document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);
