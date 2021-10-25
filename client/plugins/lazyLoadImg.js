import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

export default async (context, inject) => {
	Vue.use(VueLazyload, {
		preLoad: 0,
		//error: 'https://via.placeholder.com/300',
		error: require("~/static/noProductImage.jpg"),
		// eslint-disable-next-line
		loading: require("~/static/loading_4.gif"),
		attempt: 3,
		lazyComponent: true,
		observer: true,
		throttleWait: 500
	})
}