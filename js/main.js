class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    this._render();
  }

  _fetchProducts() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ]
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
  getTotalSum = () => this.allProducts.reduce((acc,item) => acc + item.price, 0);
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class Basket{
  constructor(productList, container=".basket") {
    this.container = container;
    this.items = [];
    productList.forEach(p => this.add(p));
    this._render()
  }
  add(productItem, quantity = 1){
    let item = this.items.find(p => p.id === productItem.id);
    if(item === undefined){
      item = new BasketItem(productItem, 1);
      this.items.push(item);
    } else {
      item.quantity += quantity;
      let element = document.querySelector(`[data-id="${item.id}"]`)
      element.insertAdjacentHTML("beforebegin",item.render());
      element.parentNode.removeChild(element);
    }
  }
  delete(productId) {
    let itemIndex = this.items.findIndex(p => p.id === productId);
    if (itemIndex >= 0) {
      delete this.items[itemIndex];
      let element = document.querySelector(`[data-id="${productId}"]`)
      element.parentNode.removeChild(element);
    }

  }
  getTotalSum = () => this.items.reduce((acc,item) => acc + item.price, 0);

  _render(){
    const block = document.querySelector(this.container);
    this.items.forEach(p => block.insertAdjacentHTML('beforeend', p.render()));
  }
}

class BasketItem {
  constructor(productItem, quantity) {
    this.title = productItem.title;
    this.price = productItem.price;
    this.id = productItem.id;
    this.img = productItem.img;
    this.quantity = quantity;
  }

  render = () => `<div class="basket-item" data-id="${this.id}">
            <p class="basket__name">${this.title}</p>
            <p class="basket__price">${this.price} \u20bd</p>
            <p class="basket__quantity">${this.quantity}</p>
            <p class="basket__sum">${this.quantity * this.price} </p>
        </div>`;
}

let products = new ProductList();
let basket = new Basket(products.allProducts.slice(0,3));
basket.delete(3);
basket.add(products.allProducts[0],3);
console.log(`Total sum = ${products.getTotalSum()}`);

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => document.querySelector('.products')
//     .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
//
// renderProducts(products);
