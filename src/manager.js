import { API_URL } from '/src/env';

class Product {
    constructor(id = "", name = "", desc = "", price = 0) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
    }
}

class Stock {
    constructor() {
        this.list_product = [];
    }

    async fetch_products() {
        try {
            let response = await fetch(`${API_URL}/GetProduct`);
            this.list_product = await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    get_list_product() {
        return this.list_product;
    }

    get_prod_by_id(id) {
        return this.list_product.find(product => product.id == id);
    }
}

class Cart {
    constructor() {
        this.list_cart = {};
    }

    get_list_cart() {
        return this.list_cart;
    }

    addInCart(id) {
        if (this.list_cart[id]) {
            this.list_cart[id]++;
        } else {
            this.list_cart[id] = 1;
        }
    }

    removeFromCart(id) {
        if (this.list_cart[id]) {
            if (this.list_cart[id] === 1) {
                delete this.list_cart[id];
            } else {
                this.list_cart[id]--;
            }
        }
    }

    get_nbr_product() {
        let total = 0;
        for (const id in this.list_cart) {
            total += this.list_cart[id];
        }
        return total;
    }

    get_total_price(stock) {
        let total = 0;
        for (const id in this.list_cart) {
            let product = stock.get_prod_by_id(id);
            if (product) {
                total += this.list_cart[id] * product.price;
            }
        }
        return total;
    }
}

export { Product, Stock, Cart };
