<template>
	<v-carousel 
		cycle 
		height="340"
		light
		hide-delimiter-background
		show-arrows-on-hover
		prev-icon="fas fa-chevron-left"
		next-icon="fas fa-chevron-right">
		<v-carousel-item
			v-for="(item,i) in items"
			:key="i"
		>
			<v-card class="carousel-item py-sm-6 px-sm-12" min-width="170px" elevation="14">
				<nuxt-link :to="item.link">
					<div class="d-flex flex-no-wrap justify-space-around">
						<v-avatar
							class="ma-3 d-none d-md-flex"
							size="280"
							tile
						>
							<v-img :src="item.src" :alt="item.title"></v-img>
						</v-avatar>
						<div class="d-flex flex-column align-center justify-start">
							<v-card-title class="text-center mb-4 mb-sm-8 mt-4">{{item.title}}</v-card-title>
							<v-card-subtitle v-text="item.subtitle"></v-card-subtitle>
							<v-spacer></v-spacer>
							<div class="btn-act__wrap d-flex justify-end pr-4 mb-8">
								<v-btn class="btn-act" rounded>{{item.buttonTitle}}</v-btn>
							</div>
						</div>
					</div>
				</nuxt-link>
			</v-card>
		</v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
	data () {
      return {
        items: [],
      }
	},
	
	async fetch() {
		
		try {
			// let carouselItems = await this.$store.dispatch('firebase/getAlldocsFromCollection', { collection: 'carousel' }, {root:true} )
			let carouselItems = await this.$axios.$get('/api/carousel')
			
			if(carouselItems) this.items = carouselItems

		} catch (err) {
			return error({
				statusCode: 404,
				message: 'Ничего не найдено'
			})
		}
	}
}
</script>

<style scoped lang="sass">
.v-carousel
	border-radius: 24px 0px
	::v-deep
		.carousel-item
			background-color: rgba($white-color, 0.9)
			margin: 0 auto 40px auto
			height: 100%			
			.v-pagination__item, .v-pagination__navigation
				outline: none
				transition: all .4s
				&:hover
					background-color: $broun-color
					color: $white-color
			.v-card__title
				font: 32px Adigiana
				color: $broun-color
				letter-spacing: 0.04em
				line-height: 0.85em
				word-break: normal
			.v-card__subtitle
				color: $blue-color
				font: 28px OwnHand
				text-transform: lowercase
				line-height: 1.2em
				letter-spacing: 0.01em
				font-weight: normal
				text-align: center
			.btn-act__wrap
				width: 100%
			.btn-act
				background-color: $red-color !important
				transition: all .4s
				outline: 0
				right: 0
				height: 48px
				color: $white-color
				font: 18px MooMoo
				&:hover, &:active, &:focus
					background-color: $blue-color !important
				&::before
					background: transparent
				&.incart
					background-color: $blue-color !important
		.v-window__prev, .v-window__next
			background-color: transparent
			.v-btn
				transition: all 0.4s
				&:hover, &:active, &:focus
					background-color: $broun-color !important
				&::before
					background: transparent
				i
					color: $broun-color !important
					font-size: 26px !important
					transition: all 0.4s
				&:hover i
					color: $white-color !important
		.v-carousel__controls
			.v-btn
				background-color: $white-color
				border: 1px solid $broun-color
				width: 16px
				height: 16px
				transition: all 0.4s
				&::before
					background: transparent
				&:hover, &:active, &:focus
					background-color: $broun-color !important
				&.v-btn--active
					background-color: $broun-color
				.v-icon 
					&::before
						content: ''

	@include media-xs-only
		.v-card__title
			font-size: 26px !important
		.v-card__subtitle
			font-size: 22px !important
</style>