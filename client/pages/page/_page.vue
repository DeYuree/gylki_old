<template>
    <v-layout
		column
		justify-start
		align-start
		class="pb-8"
	>
        <v-container fluid>
			<v-row no-gutters>
				<v-col cols='12' class="text-right py-4">
					<cart-button />
				</v-col>
			</v-row>
			<v-row no-gutters class="control-panel elevation-8 px-6 py-4">
				<v-col cols='12'>
					<h3 class="mx-auto mb-0 px-4">{{page.title}}</h3>
				</v-col>
			</v-row>
			<v-row no-gutters class="mt-3">
				<v-col cols="12" class="pl-md-5 mb-4">
					<div class="main-content__block pa-6 pl-6 pb-8" v-html="page.description"></div>
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
			title: this.page.title,
			titleTemplate: '%s | Игрушки для всех gylki.by',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.page.description
				}
			]
		}
	},

	async fetch ({ error, store, route }) {
		try {
			await store.dispatch('appSettings/GET_CURRENT_PAGE', { route: route })
		}
		catch(e) {
			error({ statusCode: 404, message: 'Такая страница не найдена' })
		}
	},

	computed: {
		...mapState('appSettings', {
			page: 'currentPage'
		}),
	}
}
</script>

<style lang="sass" scoped>
	.control-panel
		background-color: rgba($light-color, 0.95) !important
		border-radius: 24px 4px
		h3
			color: $broun-color
			font: 26px MooMoo
			font-weight: bold
			letter-spacing: 2px
			line-height: 32px
	.main-content__block
		background-color: rgba($white-color, .95)
		border-radius: 24px 4px
		font: 18px OwnHand
		color: $broun-color
		letter-spacing: 2px
</style>