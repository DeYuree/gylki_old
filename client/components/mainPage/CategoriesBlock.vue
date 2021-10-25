<template>
	<div class="categories-block d-flex flex-wrap justify-space-around align-start" id="paral">
		<v-card 
			v-for="item in categories"
			:key="item.name"
			class="categories-block__item ma-6 elevation-8 d-flex"
		>
			<nuxt-link :to="`/catalog/${item.link}`">
				<v-img
					:src="isImage(item)"
					:lazy-src="isImage(item)"
					aspect-ratio="1"
					class="d-flex align-center"
				>
					<v-card-title class="d-flex justify-center text-center flex-wrap pa-1">{{item.name}}</v-card-title>
					<template v-slot:placeholder>
						<v-row
							class="fill-height ma-0"
							align="center"
							justify="center"
						>
							<v-progress-circular
							indeterminate
							color="grey lighten-5"
							></v-progress-circular>
						</v-row>
					</template>
				</v-img>
			</nuxt-link>
		</v-card>
	</div>
</template>

<script>

import { mapState } from 'vuex'
export default {
	computed: {
		...mapState('appSettings', {
			categories: 'leftMenuLinks'
		})
	},

	methods: {
		isImage(item) {
			try {
				return require('~/static/' + item.image.src)
			} catch {
				return require('~/static/noProductImage.jpg')
			}
		}
	}
}
</script>

<style lang="sass" scoped>
.categories-block
	::v-deep
		.categories-block__item
			cursor: pointer
			width: 130px
			height: 130px
			border-radius: 50% !important
			position: relative
			a
				width: 100%
				position: relative
				.v-image
					border: 2px solid transparent
					transition: all 0.4s
					max-width: 130px
					border-radius: 50%
					position: relative
					&::before
						content: ''
						position: absolute
						width: 100%
						height: 100%
						left: 0
						top: 0
						background-color: rgba($dark-color, 0.4)
						z-index: 2
						border-radius: 50%
						transition: background-color 0.4s
					&:hover
						border: 2px solid $red-color
						&::before
							background-color: rgba($broun-color, 0.9)
				.v-card__title
					font: 20px Adigiana
					color: $white-color
					word-break: break-word
					z-index: 3
					position: relative
</style>