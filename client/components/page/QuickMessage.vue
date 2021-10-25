<template>
	<v-fade-transition>
		<v-snackbar
			:color="message.color"
			top
			right
			dark
			v-model="message.isVisible"
			:timeout=-1
			@change="this.clearMessage"
		>
			<v-row justify="start" align="center" @click="this.clearMessage">
				<v-col cols="2">
					<v-icon>{{message.icon}}</v-icon>
				</v-col>
				<v-col
					cols="10"
					class="text-start pl-0"
				>
					<span>{{message.extraText}}</span>
					<h4 class="pt-2" v-html="message.mainText"></h4>
				</v-col>
			</v-row>
		</v-snackbar>
	</v-fade-transition>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
	computed:{
		...mapState('message', { message: 'message' })
	},
	methods: {
		...mapActions('message', [
			'clearMessage'
		])
	}
	
}
</script>

<style lang="sass" scoped>
	.v-snack
		::v-deep
			.v-snack__wrapper
				width: 300px
				min-width: 300px		
				transition: all 0.4s
				cursor: pointer
				opacity: 0.90
				border-radius: 10px
				background-color: transparent
				// box-shadow: none !important
				box-shadow: 3px 3px 5px 1px rgb(0 0 0 / 0.3)
				.v-snack__content
					letter-spacing: 0.1em
					.v-icon
						color: $white-color
					h4
						font: 22px AngryBirds
						text-transform: lowercase
						line-height: 18px						
						color: $white-color
					span
						font: 22px MooMoo
						line-height: 18px
						color: $broun-color
						font-weight: bold
				&:hover
					opacity: 1
</style>