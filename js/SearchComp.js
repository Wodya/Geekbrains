Vue.component('search', {
	data() {
		return {
			userSearch: '',
			productComp: this.$root.$refs.products,
		}
	},
	methods: {
		filter(){
			let regexp = new RegExp(this.userSearch, 'i');
			this.productComp.filtered = this.productComp.products.filter(el => regexp.test(el.product_name));
		}
	},
	mounted(){
		this.productComp = this.$root.$refs.products;
	},
	template:`
		<form action="#" class="search-form" @submit.prevent="filter">
			<input type="text" class="search-field" v-model="userSearch">
			<button class="btn-search" type="submit">
			<i class="fas fa-search"></i>
			</button>
		</form>`
});
