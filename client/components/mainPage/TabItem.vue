<template>
	<v-card flat>
		<div v-swiper:tabSwiper="tabSwiperOption" class="tab-swiper mx-0 mx-sm-4">
			<div class="swiper-wrapper pt-6">
				<div class="swiper-slide" v-for="item in items" :key="item.id">				
					<product-card :product="item" />																	
				</div>
			</div>
			<div class="swiper-button-prev" v-if="this.items.length > 1"></div>
			<div class="swiper-button-next" v-if="this.items.length > 1"></div>
		</div>
	</v-card>
</template>

<script>
export default {
	props: ['items'],
	data () {
		return {
			tabSwiperOption: {
				observer: true,
				observeParents: true,
				observeSlideChildren: true,
				// loop: true,
				// loopedSlides: 5,
				slidesPerView: 3,
				grabCursor: true,
				spaceBetween: 5,
				// mousewheel: true,
				// autoplay: {
				// 	delay: 4500,
				// 	disableOnInteraction: false
				// },
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				breakpoints: {
					1140: {
						slidesPerView: 2
					},
					740: {
						slidesPerView: 1
					}
				},
			}
		}
	}
}
</script>

<style lang="sass" scoped>
.tab-swiper
	.swiper-button-prev, .swiper-button-next
		outline: none
	.swiper-button-prev
		left: 4px
	.swiper-button-next
		right: 4px

@include media-xs-only
	.swiper-button-prev, .swiper-button-next
		width: 15px
		background-size: 15px 44px
	.swiper-button-prev
		left: 4px !important
	.swiper-button-next
		right: 4px !important
</style>