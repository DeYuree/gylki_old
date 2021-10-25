<template>
	<v-app-bar
		clipped-left
		fixed
		app
		class="app-bar"
	>
		<v-app-bar-nav-icon @click.stop="SHOW_LEFT_MENU(!GETTER_LEFT_MENU_SHOW)">
			<v-icon>fas fa-bars fa-xs medium</v-icon>
		</v-app-bar-nav-icon>

		<logo :class="'d-none d-md-flex'" :title="'GYLKI.BY'" />

		<v-spacer />
			<div class="contacts d-flex flex-column flex-shrink-0">
				<img src="~static/a1.jpg" alt="a1"/> <a class="ml-2" :href="'tel:+375445889498'"> (44) 588-94-98</a>
				<!-- <img src="~static/mts.jpg" alt="mts" class="mts"/> <a :href="'tel:+375295889288'">(29) 588-92-88</a> -->
			</div>
		<v-spacer />

		<v-toolbar-items class="hidden-sm-and-down">
			<!-- <v-btn
				:to="'/catalog'"
				text
				v-ripple="false"
				class="top-links"
				nuxt
				exact
			>Каталог</v-btn> -->

			<v-btn
				:to="'/page/' + topButton.link"
				text
				v-for="topButton in links"
				:key="topButton.title"
				v-ripple="false"
				class="top-links"
				nuxt
				exact
			>{{ topButton.title }}
			</v-btn>
		</v-toolbar-items>

		<v-menu :nudge-width="200" v-model="isTopMenuOpen" class="hidden-md-and-up">
			<template v-slot:activator="{ on }">
				<v-toolbar-title v-on="on" class="text-right hidden-md-and-up">
					<div class="toggle-top-menu hidden-md-and-up">
						<span class="sandwich" :class="{ active: isTopMenuOpen }">
							<span class="sw-topper"></span>
							<span class="sw-bottom"></span>
							<span class="sw-footer"></span>
						</span>
					</div>
					<!-- <v-app-bar-nav-icon :ripple="false" /> -->
				</v-toolbar-title>
			</template>

			<v-list class="toolbar-catalogue">
				<v-list-item
					v-for="toolButton in links"
					:key="toolButton.title"
					nuxt
					exact
					:to="'/page/' + toolButton.link"
				>
					<v-list-item-title v-text="toolButton.title" class="px-3"></v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
	data: () => ({
		isTopMenuOpen: false
	}),
	
	computed: {
		...mapGetters('appSettings', ['GETTER_LEFT_MENU_SHOW']),

		...mapState('appSettings', {
			links: 'topLinks'
		})
	},
	methods: {
		...mapActions('appSettings', ['SHOW_LEFT_MENU'])
	}
}
</script>

<style lang="sass" scoped>
.app-bar
	background-color: rgba($light-color, .9) !important
	::v-deep
		.v-toolbar__content
			padding-right: 4px
			.v-app-bar__nav-icon, .leftmenu-mini
				color: $broun-color
				i
					font-size: 18px !important
			.contacts
				position: relative
				a
					font: 26px Adigiana
					font-weight: bold
					letter-spacing: 0.05em
					color: $blue-color
				img
					position: absolute
					top: 5px
					left: -20px
					width: 20px
					height: 20px
					border-radius: 2px
					&.mts
						top: 37px
			.top-links
				font: 20px Adigiana
				font-weight: bold
				color: $broun-color
				transition: all 0.4s
				&:hover, &.v-btn--active
					background-color: $broun-color
					color: $light-color	
		.toggle-top-menu
			background-color: transparent
			display: block
			width: 48px
			height: 48px
			position: absolute
			// z-index: 100
			border: none
			right: 0
			top: 5px
			outline: none
			cursor: pointer
			span
				display: block
			.sandwich 
				width: 48px
				height: 48px
				position: absolute
				top: 13px
				left: 5px
				margin: auto
				background-color: transparent
				.sw-topper
					pointer-events: none // for disable event.target
					position: relative
					top: 0
					width: 20px 
					height: 2px
					background: $broun-color
					border: none
					border-radius: 4px 4px 4px 4px
					transition: transform 0.5s, top 0.2s
					display: block
				.sw-bottom
					pointer-events: none // for disable event.target
					position: relative
					width: 13px
					height: 2px
					top: 2px * 2.2
					background: $red-color
					border: none
					border-radius: 4px 4px 4px 4px
					transition: transform 0.3s, top 0.2s
					transition-delay: 0.1s, 0s
				.sw-footer
					pointer-events: none // for disable event.target
					position: relative
					width: 20px
					height: 2px
					top: 2px * 4.5
					background: $broun-color
					border: none
					border-radius: 4px 4px 4px 4px
					transition: all 0.5s
					//transition-delay: 0.1s
			.sandwich.active
				.sw-topper
					top: 7px
					transform: rotate(-45deg)
				.sw-bottom
					top: 5px
					width: 21px
					transform: rotate(45deg)
				.sw-footer
					opacity: 0
					top: 0
					transform: rotate(180deg)

.v-menu__content
	top: 38px !important
.v-app-bar__nav-icon
	&:hover, &:active, &:focus
		background-color: transparent
	&::before
		background: transparent


.toolbar-catalogue
	background-color: rgba($white-color, 0.97)
	a
		&::before
			display: none
		.v-list-item__title
			font: 22px Adigiana
			font-weight: bold
			color: $broun-color
			transition: all 0.4s
			letter-spacing: 1px
		&:hover, &.v-btn--active
			background-color: $broun-color
			.v-list-item__title
				color: $light-color
</style>