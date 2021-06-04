Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    mounted() {

        //Обращаясь к методу нашего главного файла: main.js мы вызывает метод getJson.
        // Метод принимает адрес сервера на который мы обращаемся.

        //  обработка обращения к /api/products находится в запускаюшем сервере файле server.js
        this.$parent.getJson(`/api/products`)

            // Принимаем данные data c сервера(полученные методом .send() из файла server.js) и обрабатываем их
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
                console.log(this.$data.products);
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product-item">
                <img :src="product.img" alt="Some img" class="product-img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
                </div>
            </div>
    `
})