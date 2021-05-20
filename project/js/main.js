const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        const buttons = document.querySelectorAll('.buy-btn');
        buy(buttons);

    }
}


class ProductItem {
    constructor(product, img = 'http://unsplash.it/150/150?random&gravity=center') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

//ДОМАШНЕЕ ЗАДАНИЕ № 3
const basketBtn = document.querySelector('.btn-cart');
const basketBlock = document.querySelector('.basketBlock');

// Обработчик клика по кнопке корзины
basketBtn.addEventListener('click', () => {
    if (basketBlock.classList.contains('hide')) {
        // Открываем окно корзины
        show(basketBlock);

        // Отправляем запрос
        fetch(`${API}/getBasket.json`)

            //Парсим полученный ответ
            .then(data => data.json())
            //Генерируем карточки товаров
            .then(result => {
                result.contents.forEach(item => {
                    // Для каждого элемента contents генерируем разметку
                    const div = renderBasket(item);

                    //Добавляем разметку в блок корзины
                    basketBlock.insertAdjacentHTML('beforeend', div);
                });

                // Функция полного удалении карточки товара по крестику
                basketBlock.querySelectorAll('.close').forEach(item => {
                    item.addEventListener('click', (event) => {
                        closeBasketItem(event);
                    });
                });

            });
    } else {
        //Очищаем корзину перед закрытием окна(Нужна ли такая функция?)
        // basketBlock.querySelectorAll('.basketBlock__item').forEach(item => {
        //     item.remove();
        // });

        // Закрываем окно с корзиной
        hide(basketBlock);
    }
});

// Закрытие корзины по клику на пустое пространство
document.querySelector('main').addEventListener('click', (event) => {
    if (event.target.tagName != "BUTTON") {
        hide(basketBlock);
    }
});

/**
 * Функция генерирует разметку из полученных с сервера данных
 * @param {*} item каждый объект из массива.contentes
 * @returns html разметка 
 */

function renderBasket(item) {
    return `
    <div class='basketBlock__item' data-id='${item.id_product}'>
        <div class='basketBlock__leftWrapper'>
            <p class='basketBlock__title'>Наименование товара: ${item.product_name}</p>
            <div class='basketBlock__price'>
                <p class='basketBlock__price_text'>Цена:</p>
                <input disabled class='basketBlock__price_value' value="${item.price}">
            </div>
            <div class='count'>
                <p class='basketBlock__quantity'> Количество:</p> 
                <button class="less">-</button>
                <input class="piece"type="text" value="${item.quantity}">
                <button class="more">+</button>
            </div>
        </div>
        <div class='basketBlock__rightWrapper'>
            <img src='http://unsplash.it/100/100?random&gravity=center'
        </div> 
    </div>
    <span class="close">X<span>
    `;
}

// Функция открытия окна (В данном случае корзины)
function show(e) {
    e.classList.remove('hide');
    e.classList.add('show');
}

// Функция закрытия окна (В данном случае корзины)
function hide(e) {
    basketBlock.querySelectorAll('.basketBlock__item').forEach(item => {
        item.remove();
    });
    e.classList.remove('show');
    e.classList.add('hide');
}

// Функция удаления карточки товара
function closeBasketItem(event) {
    event.target.parentNode.remove();
}

let list = new ProductsList();

//Функция добавить товар в корзину
function buy(btn) {
    btn.forEach(item => {
        item.addEventListener('click', (event) => {
            compare(event);
        });
    });
}

function compare(event) {
    const test = document.querySelectorAll('.basketBlock__item');
    test.forEach(item => {
        if (item.dataset.id == event.currentTarget.parentNode.parentNode.dataset.id) {
            item.querySelector('.piece').value++;
            // const price = Number(item.querySelector('.basketBlock__price_value').value);

            // //Не знаю как удваивать стоимость....
            item.querySelector('.basketBlock__price_value').value *= item.querySelector('.piece').value;
        }
    });
}