const state = () => ({
    leftMenuMini: false,
    leftMenuShow: null,
    topLinks: [],
    leftMenuLinks: [],
    socialLinks: [
        {
        icon: 'fab fa-facebook',
        color: 'indigo',
        link: "https://www.facebook.com"
        },
        {
        icon: 'fab fa-vk',
        color: 'cyan darken-1',
        link: "https://www.vk.com"
        },
        {
        icon: 'fab fa-instagram',
        color: 'red lighten-3',
        link: "https://www.instagram.com"
        },
        {
        icon: 'fab fa-viber',
        color: 'red lighten-3',
        link: "https://www.viber.com"
        }
    ],
    currentPage: []
})

const getters = {
    GETTER_LEFT_MENU_MINI: (state) => {
        return state.leftMenuMini
    },
    GETTER_LEFT_MENU_SHOW: (state) => {
        return state.leftMenuShow
    },
    GETTER_SOCIAL_LINKS: (state) => {
        return state.socialLinks
    },
    GETTER_CURRENT_PAGE_DATA: (state) => {
        return state.currentPage
    }
}

const actions = {
    SET_LEFT_MENU_MINI: ({commit}, payload) => {
        commit('CHANGE_LEFT_MENU_MINI', payload)
    },
    SHOW_LEFT_MENU: ({commit}, payload) => {
        commit('CHANGE_LEFT_MENU_SHOW', payload)
    },

    async GET_CURRENT_PAGE ({commit, dispatch}, payload) {
        
        // let curPage = await dispatch('firebase/getAlldocsFromCollectionWithQuery', 
        //     {   collection: 'pages', 
        //         query: {prop: 'link', equal: '==', data: payload.route.params.page}
        //     },
        //     {root:true}
        // )
        
        let curPage = await this.$axios.$get(`/api/pages/${payload.route.params.page}`)

        // if (curPage[0]){
            await commit('SET_CURRENT_PAGE_DATA', curPage)
        // }
        // else{
        //     this.$nuxt.error() // Redirect to error page
        // }
        // await this.$axios.$get(`/api/pages/${payload.route.params.page}`)
        //     .then(res => {
        //         // console.log(res)
        //         commit('SET_CURRENT_PAGE_DATA', res)    
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.$nuxt.error()
        //     })
    },

    async GENERATE_LEFT_MENU_LINKS ({commit}) {
        // firebase version
        // let activeCategories = await dispatch('firebase/getAlldocsFromCollectionWithQuery', 
        //     {   collection: 'categories', 
        //         query: {prop: 'active', equal: '==', data: true},
        //         order: 'name'
        //     },
        //     {root:true}
        // )

        // let activeCategories = await this.$axios.$get('/api/categories')
        // commit('SET_LEFT_MENU_LINKS', activeCategories)    

        await this.$axios.$get(`/api/categories`)
            .then(res => {
                commit('SET_LEFT_MENU_LINKS', res)  
                commit('SORT_LEFT_MENU_LINKS')  
            })
            .catch(error => {
                commit('SET_LEFT_MENU_LINKS', {})
            })
    },

    async GENERATE_TOP_MENU_LINKS ({commit, dispatch}) {
        // firebase version
        // let activePages = await dispatch('firebase/getAlldocsFromCollectionWithQuery', 
        //     {   collection: 'pages', 
        //         query: {prop: 'active', equal: '==', data: true},
        //         order: 'order'
        //     },
        //     {root:true}
        // )

        // let activePages = await this.$axios.$get('/api/pages')
        // let activePages = await this.$axios.$get(`${getOrigin()}/api/pages`)

        // commit('SET_TOP_MENU_LINKS', activePages)
        await this.$axios.$get(`/api/pages`)
            .then(res => {
                commit('SET_TOP_MENU_LINKS', res)    
            })
            .catch(error => {
                commit('SET_TOP_MENU_LINKS', {})
            })
    }
}

const mutations = {
    CHANGE_LEFT_MENU_MINI: (state, payload) => {
        state.leftMenuMini = payload
    },
    CHANGE_LEFT_MENU_SHOW: (state, payload) => {
        state.leftMenuShow = payload
    },

    SET_CURRENT_PAGE_DATA: (state, payload) => {
        state.currentPage = payload
    },

    SET_LEFT_MENU_LINKS: (state, payload) => {
        state.leftMenuLinks = payload
    },

    SET_TOP_MENU_LINKS: (state, payload) => {
        state.topLinks = payload
    },

    SORT_LEFT_MENU_LINKS: (state) => {
        return state.leftMenuLinks.sort(function(a,b) {
            var x = a.name.toLowerCase()
            var y = b.name.toLowerCase()
            return x < y ? -1 : x > y ? 1 : 0
        })
    }
}

export default {
    namespaced: true,
    getters,
    actions,
    mutations,
    state
}