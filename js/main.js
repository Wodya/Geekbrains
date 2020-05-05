const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
let getRequest = () => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', `${API}/catalogData.json`, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status !== 200) {
					reject('Error');
				} else {
					resolve(JSON.parse(xhr.responseText));
				}
			}
		};
		xhr.send();

	});
};

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    // this._fetchProducts();
    getRequest()
        .then(data => {
          this.goods = [...data];
          this._render();
          this.setListeners();
        });
  }

  // _fetchProducts() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     this.goods = JSON.parse(data);
  //     this._render();
  //   });
  // }
	setListeners(){
  	document.querySelectorAll(".buy-btn").forEach(button => button.addEventListener("click",
				event =>
				{
					let productItem = this.allProducts.find(p => p.id === +event.target.parentElement.parentElement.dataset.id);
					basket.add(productItem);
				}));
	}
  _getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });
  }

  calcSum() {
    return this.goods.reduce((sum, good) => sum + good.price, 0);
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = +product.id_product;
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

class Basket{
	constructor(productList = null,container=".basket") {
		this.container = document.querySelector(container);
		this.items = [];
		if(productList != null)
			productList.forEach(p => this.add(p));
		this._render()
	}
	add(productItem, quantity = 1){
		let item = this.items.find(p => p.id === productItem.id);
		if(item === undefined){
			item = new BasketItem(productItem, 1);
			this.items.push(item);
			this.container.insertAdjacentHTML("beforeend",item.render());
		} else {
			item.quantity += quantity;
			let element = document.querySelector(`[data-basket_id="${item.id}"]`)
			element.insertAdjacentHTML("beforebegin",item.render());
			element.parentNode.removeChild(element);
		}
		this.setListener(item.id);
	}
	setListener(basketId){
		let element = document.querySelector(`[data-basket_id="${basketId}"] .basket_trash`);
		element.addEventListener("click",event =>{

			basket.delete(+event.currentTarget.parentElement.dataset.basket_id);
		});
	}
	delete(productId) {
		let itemIndex = this.items.findIndex(p => p.id === productId);
		if (itemIndex >= 0) {
			this.items.splice(itemIndex,1);
			let element = document.querySelector(`[data-basket_id="${productId}"]`)
			element.parentNode.removeChild(element);
		}

	}
	getTotalSum = () => this.items.reduce((acc,item) => acc + item.price, 0);


	_render(){
		this.items.forEach(p => this.container.insertAdjacentHTML('beforeend', p.render()));
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

	render = () => `<div class="basket-item" data-basket_id="${this.id}">
            <p class="basket__name">${this.title}</p>
            <p class="basket__price">${this.price} \u20bd</p>
            <p class="basket__quantity">${this.quantity}</p>
            <p class="basket__sum">${this.quantity * this.price} </p>
						<button class="basket_trash"><i class="far fa-trash-alt"></i></button>
        </div>`;
}
let products = new ProductList();
let basket = new Basket();
