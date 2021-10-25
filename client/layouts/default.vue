<template>
	<v-app class="app-body">
		<left-menu />

		<top-bar />

		<v-main>
			<v-container fluid class="pa-0 pb-8">
				<nuxt />
			</v-container>			
		</v-main>	
		
		<foo-ter></foo-ter>
	</v-app>
</template>

<script>
</script>


<style lang="sass" scoped>
.app-body
	margin: 0 auto
	padding: 0
	background-image: url("~static/bg1.jpg")
	background-repeat: no-repeat
	background-position: 0 0
	background-attachment: fixed
	background-size: cover
	font-size: 16px
	max-width: 1800px
	position: relative
	line-height: 1.6
	overflow-x: hidden
	transition: all .5s cubic-bezier(.55,0,.1,1)
</style>