<template>
	<v-pagination 
		v-model="currentPage" 
		:length="pageCount"
		circle 
		color="#634326"
		:total-visible="5"
		prev-icon="fas fa-chevron-left"
		next-icon="fas fa-chevron-right">
	</v-pagination>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	props: ['total'],
	computed: {
		...mapGetters('products', ['GETTER_PAGE_SIZE', 'GETTER_CURRENT_PAGE']),
		currentPage: {
			get() {
				return this.GETTER_CURRENT_PAGE
			},
			set(val) {
				this.SET_CURRENT_PAGE(val)
			}
		},
		pageCount() {
			return Math.ceil(this.total / this.GETTER_PAGE_SIZE)
		},
	},
	methods: {
		...mapMutations('products', ['SET_CURRENT_PAGE'])
	} 
}
</script>

<style lang="sass">
.v-pagination
	.v-pagination__item, .v-pagination__navigation
		outline: none !important
		transition: all .4s
		&:hover
			background-color: $broun-color
			color: $white-color
	.v-pagination__navigation
		i
			color: $broun-color
			font-size: 14px
		&:hover i
			color: $white-color
</style>