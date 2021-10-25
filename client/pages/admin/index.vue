<template>
	<v-container fluid class="pa-4">

		<v-row no-gutters class="main_block mb-8">
			<v-col cols="12" class="px-8 py-0">
				<v-btn 
					type="submit" 
					class="btn-act" 
					rounded 
					@click.stop.prevent="tryAndCry"
				>ба бах</v-btn>
			</v-col>
		</v-row>

		<v-row no-gutters class="main_block mb-8">

			<h3 class="text-center mx-auto my-8 px-4">Импорт</h3>

			<v-col cols="12" class="px-8 py-0">
				<v-radio-group v-model="importType" row >
					<template v-slot:label>
						<div>Импортировать</div>
					</template>
					<v-radio 
						class="pl-6"
						value="products" 
						off-icon="far fa-circle" 
						on-icon="far fa-dot-circle" 
						label="Товары">
					</v-radio>
					<v-radio 
						class="pl-6"
						value="categories" 
						off-icon="far fa-circle" 
						on-icon="far fa-dot-circle" 
						label="Категории">
					</v-radio>
				</v-radio-group>
			</v-col>

			<v-col cols="12" md="4" class="px-8 py-0">
				<v-file-input
					show-size
					full-width
					prepend-icon="fas fa-paperclip"
					placeholder="Выбери файл xls"
					v-model="file"
					color="#634326"
					class="py-0"
				></v-file-input>				 
			</v-col>			
			<v-col cols="12" md="8" class="px-8">
				<v-form ref="form" id="frm" v-model="validForm">		
					<component
						v-for="(component, index) in components"
						:key="index"
						:is="component"
						@anotherProp="newCircle"
					/>
				</v-form>		
			</v-col>
			

			<v-col cols="12" class="text-center my-4">
				<v-btn 
					type="submit" 
					class="btn-act" 
					rounded 
					@click.stop.prevent="startImport" 
					:disabled="file == null || (file != null && !validForm)"
				>Импорт</v-btn>

				<v-btn 
					type="submit" 
					class="btn-act" 
					rounded
					:to="'/admin/import'"
					nuxt
					exact
				>В импорт</v-btn>
			</v-col>


		</v-row>
		<quick-message />
	</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import XLSX from 'xlsx'
import transliterate from '~/plugins/transliteration'
import helpFuncs from '~/plugins/adminFuncs'

import InprodField from "@/components/admin/import/InprodField.vue"

export default {
	components: {
		InprodField
	},

	async fetch ( { store } ) {
		await store.dispatch('admin/GET_PRODUCTS_PROPS')
    },

	data: () => ({
		components: [InprodField],
		validForm: true,
		file: null,
		importType: 'products'
	}),

	methods: {
		...mapActions('admin', ['UPDATE_IMPORT_DATA', 'UPDATE_ALL_PRODUCTS_IN_DB']),
		...mapActions('message', ['INIT_MESSAGE', 'clearMessage']),

		newCircle: function (val) {			
			if(val) { this.components.push(InprodField) }
			else { this.components.splice(-1, 1) }
		},

		readResponse(obj) {
			obj.forEach( xNode => {
				console.log(xNode)
			})
		},

		async tryAndCry(){
			// let enteredData = helpFuncs.collectManualData(this.$refs.form.$children)

			let links = helpFuncs.readXLSX(null, this.file)

			console.log(links)

			await this.$axios.$get(`/api/admin/gotourl`, {params: {url_path: 'http://supertoy.by/supertoy.xml'} })
				.then(res => {
					// this.readResponse(res.yml_catalog.shop[0].offers[0].offer)
				})
				.catch(error => {                
					console.log(error)
				})
            
			// let filesss = helpFuncs.readXMLfromURL('http://supertoy.by/supertoy.xml')
		},

		async testNewFunc() {
			let data = await this.getAlldocsFromCollection( { collection: 'products' } )

			let fireCategories = await this.getAlldocsFromCollection( { collection: 'categories' } )
			
			let activeCategories = await this.$axios.$get('/categories')

			// console.log(fireCategories)



			for(let elem in data) {
				let createdItem = {}

				if(data[elem].hasOwnProperty('link')){
					for(let item in data[elem]){
					// console.log(data[elem][item])
						switch (item) {
							case 'id':
							case 'lastUpdate':
							break;

							case 'categories':
								let category = data[elem][item]['main']						
								
								for(let fCat in fireCategories) {
									// console.log(fCat)
									if(fireCategories[fCat].id == category) {
										// console.log(fCat.id)

										for(let cat in activeCategories){
											if(fireCategories[fCat].link == activeCategories[cat].link) {
												createdItem['categories.main'] = activeCategories[cat]._id
											}
										}
										
									}
								}
							break;

							default: 
								createdItem[item] = data[elem][item]
							break;
						}
					}
				}

				// await this.$axios.$post('/products', { product: createdItem })
				// console.log(createdItem)
			}
		},

		startImport() {
			if (process.browser) { window.$nuxt.$loading.start() }
			// this.$refs.form.validate()

			this.readXLSXfile((error, fileData) => {				
				if(error) {
					let message = {
						mainText: "Ошибка!",
						extraText: error,
						color: 'red lighten-1',
						icon: 'fas fa-minus-circle'
					}
					this.clearMessage()

					setTimeout(() =>
						this.INIT_MESSAGE(message)
					, 400)
				}
				else {
					//run import to data
					let manualData = this.collectManualData()
					if (manualData) this.finishImport(fileData, manualData)
				}

				if (process.browser) { setTimeout(() => window.$nuxt.$loading.finish(), 1000) }
			})
		},

		collectManualData() {
			//collect manual data
			let manualData = []
			let formChildren = this.$refs.form.$children
			
			for(let key in formChildren) {
				let val = formChildren[key].finalData
				if(val) manualData.push(val)
			}
			
			// console.log(manualData)
			// remove all null elems
			let manualDataClean = manualData.filter( item => {
				let itemChecked = Object.keys(item).every( key => {
					return (item[key] != null || key !== 'undefined')
				})
				return (itemChecked == true) ? item : ''
			})
			
			// console.log(manualDataClean)

			//check correct val
			let count = 0, curVal = 0, curKeyVal = 0

			//check if repeate values in manualData
			for(let item in manualDataClean) {
				if(Object.values(manualDataClean[item]).includes(curVal)) {count++}
				curVal = Object.values(manualDataClean[item])[0]
				
				if(Object.keys(manualDataClean[item]).includes(curKeyVal)) {count++}
				curKeyVal = Object.keys(manualDataClean[item])[0]
			}

			//if yes - break
			if(count > 0) {
				let message = {
					mainText: "Ошибка!",
					extraText: 'Проверьте введенные данные',
					color: 'red lighten-1',
					icon: 'fas fa-minus-circle'
				}
				this.clearMessage()

				setTimeout(() =>
					this.INIT_MESSAGE(message)
				, 400)

				return
			}

			//if no - next
			else {
				return manualDataClean
			}			
		},

		readXLSXfile(callback) {
			let reader = new FileReader()
			reader.onload = function(e) {
				let data = e.target.result
				let workbook = XLSX.read(data, {type:'array'})

				const result = {}

				//for one sheet
				// let roa = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:1})
				// if(roa.length) result[workbook.SheetNames[0]] = roa 

				//for all sheets
				workbook.SheetNames.forEach(function(sheetName) {
					let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1})
					if(roa.length) result[sheetName] = roa
				})

				// console.log(result)
				callback(null, result)				
			}
			
			reader.onerror = () => callback(new Error(`Не удалось загрузить ${this.file}`))

			reader.readAsArrayBuffer(this.file)
		},

		async finishImport(file, manual) {
			let importData = []

			for (let k in file) {
				let sheet = file[k]
				sheet.forEach(item => {
					let itemData = {}									

					manual.forEach(manualItem => {
						for (let key in manualItem) {
							if(item[manualItem[key]-1]) { // if data in file line exists								
								switch(key) {
									case 'active':
										itemData[key] = Boolean(item[manualItem[key]-1])
									break

									case 'categoriesMain':															
										itemData['categories.main'] = (item[manualItem[key]-1].trim())						
									break

									case 'categoriesAdditional':
										itemData['categories.additional'] = (item[manualItem[key]-1]).trim().split(",").map(el => el.trim())								
									break

									case 'imagesMainImage':
										itemData['images.mainImage.src'] = (item[manualItem[key]-1]).trim()
									break

									case 'imagesGalleryImages':
										itemData['images.galleryImages'] = (item[manualItem[key]-1]).trim().split(",").map(el => {
											let elTr = {}
											elTr.src = el.trim()
											return elTr
											})								
									break

									default:
										(typeof(item[manualItem[key]-1]) == 'string') ? 
										// itemData[key] = JSON.parse(JSON.stringify((item[manualItem[key]-1]).trim())) : // trim string couse ЖЭСТЬ in files
										itemData[key] = (item[manualItem[key]-1]).trim() : // trim string couse ЖЭСТЬ in files
										itemData[key] = item[manualItem[key]-1]	
									break
								}
							}
							else { // if data in file empty
								switch(key) {
									case 'active':
										itemData[key] = Boolean(false)
									break

									case 'categoriesMain':																
										itemData['categories.main'] = ''										
									break

									case 'categoriesAdditional':
										itemData['categories.additional'] = ''								
									break

									case 'imagesMainImage':
										itemData['images.mainImage.src'] = ''
									break

									// case 'categoriesAdditional':
									// 	itemData['categories.additional'] = (item[manualItem[key]-1]).trim().split(",").map(el => el.trim())								
									// break

									default:
										itemData[key] = ''										
									break
								}
							}
						}
						
					})

					//create transliterate link for every import product 
					if(!itemData.hasOwnProperty('link') && itemData.hasOwnProperty('title')) {
						if(itemData.vendorCode) {
							itemData['link'] = transliterate(itemData.title) + "-" + transliterate(itemData.vendorCode)
						}
						else{
							itemData['link'] = transliterate(itemData.title)
						}
					}

					//update time
					// itemData['lastUpdate'] = firebase.firestore.FieldValue.serverTimestamp()
				
					importData.push(itemData)
				})
			}

			

			let impData = {
				collection: 'products',
				data: importData
			}

			try {

				await this.UPDATE_ALL_PRODUCTS_IN_DB(importData)

				let message = {
						mainText: "Импортировано записей: " + impData.data.length,
						extraText: "Импорт завершен успешно",
						color: 'green lighten-1',
						icon: 'fas fa-check-circle'
					}

				this.clearMessage()

				setTimeout(() =>
					this.INIT_MESSAGE(message)
				, 400)
			}
			catch (err) {
				if (process.browser) {
					let message = {
						mainText: "Ошибка!",
						extraText: err,
						color: 'red lighten-1',
						icon: 'fas fa-minus-circle'
					}
					this.clearMessage()

					setTimeout(() =>
						this.INIT_MESSAGE(message)
					, 400)
				}
			}
		},	

		createDir() {
			// this.downloadImg = false

			// if(process.server) {
				
			// }
			

			// const fs = require('fs');
			// // console.log(fs)
			// const fs = (process.server ? require('fs-extra') : null)

		
			// const folderName = '/static/product/test'

			// console.log(fs.mkdir);
			// await makeDir('/static/product/test')

			// (async () => {
			// 	const path = makeDir('/static/product/test')
			
			// 	console.log(path);
			// })();


			// const data = await this.download('https://random.dog/vh7i79y2qhhy.jpg', './static/image.jpg');
  			// console.log(data); // The file is finished downloading.
		},


		// async download(url, dest) {
		// 	/* Create an empty file where we can save data */
		// 	const file = fs.createWriteStream(dest);

		// 	/* Using Promises so that we can use the ASYNC AWAIT syntax */
		// 	await new Promise((resolve, reject) => {
		// 		request({
		// 				/* Here you should specify the exact link to the file you are trying to download */
		// 				uri: url,
		// 				gzip: true,
		// 			})
		// 				.pipe(file)
		// 				.on('finish', async () => {
		// 					console.log(`The file is finished downloading.`);
		// 					resolve();
		// 				})
		// 				.on('error', (error) => {
		// 					reject(error);
		// 				});
		// 			})
		// 				.catch((error) => {
		// 				console.log(`Something happened: ${error}`);
		// 			});
		// 	}
	}
}
</script>

<style scoped lang="sass">
	.main_block
		background-color: rgba($white-color, .95)
		border-radius: 24px 4px
		h3
			width: 100%
			color: $broun-color
			font: 36px Adigiana
			text-transform: lowercase
			font-weight: bold
			letter-spacing: 2px
			line-height: 32px
		.btn-act
			background-color: $red-color !important
			transition: all .4s
			outline: 0
			right: 0
			height: 48px
			color: $white-color
			font: 18px MooMoo
</style>