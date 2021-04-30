const products = [{
        id: 1,
        title: 'Notebook',
        price: 2000
    },
    {
        id: 2,
        title: 'Mouse',
        price: 20
    },
    {
        id: 3,
        title: 'Keyboard',
        price: 200
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 50
    },
];


//Функция для формирования верстки каждого товара
const renderProduct = (product) => {
    return `<div class="product-item">
                <h3>${product.title}</h3>
                <img src="http://unsplash.it/150/150?random&gravity=center">
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').insertAdjacentHTML('afterbegin', productsList);

};

renderPage(products);

// Запятые придумал удалить только так (текстовые узлы)
document.querySelector('.products').childNodes.forEach(child => {
    // Можно либо все текстовые узлы либо только запятые === ','
    if (child.nodeType === 3) {
        child.remove();
    }
});