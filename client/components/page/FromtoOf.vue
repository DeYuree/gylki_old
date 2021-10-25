<template>
	
		<div class="from-to">		
			<span>Товары:</span>
			<transition-group name="fade">
				<div class="d-flex d-inline-flex" :key="keyForTransition">
					<span class="from-to__disp">{{fromToDisplay}}</span>
					&nbsp;из {{total}}
				</div>
			</transition-group>
		</div>		
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
	props: ['total'],
	data: () => ({
		keyForTransition: 0
	}),
	computed: {
		...mapGetters('products', ['GETTER_PAGE_SIZE', 'GETTER_CURRENT_PAGE']),
		...mapState('products', {
			visibleProducts: 'visibleProducts'
		}),
		fromToDisplay() {
			const start = (this.GETTER_CURRENT_PAGE * this.GETTER_PAGE_SIZE+1)-this.GETTER_PAGE_SIZE;
			const end = ((this.GETTER_CURRENT_PAGE * this.GETTER_PAGE_SIZE)-this.GETTER_PAGE_SIZE) + this.GETTER_PAGE_SIZE;
			this.keyForTransition = end

			return start + "-" + ((end <= this.visibleProducts.length) ? end : this.visibleProducts.length);
		}	
	},
}
</script>

<style lang="sass" scoped>
.from-to
	color: $broun-color
	font: 26px MooMoo
	font-weight: bold
	::v-deep
		.from-to__disp
			color: $red-color
.fade
	&-leave-active
		position: absolute
	&-enter-active, &-leave, &-leave-to
		transition: all 0.5s	
	&-enter, &-leave-to
		opacity: 0
</style>