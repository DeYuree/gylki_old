<template>
	<!-- <v-col :cols="cols" :sm="sm" :md="md" :xl="xl"> -->
		<div class="product-card__wrap">
			<v-card class="product-card d-flex flex-column px-6 pt-6" raised shaped max-width="300px" min-width="170px" elevation="14">
				<nuxt-link :to="`/product/${product.link}`" class="product-card__link d-flex flex-column">
					<!-- <v-img
						:src="isImage"
						max-width="300px"
						max-height="250px"
						class="ma-0"
						contain
					></v-img> -->
					<div class="d-flex flex-column flex-grow-1 justify-center">
						<img
							:src="isImage"
							:lazy-src="isImage"
							class="product-card__img ma-0"
						/>
					</div>
					<v-card-title class="product-card__title py-2 px-0 flex-shrink-0">
						{{product.title}}
					</v-card-title>

					<!-- <v-card-text class="product-card__price d-flex flex-column pt-2 pb-4 px-0">
						<div v-if="product.actualPrice" class="product-card__price_actual">{{product.actualPrice}} <span>руб</span></div>
						<div v-if="product.oldPrice" class="product-card__price_old">{{product.oldPrice}} <span>руб</span></div>
					</v-card-text> -->
				</nuxt-link>

				<v-card-actions class='pa-0'>
					<v-card-text class="product-card__price d-flex flex-column pt-2 pb-2 px-0">
						<div v-if="product.actualPrice" class="product-card__price_actual">{{product.actualPrice}} <span>руб</span></div>
						<div v-if="product.oldPrice" class="product-card__price_old">{{product.oldPrice}} <span>руб</span></div>
					</v-card-text>

					<to-cart :product="product" :fab="'fab'" />
				</v-card-actions>

				<v-slide-y-reverse-transition group leave-absolute hide-on-leave class="pb-2">
					<v-card-text 
						key="short"
						v-if="!showDescr"
						class="short-descr py-0 px-0 pr-4"
						:class="{'text-truncate': !showDescr}"
						v-html="product.description"
					>
					</v-card-text>
					<v-card-text 
						v-if="showDescr" 
						key="full"
						class="product-card__descr pa-0 pb-4"
						v-html="product.description">						
					</v-card-text>
				</v-slide-y-reverse-transition>
				
				<v-card-actions v-if="product.description" class="product-card__chevron pa-0">
					<v-btn
						icon
						absolute
						right
						retain-focus-on-click
						:ripple="false"
						x-small
						@click="showDescr = !showDescr"
					>	
						<v-slide-y-reverse-transition leave-absolute group>
							<v-icon v-if="showDescr"  key="extra-up">fas fa-chevron-up</v-icon>
							<v-icon v-if="!showDescr"  key="extra-down">fas fa-chevron-down</v-icon>
						</v-slide-y-reverse-transition>
					</v-btn>
				</v-card-actions>
			</v-card>
		</div>
			
	<!-- </v-col> -->

</template>

<script>
	export default {
		props: {
			product: {
				type: Object
			},
			cols: {
				type: Number,
				default: 12
			},
			sm: {
				type: Number,
				default: 6
			},
			md: {
				type: Number,
				default: 4
			},
			xl: {
				type: Number,
				default: 3
			}
		},
		data: () => ({
			showDescr: false
		}),
		computed: {
			isImage() {
				try {
					return require("~/static/product/" + (this.product.vendorCode) + "/" + this.product.images.mainImage.src)
				} catch (e) {
					return require("~/static/noProductImage.jpg")
				}
			}
		}
	}    
</script>

<style lang="sass" scoped>
.product-card__wrap
	max-width: 340px
	min-width: 210px
	margin: 0 auto
	.product-card
		background-color: $white-color
		margin: 0 20px 60px 20px
		::v-deep
			.product-card__link
				min-height: 200px
			.product-card__title
				font: 26px Adigiana
				color: $blue-color
				letter-spacing: 0.04em
				line-height: 0.85em
				word-break: normal
			.product-card__img
				max-width: 300px
				max-height: 250px
				background-size: contain
				width: 100%
			.product-card__price
				min-height: 52px
				.product-card__price_actual
					color: $red-color
					font-weight: bold
					font: 34px Adigiana
				.product-card__price_old
					color: $broun-color
					font: 18px Adigiana
					text-decoration: line-through
			.product-card__chevron
				position: relative
				height: 1px
				z-index: 2
				.v-btn
					top: -30px
					right: -15px
					color: $broun-color
					&::before
						background: transparent
			.short-descr
				height: 45px
				font: 22px Adigiana
				color: $broun-color
				text-transform: lowercase
				line-height: 1em
				letter-spacing: 0.01em
				font-weight: normal
				opacity: 0.5
				position: relative
				&::after
					content: ''
					position: absolute
					width: 100%
					height: 21px
					bottom: 0
					left: 0
					background: linear-gradient($white-color 0%, $white-color 100%)
					opacity: 0.8
			.product-card__descr
				font: 22px Adigiana
				color: $broun-color
				text-transform: lowercase
				line-height: 1em
				letter-spacing: 0.01em
				font-weight: normal
</style>