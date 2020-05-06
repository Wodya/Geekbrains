const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
				cartProducts: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x70',
				searchLine: '',
				searchEdit: '',
				isCartVisible: false
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
        	let cartProduct = this.cartProducts.find(p => p.id_product === product.id_product);
          	if(cartProduct)
          		cartProduct.quantity++;
          	else
          		this.cartProducts.push({quantity:1, ...product});
        },
        search(event){
			this.searchLine = this.searchEdit.toLocaleLowerCase();
			event.stopPropagation();
		},
		isVisible(product){
        	return (this.searchLine??"")==="" || product.product_name.toLowerCase().includes(this.searchLine);
		},
		deleteCart(product){
			let cartProduct = this.cartProducts.find(p => p.id_product === product.id_product);
			cartProduct.quantity--;
			if(cartProduct.quantity === 0)
				this.cartProducts.splice(this.cartProducts.indexOf(cartProduct),1);
		}
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
			this.getJson(`${API + this.cartUrl}`).then(data => this.cartProducts = [...data.contents]);
		}
});
