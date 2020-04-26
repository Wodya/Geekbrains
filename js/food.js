class Hamburger {
    constructor(stuffing=null, isBig = false) {
        this.size = isBig ? {price:100, calories: 40} : {price:50, calories: 20};
        this.stuffings = [];
        this.toppings = [];
        if(stuffing != null)
            this.addStuffing(stuffing);
    }
    addTopping(topping){
        this.toppings.push(topping);
    }
    removeTopping(topping){
        delete this.toppings[this.toppings.findIndex(p => p.id === topping.id)];
    }
    getToppings(){
        return this.toppings;
    }
    addStuffing(stuffing){
        this.stuffings.push(stuffing);
    }
    removeStuffing(stuffing){
        delete this.stuffings[this.stuffings.findIndex(p => p.id === stuffing.id)];
    }
    getStuffings(){
        return this.stuffings;
    }
    calculatePrice = () => this.size.price + this.stuffings.reduce((acc, item) => acc + item.price, 0) + this.toppings.reduce((acc, item) => acc + item.price, 0);
    calculateCalories = () => this.size.calories + this.stuffings.reduce((acc, item) => acc + item.calories, 0) + this.toppings.reduce((acc, item) => acc + item.calories, 0);
}

class Topping {
    constructor(id, price, calories) {
        this.id = id;
        this.price = price;
        this.calories = calories;
    }
}
class Stuffing {
    constructor(id, price, calories) {
        this.id = id;
        this.price = price;
        this.calories = calories;
    }
}

let toppings = {
    sauce : new Topping("sauce",15,0),
    mayo : new Topping("mayo",20,5),
}
let stuffings = {
    cheese : new Stuffing("cheese",10,20),
    salad : new Stuffing("salad",20,5),
    potato : new Stuffing("potato",15,10),
}

let hamburger1 = new Hamburger(stuffings.cheese , true);
hamburger1.addStuffing(stuffings.salad);
hamburger1.addTopping(toppings.mayo);

console.group(`Гамбургер 1`);
console.log(`Цена : ${hamburger1.calculatePrice()}`);
console.log(`Калорийность : ${hamburger1.calculateCalories()}`);
console.groupEnd();

let hamburger2 = new Hamburger(stuffings.potato);
hamburger2.addStuffing(stuffings.salad);
hamburger2.addTopping(toppings.sauce);

console.group(`Гамбургер 2`);
console.log(`Цена : ${hamburger2.calculatePrice()}`);
console.log(`Калорийность : ${hamburger2.calculateCalories()}`);
console.groupEnd();
