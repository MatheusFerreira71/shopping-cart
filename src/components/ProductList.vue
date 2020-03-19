<template>
  <div>
      <h1>Product list</h1>
      <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif"
      >
      <ul v-else>
          <li
          v-for="product in products"
          :key="product.id"
          >
          {{product.title}} - price {{product.price | currency}} - inventory {{product.inventory}}
          <button
          @click="addProductToCart(product)"
          :disabled="!productIsInStock(product)"
          >Add to Cart</button>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState({
        products: state => state.products.items
        }),
        ...mapGetters('products', {
            productIsInStock: 'productIsInStock'
        })
    },
    created () {
        this.loading = true
        this.fetchProducts().then(() => this.loading = false)
    },
    data () {
        return {
            loading: false
        }
    },
    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
            addProductToCart: 'cart/addProductToCart'
        })
    }
}
</script>
