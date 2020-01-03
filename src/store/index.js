import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        cart: []
    },
    getters: {
        availableProducts (state) {
            return state.products.filter(product => product.inventory > 0)
        }
    },
    actions: {
        fetchProducts ({ commit }) {
            return new Promise(resolve => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        },
        addProductToCart ({ commit, state }, product) {
            if (product.inventory > 0) {
                const cartItem = state.cart.find(item => item.id === product.id)
                if(!cartItem) {
                    commit('pushProductToCart', product.id)
                } else {
                    commit('incrementItemQuantity', cartItem)
                }
                commit('decreamentProductInventory', product)
            }
        }
    },
    mutations: {
        setProducts (state, products) {
            state.products = products
        },
        pushProductToCart (state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity (state, cartItem) {
            cartItem.quantity++
        },
        decreamentProductInventory (state, product) {
            product.inventory--
        }
    }
})