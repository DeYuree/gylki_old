import colors from 'vuetify/es5/util/colors'

import axios from 'axios'

require('dotenv').config()

const isDev = process.env.NODE_ENV !== 'production'

// import purgecss from '@fullhuman/postcss-purgecss'
const imageminMozjpeg = require('imagemin-mozjpeg')
// const JavaScriptObfuscator = require('webpack-obfuscator')
const ImageminPlugin = require('imagemin-webpack-plugin').default


export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		htmlAttrs: {
			lang: 'ru'
		},
		// titleTemplate: '%s - ' + process.env.npm_package_name,
		// title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	rootDir: __dirname,

	router: {
		prefetchLinks: false,
		base: process.env.NODE_ENV === 'development' ? '/' : '/gylki/',
	},

	loading: '~/components/page/Loading.vue',

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'swiper/dist/css/swiper.css'
	],

	// custom styles in components
	styleResources: {
		sass: './assets/sass/base.sass'
	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/lazyLoadImg.js' },
		{ src: '~/plugins/transliteration.js' },
		{ src: '~/plugins/localStorage.js', ssr: false },
		{ src: '~/plugins/swiper.js', mode: 'client' },
		{ src: '~/plugins/adminFuncs.js' }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: [
		'~/components/page',
		'~/components/product',
		'~/components/cart',
		'~/components/admin/import',
		'~/components/mainPage'
	],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxtjs/vuetify',
		'@nuxtjs/style-resources'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios',
		'nuxt-trailingslash-module',
		'@nuxtjs/dotenv'
	],

	serverMiddleware: [
        // '@../server/index.js',
    ],

	axios: {
		baseURL: (process.env.NODE_ENV !== 'production' ) ? 'http://localhost:5000' : 'https://sheltered-mountain-42564.herokuapp.com/',
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		defaultAssets: {
			icons: 'fa',
		},
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		optimizeCss: false,
		extractCSS: false,
		filenames: {
			app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
			chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
			css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
			img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
			font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
			video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
		},
		...(!isDev && {
			html: {
				minify: {
					collapseBooleanAttributes: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyJS: true,
					processConditionalComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					trimCustomFragments: true,
					useShortDoctype: true
				}
			}
		}),
		splitChunks: {
			layouts: true,
			pages: true,
			commons: true
		},
		optimization: {
			minimize: !isDev
		},
		// ...(!isDev && {
		// 	extractCSS: {
		// 		ignoreOrder: true
		// 	}
		// }),

		transpile: ['vue-lazy-hydration', 'intersection-observer'],
		postcss: {
			plugins: {
				...(!isDev && {
					cssnano: {
						preset: ['default', {
							autoprefixer: false,
							cssDeclarationSorter: false,
							minifyFontValues: {
								removeQuotes: false,
							},
							zindex: false,
							discardComments: {
								removeAll: true
							}
						}]
					}
				})
			},
			...(!isDev && {
				preset: {
					browsers: 'cover 99.5%',
					autoprefixer: true
				}
			}),

			order: 'cssnanoLast'
		},
		extend(config, ctx) {
			const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'

			// Remove any original svg rules

			const vueSvgLoader = [
				{
					loader: 'vue-svg-loader',
					// options: {
					// 	svgoConfig: {
					// 		cleanupIDs: false
					// 	}
					// }
					options: {
						svgo: {
							plugins: [
								{minifyStyles: false},
								{convertTransform: false},
								{cleanupIDs: false},
								{inlineStyles: false},
								{removeEmptyContainers: false}
							]
						}
					}
				}
			]
			const imageMinPlugin = new ImageminPlugin({
				pngquant: {
					quality: '5-30',
					speed: 7,
					strip: true
				},
				jpegtran: {
					progressive: true

				},
				gifsicle: {
					interlaced: true
				},
				plugins: [
					imageminMozjpeg({
						quality: 70,
						// arithmetic: true,
						progressive: true
					})

				]
			})
			if (!ctx.isDev) config.plugins.push(imageMinPlugin)

			config.module.rules.forEach(rule => {
				if (rule.test.toString() === ORIGINAL_TEST) {
					rule.test = /\.(png|jpe?g|gif|webp)$/i
					rule.use = [
						{
							loader: 'url-loader',
							options: {
								limit: 1000,
								name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
							}
						}
					]
				}
			})

			// config.module.rules.push({
            //     test: /\.svg$/,
            //     loader: 'vue-svg-loader'
			// })
			
			// Create the custom SVG rule
			const svgRule = {
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /inline/,
						use: vueSvgLoader
					},
					{
						resourceQuery: /data/,
						loader: 'url-loader'
					},
					{
						resourceQuery: /raw/,
						loader: 'raw-loader'
					},
					{
						loader: 'file-loader' // By default, always use file-loader
					}
				]
			}

			config.module.rules.push(svgRule) // Actually add the rule
		}
	},

	generate: {
		fallback: '404.html',
		concurrency: 20,
		interval: 100,
		crawler: false,
		dir: 'public',
		
		async routes() {		

			return await axios.all([
				axios.get('https://sheltered-mountain-42564.herokuapp.com/api/pages'),
				axios.get('https://sheltered-mountain-42564.herokuapp.com/api/categories'),
				axios.get('https://sheltered-mountain-42564.herokuapp.com/api/products')
			]).then(axios.spread( (...responses) => {
				let outRoutes = []
				responses.forEach( (res, index) => {
					switch(index) {
						case 0:
							res.data.map( route => {
								outRoutes.push(
									{
										route: '/page/' + route.link,
										payload: route
									}
								)
							})
						break;

						case 1:
							res.data.map( route => {
								outRoutes.push(
									{
										route: '/catalog/' + route.link,
										payload: route
									}
								)
							})
						break;

						case 2:
							res.data.map( route => {
								outRoutes.push(
									{
										route: '/product/' + route.link,
										payload: route
									}
								)
							})
						break;
					}
				})
				
				return outRoutes

			})).catch(err => {
				console.log(err)
			})
		}
	}
}
