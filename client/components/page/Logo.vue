<template>
	<nuxt-link :to="'/'" :class="this.classProp" class="text-center">
		<v-toolbar-title v-text="this.title" />
	</nuxt-link>
</template>

<script>
export default {
	props: {
		classProp: '',
		title: ''
	}
}
</script>

<style lang="sass" scoped>
	.v-toolbar__title
		font: 38px Adigiana
		font-weight: bold
		letter-spacing: 0.1em
		color: $red-color
		width: 100%
</style>