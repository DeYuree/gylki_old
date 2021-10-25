<template>
	<v-breadcrumbs :items="crumbs" divider=">" class="breadcrumbs pa-0">
		<template v-slot:item="{ item }">
			<v-breadcrumbs-item 
				class="breadcrumbs_item"
				nuxt
				:to="item.to"
				:disabled="item.disabled"
				exact
				exact-active-class="active"
			>
				{{ item.text }}				
			</v-breadcrumbs-item>
		</template>
	</v-breadcrumbs>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
		...mapState('products', {
			currentCategory: 'currentCategory',
			currentProduct: 'product'
		}),
		
        crumbs() {			
			let breadcrumbs = []

			// home link
			breadcrumbs.push({
				to: '/catalog',
				text: 'Каталог'
			})

			// crumb for category page
			if(this.$route.params.category) {				
				breadcrumbs.push({
					to: this.currentCategory.link,
					text: this.currentCategory.name
				})
			}

			// crumb for product page

			if(this.$route.params.product) {				
				// link for product main category
				if(Object.keys(this.currentCategory).length !== 0) {
					breadcrumbs.push({
						to: '/catalog/' + this.currentCategory.link,
						text: this.currentCategory.name
					})
				}

				// last link for product
				breadcrumbs.push({
					to: this.currentProduct.link,
					text: this.currentProduct.title
				})
			}
			return breadcrumbs
        }
    }
}
</script>

<style lang="sass" scoped>
.breadcrumbs
	::v-deep
		.breadcrumbs_item a
			font: 16px OwnHand
			text-transform: lowercase
			font-weight: bold
			letter-spacing: 1px
			color: $blue-color
			transition: color 0.4s
			&:hover
				color: $red-color !important
			&.active
				color: rgba($dark-color, 0.5)
		.v-breadcrumbs__divider
			font: 18px OwnHand
			padding: 0 8px 2px 8px
			color: $blue-color
			font-weight: bold
</style>