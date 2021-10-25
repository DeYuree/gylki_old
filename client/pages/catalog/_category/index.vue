<template>
	<v-layout
		column
		justify-start
		align-start
	>
		<v-container fluid class="pa-4" v-if="this.GETTER_CURRENT_PAGE_PRODUCTS.length">
			<v-row no-gutters>
				<v-col cols='12' class="text-right py-4">
					<cart-button />
				</v-col>
			</v-row>

			<v-row no-gutters class="page-descr elevation-8 my-6">
				<v-col cols='12' class="control-panel py-4 px-6">
					<h2>{{this.GETTER_CURRENT_CATEGORY.name}}</h2>
				</v-col>

				<v-col cols="12" class="pl-md-5 mb-4" v-if="this.GETTER_CURRENT_CATEGORY.description">
					<div class="pa-4 pl-6">
						{{this.GETTER_CURRENT_CATEGORY.description}}
					</div>
				</v-col>
			</v-row>

			<v-row no-gutters class="control-panel elevation-8 px-6 py-4">
				<v-col cols='12' md="4" sm="6" class="items-count order-1 order-md-1">
					<fromto-of :total="visibleProducts.length" />
				</v-col>
				<v-col cols='12' md="4" class="order-3 order-md-2">
					<pagination-links
						v-if="visibleProducts.length > this.GETTER_PAGE_SIZE"
						:total="visibleProducts.length" />
				</v-col>
				<v-col cols='12' md="4" sm="6" class="d-flex justify-sm-end order-2 order-md-3 mb-4">
					<sort-by class="flex-grow-0" />
				</v-col>
				<v-col cols="12" class="order-4 pt-2">
					<bread-crumbs />
				</v-col>
			</v-row>

			<v-row no-gutters class="pt-8 products d-flex flex-wrap justify-space-around">				
				<v-fade-transition class="d-flex flex-wrap justify-space-around" :group="this.GETTER_CURRENT_PAGE_PRODUCTS.length>1 ? true : false">
				<!-- <transition-group name="tweets" tag="span"> -->
					<template v-for="product in this.GETTER_CURRENT_PAGE_PRODUCTS">				
						<product-card :product="product" :key="product.id" />									
					</template>
				<!-- </transition-group> -->
				</v-fade-transition>
			</v-row>

			<v-row no-gutters>
				<v-col cols='12' class="text-center pb-4">
					<pagination-links
						v-if="visibleProducts.length > this.GETTER_PAGE_SIZE"
						:total="visibleProducts.length" />
				</v-col>
				<!-- <v-btn rounded @click="testWrite()">tet</v-btn> -->
			</v-row>
		</v-container>

		<v-container fluid class="pa-4" v-if="!this.GETTER_CURRENT_PAGE_PRODUCTS.length">
			<v-row no-gutters>
				<v-col cols='12' class="text-right py-4">
					<cart-button />
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col cols='12' md="8" class="pb-8 offset-md-2">
					<v-card class="d-flex flex-column align-center justify-center no-data">
						<v-card-text class="d-flex justify-center">
							<v-img :src="require('~/static/no-data.png')" alt="" max-width="200px" width="100%"></v-img>
						</v-card-text>
						<v-card-title class="pa-2 pb-8 text-center">В этом разделе пока нет товаров</v-card-title>
					</v-card>					
				</v-col>
			</v-row>
		</v-container>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    computed: {
		...mapGetters('products', [
				'GETTER_CURRENT_PAGE_PRODUCTS', 
				'GETTER_PAGE_SIZE', 
				'GETTER_CURRENT_CATEGORY', 
				'ALL_PRODUCTS_GETTER']),
		...mapState('products', {
			visibleProducts: 'visibleProducts'
		}),
	},

	async fetch ({ error, store, route }) {
		try {
			//store.commit('products/RESET_STATE')
			await store.dispatch('products/GET_PRODUCTS_FOR_CATEGORY', { route: route })
		} catch (err) {
			console.log(err)
			return error({
				statusCode: 404,
				message: err
			})
		}
	},

	head () {
		return { 
			title: this.GETTER_CURRENT_CATEGORY ? this.GETTER_CURRENT_CATEGORY.name : "",
			titleTemplate: '%s | Игрушки для всех gylki.by',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.GETTER_CURRENT_CATEGORY.description
				}
			]
		}
	},
	
    methods: {
		...mapActions('products', ['GET_PRODUCTS_FOR_CATEGORY'])
    }
}
</script>

<style lang="sass" scoped>
.control-panel
	background-color: rgba($light-color, 0.95) !important
	border-radius: 24px 4px
	h2
		color: $broun-color
		font: 26px MooMoo
		text-transform: lowercase
		font-weight: bold
		letter-spacing: 2px
		line-height: 32px
.page-descr
	background-color: rgba($white-color, .95)
	border-radius: 24px 4px
	font: 22px Adigiana
	color: $broun-color
	text-transform: lowercase
	line-height: 1em
	letter-spacing: 0.02em
	font-weight: normal
.products
	> span
		display: flex
		flex-wrap: wrap
		width: 100%
.no-data
	background-color: rgba($light-color, 0.95) !important
	border-radius: 24px 4px !important
	min-height: 100px
	.v-card__title
		font: 26px MooMoo
		font-weight: bold
		color: $broun-color
		line-height: 1em
		word-break: normal
</style>