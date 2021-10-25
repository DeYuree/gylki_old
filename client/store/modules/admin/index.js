const getters = {
    PRODUCTS_PROPS_GETTER: (state) => {
        return state.productsProps
    },

    IMPORT_DATA_GETTER: (state) => {
        return state.importData
    }
}

const actions = {
    async GET_PRODUCTS_PROPS ({commit}) {
        await this.$axios.$get(`/api/admin`)
            .then(res => {
                commit('SET_PRODUCTS_PROPS', res)    
            })
            .catch(error => {                
                commit('SET_PRODUCTS_PROPS', {})
            })
    },

    UPDATE_IMPORT_DATA: ({commit}, payload) => {
        commit ( 'SET_IMPORT_DATA', payload )
    },

    async UPDATE_ALL_PRODUCTS_IN_DB({commit}, payload) {
        return await this.$axios.$post(`/api/products`, {params: {products: payload} })
    },

    async UPDATE_SINGLE_PRODUCT_IN_DB({commit}, payload) {
        return await this.$axios.$put(`/api/products/${payload.id}`, { params: {product: payload} })
    }
}

const mutations = {
    SET_PRODUCTS_PROPS: (state, payload) => {
        state.productsProps = payload
    },

    SET_IMPORT_DATA: (state, payload) => {
        state.importData = payload

        // console.log(state.importData)
    },

    REMOVE_ITEM_FROM_IMPORT_DATA: (state, payload) => {
        state.importData.splice(-1, 1)
    },
}

const state = () => ({
    productsProps: [],
    importData: []
})

export default {
    namespaced: true,
    getters,
    actions,
    mutations,
    state
}