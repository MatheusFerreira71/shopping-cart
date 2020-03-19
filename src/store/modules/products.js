import shop from '@/api/shop'
export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {
        availableProducts(state) {
            return state.items.filter(product => product.inventory > 0)
        },
        productIsInStock() {
            return product => product.inventory > 0
        }
    },
    mutations: {
        setProducts(state, products) {
            state.items = products
        },
        decreamentProductInventory(state, product) {
            product.inventory--
        }
    },
    actions: {
        fetchProducts({ commit }) {
            return new Promise(resolve => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        }
    }
}