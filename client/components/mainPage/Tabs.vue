<template>
	<v-card>
		<v-tabs
		v-model="tab"
		class="elevation-8"
		>
			<v-tab
				v-for="item in filtredItems"
				:key="item.tab"
			>
				{{ item.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items 
			v-model="tab"
			class="mt-6"
		>
			<v-tab-item
				v-for="item in filtredItems"
				:key="item.tab"
			>
				<tab-item :items="item.content" />
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		data () {
			return {
				tab: null,
				items: [
					{ tab: 'Распродажа', content: null},
					{ tab: 'Новинки', content: null },
					{ tab: 'Хиты', content: null }
				],
			}
		},

		mounted() {
			this.items.forEach((item, key) => {
				switch(key) {
					case 0: 
						item.content = this.visibleProducts.filter(prod => {
							return prod.oldPrice > 0 && prod.active == true
						})
					break;

					case 1:
						item.content = this.visibleProducts.filter(prod => {
							return prod.newer == true && prod.active == true
						})
					break;

					case 2:
						item.content = this.visibleProducts.filter(prod => {
							return prod.bestseller == true && prod.active == true
						})
					break;
				}
			})
		},

		computed: {
			...mapState('products', {
				visibleProducts: 'visibleProducts'
			}),

			filtredItems() {
				return this.items.filter(item => {
					return item.content !== null && item.content !== undefined
				})
			}
		}
	}
</script>

<style lang="sass">
	.v-card
		border-radius: 24px 4px !important
		.v-tabs
			background-color: rgba($light-color, 0.95) !important
			border-radius: 24px 4px
			.v-tabs-bar
				background-color: transparent !important
				&.v-slide-group--is-overflowing
					.v-slide-group__prev
						display: none !important
				.v-tabs-slider
					background-color: $broun-color
				.v-tab
					color: $broun-color
					font: 26px MooMoo
					font-weight: bold
					letter-spacing: 2px
					line-height: 32px
					text-transform: none
					transition: all 0.4s
					&:hover
						background-color: $broun-color
						color: $light-color !important
</style>