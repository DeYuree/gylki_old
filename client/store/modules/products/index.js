const getters = {
    ALL_PRODUCTS_GETTER: (state) => {
        return state.products
    },

    ALL_CATEGORIES_GETTER: (state) => {
        return state.categories
    },

    GETTER_CURRENT_PAGE: (state) => {
        return state.currentPage
    },

    GETTER_CURRENT_CATEGORY: (state) => {
        return state.currentCategory
    },

    GETTER_PAGE_SIZE: (state) => {
        return state.pageSize
    },

    GETTER_CURRENT_PAGE_PRODUCTS: (state) => {
        let currentPageProducts = state.visibleProducts,
            start = (state.currentPage-1) * state.pageSize,
            end = start + state.pageSize

        return (currentPageProducts !== null) ? currentPageProducts.slice(start, end) : []
    }
}

const actions = {
    async GET_ALL_PRODUCTS ({commit, dispatch}) {
        // let allProducts = await dispatch('firebase/getAlldocsFromCollection', { collection: 'products' }, {root:true} )

        let allProducts = await this.$axios.$get(`/api/products`)
        commit('RESET_CURRENT_PAGE')

        commit('SET_PRODUCTS_FOR_CATEGORY', allProducts)
    },

    async GET_CURRENT_PRODUCT ({commit, dispatch}, payload) {
        // try {
            // let curProd = await dispatch('firebase/getAlldocsFromCollectionWithQuery', 
            //     {   collection: 'products', 
            //         query: {prop: 'link', equal: '==', data: payload.route.params.product} 
            //     },
            //     {root:true}
            // )

            let curProd = await this.$axios.$get(`/api/products/${payload.route.params.product}`)

            commit('SET_CURRENT_PRODUCT', curProd)

            //return this.$nuxt.error({ statusCode: 404, message: 'not found' })

            let curCategory
            // console.log(curProd)

            // if(curProd[0].hasOwnProperty('categories') && curProd[0].categories.main) {
            //     curCategory = await dispatch('firebase/getAlldocsFromCollectionWithQuery', 
            //         {   collection: 'categories', 
            //             query: {prop: '__name__', equal: '==', data: curProd[0].categories.main} 
            //         },
            //         {root:true}
            //     )
                
            // }

            if(curProd.hasOwnProperty('categories') && curProd.categories.main) {
                curCategory = await this.$axios.$get(`/api/categories/for_product`, {
                    params: {id: curProd.categories.main }
                })
            }

            commit('SET_CURRENT_CATEGORY', curCategory ? curCategory : [])

            
        // }     
        // catch(e) {
        //     error({ statusCode: 404, message: 'Post not found' })
        //     // return this.$nuxt.error({ statusCode: 404, message: 'not found' })
        // }
    },

    async GET_PRODUCTS_FOR_CATEGORY( {commit, dispatch}, payload ) {

        // let curCategory = await dispatch('firebase/getAlldocsFromCollectionWithQuery', 
        //     {   collection: 'categories', 
        //         query: {prop: 'link', equal: '==', data: payload.route.params.category} 
        //     },
        //     {root:true}
        // )

        // console.log(payload.route.params.category)

        // let curCategory = await this.$axios.$get(`/api/categories/${payload.route.params.category}`)
        let curCategory = await this.$axios.$get(`/api/categories/${payload.route.params.category}`)
        
        commit('SET_CURRENT_CATEGORY', curCategory)

        //get all products that have cat in main or additional 
        // let curProducts = [
        // ...await dispatch('firebase/getAlldocsFromCollectionWithQuery', 
        //     {   collection: 'products', 
        //         query: {prop: 'categories.main', equal: '==', data: curCategory[0].id}
        //     }, 
        //     {root:true}
        // ), 
        // ...await dispatch('firebase/getAlldocsFromCollectionWithQuery', 
        //     {   collection: 'products', 
        //         query: {prop: 'categories.additional', equal: 'array-contains', data: curCategory[0].id} 
        //     }, 
        //     {root:true}
        // )]
            
        // //remove products that have the same cat in main and additional
        // let uniqueCurProducts = curProducts.reduce((acc, value) => 
        //     acc.some(i => i.link === value.link) ? acc : acc.concat(value), [])


        let curProducts = await this.$axios.$get(`/api/products/for_category`, {
                params: {curCategory: curCategory._id}
        })

        commit('RESET_CURRENT_PAGE')
        commit('SET_PRODUCTS_FOR_CATEGORY', curProducts)
       
    },

    async UPDATE_SINGLE_PRODUCT({commit}, payload) {
        await commit('CHANGE_ANY_PRODUCT_IN_VISIBLEPRODUCTS', payload)
    }
}

const mutations = {
    CHANGE_ANY_PRODUCT_IN_VISIBLEPRODUCTS: (state, payload) => {
        state.visibleProducts = state.visibleProducts.map( prod => {            
            return prod.id == payload.id ? payload : prod
        })
    },

    SET_ALL_PRODUCTS: (state, payload) => {
        state.products = payload
    },

    SET_CATEGORIES: (state, payload) => {        
        state.categories = payload
    },

    SET_PRODUCTS: (state, payload) => {
        state.products = payload
    },

    SET_PRODUCTS_FOR_CATEGORY: (state, payload) => {
        state.visibleProducts = payload
    },

    SET_CURRENT_PRODUCT: (state, payload) => {
        state.product = payload
    },

    SET_CURRENT_PAGE: (state, payload) => {
        state.currentPage = payload
    },

    SET_CURRENT_CATEGORY: (state, payload) => {
        state.currentCategory = payload
    },

    RESET_CURRENT_PAGE: (state) => {
        state.currentPage = 1
    },

    RESET_STATE: (state) => {
        state.visibleProducts = [],
        state.pageSize = 21,
        state.currentPage = 1,
        state.categories = [],
        state.product = {},
        state.products = [],
        state.currentCategory = {}
    },

    SORTING_PRODUCTS_FOR_CATEGORY: (state, payload) => {
        payload.direction == 'desc' ? state.visibleProducts.sort((a, b) => (a[payload.prop] < b[payload.prop] ? 1 : -1)) :
                                      state.visibleProducts.sort((a, b) => (a[payload.prop] < b[payload.prop] ? -1 : 1))
    }
}

const state = () => ({
    visibleProducts: [],
    pageSize: 21,
    currentPage: 1,
    categories: [
        // {id: '1V2DaXwv1c43bZv2r8R3', link: 'hot-weels', name: 'ХОТ ВИЛС'},
        // {id: 'X7tUpsb4vTwvBj0C7w36', link: 'pups', name: 'Куклы Pups'},
        // {id: 'pMbeAf61xIBAbiBm7Dc6', link: 'games', name: 'Игры и игрушки'},
    ],
    currentCategory: {},
    product: {},
    products: [
        // {
        //     id: "1",
        //     vendor: "Hot Wheels",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "11111Набор игровой Hot Wheels Атака осьминога",
        //     link: "hot-weels-ataka-osminoga",
        //     description: "Игровой набор Афонтака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 200.30,
        //     oldPrice: 350,
        //     images: {
        //         mainImage: { alt: "товар 1 главное фото", src: require('~/static/product_1.jpg'), label: "товар 1 главное фото" },
        //         galleryImages: [
        //           { alt: "товар 1 фото 2", src: require('~/static/product_1.jpg'), label: "товар 1 фото 2" },
        //           { alt: "товар 1 фото 3", src: require('~/static/product_2.jpg'), label: "товар 1 фото 3" },
        //           { alt: "товар 1 фото 4", src: require('~/static/product_3.jpg'), label: "товар 1 фото 4" },
        //         ],
        //     },
        //     categories: {
        //         main: '1V2DaXwv1c43bZv2r8R3',
        //         additional: ['X7tUpsb4vTwvBj0C7w36', 'pMbeAf61xIBAbiBm7Dc6']
        //     }
        // },
        // {
        //     id: "2",
        //     vendor: "Hot Wheels2",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "22222Набор игровой Hot Wheels Сити",
        //     link: "hot-weels-city",
        //     description: "Игровой набор Атака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 800,
        //     oldPrice: 1050,
        //     images: {
        //         mainImage: { alt: "1 Модельные ЭКОКОЖА", src: require('~/static/product_3.jpg'), label: "1 Модельные ЭКОКОЖА" },
        //         galleryImages: [
        //           { alt: "1 Модельные ЭКОКОЖА", src: require('~/static/product_4.jpg'), alt: "1 Модельные ЭКОКОЖА" },
        //           { alt: "2 Модельные ЭКОКОЖА", src: require('~/static/product_2.jpg'), alt: "2 Модельные ЭКОКОЖА" },
        //           { alt: "3 Модельные ЭКОКОЖА", src: require('~/static/product_3.jpg'), alt: "3 Модельные ЭКОКОЖА" },
        //         ],
        //     },
        //     categories: {
        //         main: '1V2DaXwv1c43bZv2r8R3',
        //         additional: ['pMbeAf61xIBAbiBm7Dc6']
        //     }
        // },
        // {
        //     id: "3",
        //     vendor: "Hot Wheels3",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "33333Набор игровой Hot Wheels Атака осьминога Набор с треком KidzTech Hot Wheels",
        //     link: "hot-weels-trek1",
        //     description: "Игровой набор Атака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 125.8,
        //     images: {
        //         mainImage: { alt: "1 Модельные ЭКОКОЖА", src: require('~/static/product_1.jpg'), label: "1 Модельные ЭКОКОЖА" },
        //         galleryImages: [
        //           { alt: "1 Модельные ЭКОКОЖА", src: require('~/static/product_4.jpg'), alt: "1 Модельные ЭКОКОЖА" },
        //           { alt: "2 Модельные ЭКОКОЖА", src: require('~/static/product_2.jpg'), alt: "2 Модельные ЭКОКОЖА" },
        //           { alt: "3 Модельные ЭКОКОЖА", src: require('~/static/product_3.jpg'), alt: "3 Модельные ЭКОКОЖА" },
        //         ],
        //     },
        //     categories: {
        //         main: '1V2DaXwv1c43bZv2r8R3',
        //         additional: []
        //     }
        // },
        // {
        //     id: "4",
        //     vendor: "Hot Wheels",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "Товар 4",
        //     link: "hot-weels-ataka-osminoga2",
        //     description: "Игровой набор Афонтака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 200.60,
        //     oldPrice: 350,
        //     images: {
        //         mainImage: { alt: "товар 1 главное фото", src: require('~/static/good1.jpg'), label: "товар 1 главное фото" },
        //         galleryImages: [
        //           { alt: "товар 1 фото 2", src: require('~/static/product_1.jpg'), label: "товар 1 фото 2" },
        //           { alt: "товар 1 фото 3", src: require('~/static/product_2.jpg'), label: "товар 1 фото 3" },
        //           { alt: "товар 1 фото 4", src: require('~/static/product_3.jpg'), label: "товар 1 фото 4" },
        //         ],
        //     },
        //     categories: {
        //         main: null,
        //         additional: ['1V2DaXwv1c43bZv2r8R3']
        //     }
        // },
        // {
        //     id: "5",
        //     vendor: "Hot Wheels5345345",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "555555555Набор игровой Hot Wheels Атака осьминога",
        //     link: "hot-weels-trek3333",
        //     description: "Игровой набор Афонтака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 154,
        //     oldPrice: 350,
        //     images: {
        //         mainImage: { alt: "товар 1 главное фото", src: require('~/static/good2.jpg'), label: "товар 1 главное фото" },
        //         galleryImages: [
        //           { alt: "товар 1 фото 2", src: require('~/static/good3.jpg'), label: "товар 1 фото 2" },
        //           { alt: "товар 1 фото 3", src: require('~/static/product_2.jpg'), label: "товар 1 фото 3" },
        //           { alt: "товар 1 фото 4", src: require('~/static/product_3.jpg'), label: "товар 1 фото 4" },
        //         ],
        //     },
        //     categories: {
        //         main: '1V2DaXwv1c43bZv2r8R3',
        //         additional: ['X7tUpsb4vTwvBj0C7w36', 'pMbeAf61xIBAbiBm7Dc6']
        //     }
        // },
        // {
        //     id: "6",
        //     vendor: "Hot Wheels5345345",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "666666Набор игровой Hot Wheels Атака осьминога",
        //     link: "hot-weels-trek4",
        //     description: "Игровой набор Афонтака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 200,
        //     images: {
        //         mainImage: { alt: "товар 1 главное фото", src: require('~/static/good3.jpg'), label: "товар 1 главное фото" },
        //         galleryImages: [
        //           { alt: "товар 1 фото 2", src: require('~/static/good1.jpg'), label: "товар 1 фото 2" },
        //           { alt: "товар 1 фото 3", src: require('~/static/product_2.jpg'), label: "товар 1 фото 3" },
        //           { alt: "товар 1 фото 4", src: require('~/static/product_3.jpg'), label: "товар 1 фото 4" },
        //         ],
        //     },
        //     categories: {
        //         main: null,
        //         additional: []
        //     }
        // }
    ]
})

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}