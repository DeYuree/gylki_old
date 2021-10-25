<template>
	<v-app class="app-body">
		<v-container>
			<!-- <v-row no-gutters v-if="error.statusCode === 404"> -->
			<v-row no-gutters>
				<v-col cols='12' md="8" class="pb-8 offset-md-2">
					<v-card class="d-flex flex-column align-center justify-center no-data">
						<v-card-text class="d-flex justify-center">
							<v-img :src="require('~/static/no-data.png')" alt="" max-width="200px" width="100%"></v-img>
						</v-card-text>
						<v-card-title class="pa-2 pb-8 text-center">{{ erMessage }}</v-card-title>
						<v-card-actions class="d-flex flex-sm-row flex-column justify-space-around pb-4">
							<nuxt-link :to="`/`">
								<v-btn class="check-btn px-6 mb-sm-0 mb-4 home" text rounded>
									на главную
								</v-btn>
							</nuxt-link>
							<nuxt-link :to="`catalog`">
								<v-btn class="check-btn px-6" text rounded>
									начать покупки
								</v-btn>
							</nuxt-link>
						</v-card-actions>
					</v-card>					
				</v-col>
			</v-row>
			<!-- <v-row v-else>
				<h1>
					{{ error.message }}
				</h1>
			</v-row> -->
		</v-container>
	</v-app>
</template>

<script>
export default {
	layout: 'empty',
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	head () {
		return {
			title: this.erMessage,
			titleTemplate: '%s | Игрушки для всех gylki.by',
		}
	},

	computed: {
		erMessage() {
			return (this.error.message == 'This page could not be found') ? 'Такая страница не найдена' : this.error.message
		}
	}
}
</script>

<style lang="sass" scoped>
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
	.v-card__actions
		width: 100%
		.check-btn
			background-color: $red-color !important
			transition: all .4s
			outline: 0
			right: 0
			height: 42px
			color: $white-color
			font: 18px MooMoo
			&.home
				background-color: $gray-color !important
				color: $broun-color
			&:hover, &:active, &:focus
				background-color: $blue-color !important
			&::before
				background: transparent
			&.v-btn--disabled
				background-color: $gray-color !important
</style>
