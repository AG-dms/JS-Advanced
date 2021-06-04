const express = require('express');
const fs = require('fs');
const app = express();

//обработчик всех запросов корзины
const cart = require('./cartRouter');

app.use(express.json());
// При открытие страница запускается папка паблик для считывания оттуда всех файлов
app.use('/', express.static('public'));

app.use('/api/cart', cart);


// app.get();
// app.post();
// app.put();
// app.delete();


// Метод принимает и обрабатывает запрос на сервер по адресу api.products
// api.products это произвольное название и может быть любым. Реальный путь откуда мы будем брать данные прописывается непосредственно в теле обработчика запроса
app.get('/api/products', (req, res) => {

    // При обработке запроса мы считываем данные из файла server/db/products.json и отправляем их назад методом .send()
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({
                result: 0,
                text: err
            }));
        } else {
            // Отправляем ответ с сервера в виде данных  назад
            res.send(data);
        }
    })
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listen on port ${port}...`));