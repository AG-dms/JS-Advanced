Vue.component('error-msg', {
    props: ["visibilityerr"],
    template: `
        <div class="erorMsg" v-show="visibilityerr">
            <h1>Что-то пошло не так =(</h1>
            <h1>Попробуйте перезагрузить страницу</h1>
        </div>
    `
});