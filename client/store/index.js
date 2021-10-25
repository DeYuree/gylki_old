import Vue from 'vue'
import Vuex from 'vuex'

import appSettings from './modules/appSettings'
import products from './modules/products'
import cart from './modules/cart'
import message from './modules/message'
import admin from './modules/admin'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        appSettings,
        products,
        cart,
        message,
    },
    actions: {
        async nuxtServerInit({commit, dispatch }) {
            await dispatch('appSettings/GENERATE_LEFT_MENU_LINKS')   
            await dispatch('appSettings/GENERATE_TOP_MENU_LINKS')
        }
    },
})
export default store