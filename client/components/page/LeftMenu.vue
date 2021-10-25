<template>
	<v-navigation-drawer
			v-model="showHideDrawer"
			:mini-variant="this.GETTER_LEFT_MENU_MINI"
			clipped
			fixed
			floating
			app
			class="left-menu"
			name="leftMenu"
		>
		<div class="d-flex align-end flex-column">
			<v-btn
				icon
				class="leftmenu-mini hidden-sm-and-down"
				@click.stop="SET_LEFT_MENU_MINI(!GETTER_LEFT_MENU_MINI)"
			>
			<v-icon>fas fa-chevron-{{ `${this.GETTER_LEFT_MENU_MINI ? 'right' : 'left'}`}}</v-icon>
		</v-btn>
		</div>

		<logo :class="'d-flex d-md-none'" :title="'GYLKI.BY'" />

		<social-links />

		<v-list>
			<v-list-item
				v-for="link in links"
				:key="link.id"
				:to="'/catalog/' + link.link"
				exact
				dense
				nuxt
			>
				<v-list-item-icon v-if="link.icon">
					<v-icon v-text="link.icon"></v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title v-text="link.name" />
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
	computed: {
		...mapGetters('appSettings', [
			'GETTER_LEFT_MENU_SHOW',
			'GETTER_LEFT_MENU_MINI'
		]),

		...mapState('appSettings', {
			links: 'leftMenuLinks'
		}),

		showHideDrawer: {
			get() {
				return this.GETTER_LEFT_MENU_SHOW
			},
			set(val) {
				this.SHOW_LEFT_MENU(val)
			}
		},

		// leftMenuLinksSort() {
		// 		this.sortLinks = this.links
		// 		return this.sortLinks.sort(function(a,b) {
		// 			var x = a.name.toLowerCase()
		// 			var y = b.name.toLowerCase()
		// 			return x < y ? -1 : x > y ? 1 : 0
		// 		})
		// }
	},

	methods: {
		...mapActions('appSettings', ['SHOW_LEFT_MENU', 'SET_LEFT_MENU_MINI'])
	}
}
</script>

<style lang="sass" scoped>
.left-menu
	background-color: rgba($white-color, 0.95)
	a
		transition: all 0.4s
		.v-list-item__title
			font: 28px MooMoo
			font-weight: bold
			color: $broun-color
			transition: all 0.4s
		&:hover, &.v-list-item--active
			background-color: $broun-color
			.v-list-item__title
				color: $light-color
			i
				color: $light-color !important
		.v-list-item__icon
			margin-right: 10px
			margin-top: 17px
			i
				color: $broun-color
				transition: all 0.4s
				margin: 0 auto
				font-size: 16px
	.leftmenu-mini
		font-weight: bold
		color: $broun-color
		transition: all 0.4s
		height: auto
		right: 0
		&:hover, &.v-btn--active
			background-color: none
		i
			font-size: 16px
		&::before
			background: transparent
</style>