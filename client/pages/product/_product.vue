<template>
	<v-layout
		column
		justify-start
		align-start
	>
		<v-container fluid class="main-content pa-md-8 pb-12 pa-2">
			<v-row no-gutters>
				<v-col cols='12' class="text-right pt-0 pb-6">
					<cart-button />
				</v-col>
			</v-row>

			<v-row no-gutters class="mt-4">
				<v-col cols="12" md="8" class="main-content__block pb-4 mb-4">			

					<v-row no-gutters>
						<h3 class="text-center mx-auto mt-8 mb-0 px-4">{{product.title}}</h3>
					</v-row>

					<v-row no-gutters>
						<v-col cols="12" class="px-8 py-2">
							<bread-crumbs />
						</v-col>
					</v-row>
					<v-row no-gutters>									
						<v-col cols="12" class="px-md-4 px-0">
							<swiper-carousel :banners="this.allImagesForCarousel" ref="carousel"/>
						</v-col>					
					</v-row>
				</v-col>
				
				<v-col cols="12" md="4" class="pl-md-5 mb-4">
					<div class="main-content__block pa-4 pl-6 pb-8">
						<div v-if="product.actualPrice" class="main-content__price-actual">{{product.actualPrice}} <span>руб</span></div>
						<div v-if="product.oldPrice" class="main-content__price-old">{{product.oldPrice}} <span>руб</span></div>
						<div class="py-8 d-flex justify-end">
							<to-cart 
								:product="product"
								:removeFromCartText="'Уже в корзине'" 
								:toCartText="'В корзину'" />
						</div>

						<div class="main-content__plus pt-6 d-flex">
							<v-icon>fas fa-shipping-fast</v-icon>
							<div class="ml-4">Экспресс доставка из магазина по всей Беларуси</div>
						</div>	

						<div class="main-content__plus pt-6 d-flex">
							<v-icon>fas fa-clock</v-icon>
							<div class="ml-4">Прием заказов через сайт круглосуточно</div>
						</div>

						<div class="main-content__plus pt-6 d-flex">
							<v-icon>fas fa-tachometer-alt</v-icon>
							<div class="ml-4">Высокая скорость обработки заказов с 10:00 до 22:00</div>
						</div>
					</div>
				</v-col>
			</v-row>

			<v-row no-gutters>
				<v-col cols="12" class="main-content__block pa-6">
					<h4>О товаре</h4>
					<div class="mt-4">Артикул: <span>{{product.vendorCode}}</span></div>
					<!-- <div class="mt-4" v-html="product.description.split('\\r\\n').join('<br>')"></div> -->
					<!-- <div class="mt-4" v-html="JSON.stringify(product.description).split('\\r\\n').join('<br>')"></div> -->
					<!-- <div class="mt-4" v-html="formatedDescr"></div> -->
					<div class="mt-4" v-html="this.product.description"></div>
				</v-col>
			</v-row>
		</v-container>
	</v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
	head () {
		return { 
			title: this.product.title,
			titleTemplate: '%s | Игрушки для всех gylki.by',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.product.description
				}
			]
		}
	},

	data: () => ({
		allImagesForCarousel: []
	}),

	async fetch({ store, error, route }) {
		try {
			await store.dispatch('products/GET_CURRENT_PRODUCT', { route: route })
		}
		catch(e) {
            error({ statusCode: 404, message: 'Такой товар не найден' })
            // return this.$nuxt.error({ statusCode: 404, message: 'not found' })
        }
	},

	async beforeMount() {
		await this.getAllImagesForCarousel()
	},

	computed: {
		...mapState('products', {
			product: 'product'
		}),

		formatedDescr() {
			return JSON.stringify(this.product.description).split('\\r\\n').join('<br>').split('\"').join('')
		}
	},
	methods: {
		getAllImagesForCarousel() {			
			try {
				this.allImagesForCarousel.push(
					{
						alt: this.product.images.alt, 
						label: this.product.images.mainImage.label, 
						src: require("~/static/product/" + 
							(this.product.vendorCode) + "/" + 
							this.product.images.mainImage.src)
					}
				)
			} catch (e) {
				// this.allImagesForCarousel.push(
				// 	{	
				// 		alt: 'нет изображения', 
				// 		label: '', 
				// 		src: require("~/static/noProductImage.jpg")
				// 	}
				// )
			}

			try {
				this.product.images.galleryImages.forEach( (item) => 
					this.allImagesForCarousel.push({
					alt: item.alt, 
					label: item.label,
					src: require("~/static/product/" + (this.product.vendorCode) + "/" + item.src)
				}) )
			} catch (e) {
				// this.allImagesForCarousel.push(
				// 	{	
				// 		alt: 'нет изображения', 
				// 		label: '', 
				// 		src: require("~/static/noProductImage.jpg")
				// 	}
				// )
			}

			if(this.allImagesForCarousel.length == 0) this.allImagesForCarousel.push({alt: 'нет изображения', label: '', src: require("~/static/noProductImage.jpg")})
		},
	}
}
</script>

<style lang="sass" scoped>
.main-content
	::v-deep
		h3, h4
			color: $broun-color
			font: 36px Adigiana
			text-transform: lowercase
			font-weight: bold
			letter-spacing: 2px
			line-height: 32px
		h4
			font: 32px OwnHand
			letter-spacing: 0.05em
		.main-content__block
			background-color: rgba($white-color, .95)
			border-radius: 24px 4px
			.main-content__price-actual
				color: $red-color
				font-weight: bold
				font: 34px Adigiana
			.main-content__price-old
				color: $broun-color
				font: 18px Adigiana
				text-decoration: line-through
			.main-content__plus
				color: $broun-color
				font: 18px OwnHand
				line-height: 20px
				text-transform: lowercase
				font-weight: bold
				letter-spacing: 1px
				.v-icon
					color: $blue-color
</style>