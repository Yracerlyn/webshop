<template>
  <div class="IndexPage">
    <br>
    <div class="row">
      <!-- Product list -->
      <div class="col-md-9">
        <div class="row gx-4 gy-4 row-cols-3">
          <div class="col" v-for="product in list_products" :key="product.id">
            <div class="p-3 border bg-light">
              <h5>{{ product.name }}</h5>
              <p>{{ product.desc }}</p>
              <p>{{ product.price }}</p>
              <button type="button" class="btn btn-success btn-sm" @click="add_to_cart(product.id)">Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Cart -->
      <div class="col-6 col-md-3">
        <div class="col">
          <div class="p-3 border bg-success">
            <h5>Cart</h5>
          </div>
        </div>
        <div class="row gx-4 row-cols-1">
          <div class="col" v-for="(value, id) in list_cart" :key="id">
            <div class="p-3 border bg-light">
              {{ get_info_product(id) }}
              <h5>{{ getProductName(id) }}</h5>
              <h6>Quantité: {{ value }}</h6>
              <button type="button" class="btn btn-success btn-sm" @click="remove_from_cart(id)">Supprimer</button>
            </div>
          </div>
          <!-- show total -->
          <div class="col">
            <div class="p-3 border bg-success">
              <h5>Total: {{ total_price }}</h5>
              <h6>Nombre de produits: {{ nbr_product }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Stock, Cart} from '../manager';

export default {
  name: 'IndexPage',
  data() {
    return {
      stock: new Stock(),
      cart: new Cart(),
      list_products: [],
      list_cart: {},
      desc_product: {},
      total_price: 0,
      nbr_product: 0,
    };
  },
  async created() {
    await this.stock.fetch_products();
    this.list_products = this.stock.get_list_product();
    this.update_cart();
  },
  methods: {
    add_to_cart(id) {
      this.cart.addInCart(id);
      this.update_cart();
    },
    get_info_product(id) {
      const product = this.stock.get_prod_by_id(id);
      return product ? `${product.name} - ${product.price}€` : '';
    },
    getProductName(id) {
      const product = this.stock.get_prod_by_id(id);
      return product ? product.name : '';
    },
    update_cart() {
      this.list_cart = this.cart.get_list_cart();
      this.update_total();
    },
    update_total() {
      let total = 0;
      let nbr = 0;
      for (const id in this.list_cart) {
        const product = this.stock.get_prod_by_id(id);
        if (product) {
          total += this.list_cart[id] * product.price;
          nbr += this.list_cart[id];
        }
      }
      this.total_price = total;
      this.nbr_product = nbr;
    },
    remove_from_cart(id) {
      this.cart.removeFromCart(id);
      this.update_cart();
    },
  },
};
</script>

<style scoped>
</style>
