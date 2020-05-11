Vue.component('search', {
	data() {
		return {
			userSearch: '',
		}
	},
	methods: {
		filter() {

		}
	},
	template:`
		<form action="#" class="search-form" @submit.prevent="filter">
		<input type="text" class="search-field">
		<button class="btn-search" type="submit">
		<i class="fas fa-search"></i>
		</button>
		</form>`
});
