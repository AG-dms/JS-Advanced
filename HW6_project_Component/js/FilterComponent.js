Vue.component('filtred', {
    template: `
            <form action="#" class="search-form" @submit.prevent="$root.filter">
                <search-arr></search-arr>
            </form>
`
});

Vue.component('search-arr', {

    template: `
        <div>
            <input type="text" class="search-field" v-model="$root.userSearch">
            <button type="submit" class="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </div>
`
});



//Вариант без вложенных компонентов

// Vue.component('filtred', {
//     template: `
//             <form action="#" class="search-form" @submit.prevent="$root.filter">
//                 <input type="text" class="search-field" v-model="$root.userSearch">
//                 <button type="submit" class="btn-search">
//                     <i class="fas fa-search"></i>
//                 </button>
//             </form>
// `
// });