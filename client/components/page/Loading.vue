<template>
	<v-fade-transition>
		<div class="loading-page" v-if="loading">
			<v-progress-circular
				class="loading-page__progress"
				indeterminate
				width="5"
				size="150">
				Loading...
			</v-progress-circular>
		</div>
	</v-fade-transition>
</template>

<script>
export default {
	data: () => ({
		loading: false
	}),
	methods: {
		start() {
			this.loading = true
		},
		finish() {
			this.loading = false
		}
	}
}
</script>

<style lang="sass" scoped>
.loading-page
	position: fixed
	top: 0
	left: 0
	width: 100%
	height: 100%
	background: rgba(11,6,3,.9)
	z-index: 10000
	text-align: center
	display: flex
	.loading-page__progress
		margin: auto
		color: #ea2d0f
</style>