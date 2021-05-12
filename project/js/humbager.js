class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
    }
    addTopping(topping) {
        //Добавить добавку
    }
    removeTopping(topping) {
        //Убрать добавку
    }
    getToppings(topping) {
        //Получить список добавок
    }
    getSize() {
        console.log(this.size.id);

    }
    getStuffing() {
        //Узнать начинку гамбургера
    }
    calculatePrice() {
        //Узнать цену
    }
    calculateCalories() {
        // Узнать калорийность
    }
}

class Size {
    constructor(id, price, calory) {
        this.id = id;
        this.price = price;
        this.calory = calory;
    }
}

class SizesList {
    constructor() {
        this.size = [];
    }
}
const obj = new Hamburger(big);
console.log(obj);
obj.getSize();