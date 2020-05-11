const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url){
			this.$refs.error.hideError();
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
					this.$refs.error.showError("Ошибка получения данных с сервера");
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

