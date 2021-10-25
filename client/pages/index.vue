<template>
	<v-layout
		column
		justify-start
		align-start
	>
		<v-container fluid class="pa-4">
			<v-row no-gutters>
				<v-col cols='12' class="text-right pt-4">
					<cart-button />
				</v-col>
			</v-row>

			<v-row no-gutters>
				<v-col cols="12" class="px-sm-8 my-4">
					<carousel></carousel>
				</v-col>
			</v-row>

			<v-row no-gutters class="products_block mb-4">
				<v-col cols="12" class="pa-0">
					<tabs></tabs>
				</v-col>
			</v-row>

			<v-row no-gutters class="products_block mb-4">
				<v-col cols='12' class="control-panel elevation-8 px-6 py-4">
					<h3 class="mb-0 px-4">Категории</h3>
				</v-col>
				<v-col cols='12'>
					<v-parallax 
						:src="require('~/static/bg.png')"
						class="category-block"
						:height="this.parallaxHeight"
					>
						<categories-block />
					</v-parallax>
				</v-col>
			</v-row>
		</v-container>
	</v-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
	data: () => ({
		pageSize: 5,
    	currentPage: 1,
		parallaxHeight: 500
	}),
	async fetch( {store, error} ) {
		try {
			await store.dispatch('products/GET_ALL_PRODUCTS')

			} catch (err) {
			return error({
				statusCode: 404,
				message: 'Категория не найдена или сервер не доступен'
			})
		}
	},

	head () {
		return { 
			title: "Игрушки для всех gylki.by",
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: "gylki.by интернет-магазин игрушек для детей любого возраста"
				}
			]
		}
	},

	mounted() {
		window.addEventListener('resize', this.checkCatblockesHeight)
		setTimeout(() => this.checkCatblockesHeight(), 50)
		
	},

	destroyed() {
		window.removeEventListener('resize', this.checkCatblockesHeight)
	},


	computed: {
		...mapGetters('products', ['ALL_PRODUCTS_GETTER']),
		...mapState('products', {
			visibleProducts: 'visibleProducts',
			categories: 'categories'
		}),
	},

	methods: {
		checkCatblockesHeight() {
			this.parallaxHeight = document.getElementById('paral').scrollHeight
		}
	}
}
</script>

<style lang="sass" scoped>
	.products_block
		::v-deep
			background-color: rgba($white-color, .95)
			border-radius: 24px 4px
			.control-panel
				background-color: rgba($light-color, 0.95) !important
				border-radius: 24px 4px
				z-index: 2
				h3
					color: $broun-color
					font: 26px MooMoo
					font-weight: bold
					letter-spacing: 2px
					line-height: 32px
			.main_block
				display: flex
				flex-wrap: wrap
				width: 100%
			.category-block
				border-radius: 24px 4px !important
				.v-parallax__content
					background-color: rgba($white-color, 0.5)
					justify-content: flex-start !important
</style>
