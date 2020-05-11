Vue.component('error',{
	data(){
		return {
			errorStr: ''
		}
	},
	methods:{
		showError(errorStr){
			this.errorStr = errorStr;
		},
		hideError(){
			this.errorStr = "";
		}
	},
	computed:{
		viewError(){
			return this.errorStr!=='';
		}
	},
	mounted(){
	},
	template: `
		<div v-if="viewError" class="error">
		<p>{{ errorStr }}</p>
		</div>
	`
});
