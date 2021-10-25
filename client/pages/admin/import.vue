<template>
    <v-container fluid class="pa-4">
		<v-row no-gutters class="main_block mb-8">
            <h3 class="text-center mx-auto my-8 px-4">Импорт</h3>

			<v-col cols="12" class="px-8 py-0">
                импорт файлов
            </v-col>
        </v-row>
    </v-container>

</template>

<script>

const fs = (process.server ? require('fs-extra') : null)
const request = (process.server ? require('request') : null)
const cheerio = (process.server ? require("cheerio") : null)
const got = (process.server ? require('got') : null)

const stream = (process.server ? require('stream') : null)
const {promisify} = (process.server ? require('util') : null)
const pipeline = (process.server ? promisify(stream.pipeline) : null)

// import XLSX from 'xlsx'
import transliterate from '~/plugins/transliteration'

export default {
    async fetch() {

		// let vendorCodes = this.readXLSX('коды.xlsx')
		// let links = this.readXLSX('ассади линки 3.xlsx')
		// // let importData = []

		// for (let k in vendorCodes) {
		// 	let sheet = vendorCodes[k]
		// 	sheet.forEach((item) => {
		// 		try {

		// 			let folderName = 'static/product/' + transliterate(item[0])
		
					
		// 			// // console.log(transliterate(item[0]).length)
		// 			for (let l in links) {
		// 				let sheetL = links[l]
		// 				sheetL.forEach((itemL) => {
		// 					// console.log(itemL[0])
		// 					if(itemL[0].substr((0-transliterate(item[0]).length), transliterate(item[0]).length).toLowerCase() == transliterate(item[0])) {
								
		// 						// this.reader(folderName)
								
		// 						// this.reqTo(itemL[0], function(body){
		// 						// 	try {				
		// 						// 		const $ = cheerio.load(body)

		// 						// 		let descr = $(".tb_product_description").html()

		// 						// 		if(descr){
		// 						// 			console.log(folderName.toUpperCase() + "==" + descr.trim())
		// 						// 		}
		// 						// 	} catch (error) {
		// 						// 		console.log(error)
		// 						// 	}
		// 						// })

		// 						// this.reqTo(itemL[0], function(body){
		// 						// 	try {
		// 						// 		let allImg = []			
				
		// 						// 		const $ = cheerio.load(body)

		// 						// 		$("a.thumbnail").each(function() {						
		// 						// 			let link = $(this)
		// 						// 			var href = link.attr("href")
		// 						// 			allImg.push(href)

		// 						// 			let img = $(this).children('img')
		// 						// 			let src = img.attr("src")
		// 						// 			allImg.push(src)
		// 						// 		})

		// 						// 		fs.mkdir(folderName)

		// 						// 		if(allImg.length){
		// 						// 			allImg.forEach((image, key) => {

		// 						// 				(async () => {
		// 						// 					// await new Promise(resolve => {
		// 						// 					// 	setTimeout(resolve, 1000)
		// 						// 					// })

		// 						// 					await pipeline(
		// 						// 						got.stream(image),
		// 						// 						fs.createWriteStream(folderName + "/" + 
		// 						// 						folderName.split('/').pop() + "-" + 
		// 						// 						(key+1) + "-" + 
		// 						// 						image.split('/').pop().split('-').pop())
		// 						// 					)

													
		// 						// 				})()

												
		// 						// 			})
		// 						// 		}
		// 						// 		console.log("Updated: " + folderName)
		// 						// 	} catch (error) {
		// 						// 		console.log(error)
		// 						// 	}
		// 						// })

		// 						// console.log(itemL.substr((0-transliterate(item[0]).length), transliterate(item[0]).length))
		// 						// this.requestToUrl(itemL[0], function(imagesArr){

		// 						// 	fs.mkdir(folderName)

		// 						// 	imagesArr.forEach((image) => {
		// 						// 		this.requestForWrite(image, folderName + "/" + image.split('/').pop(), () => {
		// 						// 			// console.log("write: " + folderName + "/" + image.split('/').pop())
		// 						// 		})
		// 						// 		// request(image).pipe(fs.createWriteStream(folderName + "/" + image.split('/').pop()))
		// 						// 		// request.head(image, (err, res, body) => {
		// 						// 		// 	request(image)
		// 						// 		// 	.pipe(fs.createWriteStream(folderName + "/" + image.split('/').pop()))
		// 						// 		// })
		// 						// 	})
		// 						// 	// console.log("write: " + folderName)
		// 						// })

								
		// 					}
		// 					else{
		// 						// console.log("NOT updated: " + folderName)
		// 					}
		// 				})
		// 			}

		// 		} catch (error) {
		// 			return
		// 			//if (error.code != 'EEXIST') { throw error }
		// 		}

				

		// 		// try {
		// 			// fs.mkdir(folderName)
					


		// 		// 	this.requestToUrl(item[0], function(imagesArr){
		// 		// 		imagesArr.forEach((image) => {						
		// 		// 			request(image).pipe(fs.createWriteStream(folderName + "/" + image.split('/').pop()))
		// 		// 		})
		// 		// 	})

		// 		// 	// console.log(images)

		// 		// 	// images.forEach((image) => {
		// 		// 	// 	// request.head(image, function(err, res, body){
		// 		// 	// 	// 	request('https://assadiki.by/image/catalog/igra_golovolomka_as-2007_1.jpg').
		// 		// 	// 	// 	pipe(fs.createWriteStream(folderName + image.split('/').pop()))
		// 		// 	// 	// })

		// 		// 	// 	request.head(image, (err, res, body) => {
		// 		// 	// 		request(url)
		// 		// 	// 		.pipe(fs.createWriteStream(folderName + "/" + image.split('/').pop()))
		// 		// 	// 	})
		// 		// 	// })
		// 		// } catch (error) {
		// 		// 	if (error.code != 'EEXIST') { throw error }
		// 		// }
		// 	})
		// }	
    },
    
    methods: {
		async reader(path) {
			fs.readdir(path, function(err, items) {
				// for(let item in items) {
				// 	if(items[item].toString().includes('1-1024x768')) {						
				// 		console.log(path.toUpperCase() + "== " + items[item])
				// 	}
				// }

				// let imagesArr = []
				// for(let item in items) {
				// 	if(items[item].toString().includes('1024x768') && Object.keys(items[0]).length>1) {						
				// 		imagesArr.push(items[item])
				// 		// console.log(items)
				// 	}
				// }
				// console.log(path.toUpperCase() + "== " + imagesArr)


			})
		}, 

		async wait(ms) {
			return new Promise(resolve => {
				setTimeout(resolve, ms)
			})
		},

		async reqTo(url, callback) {
			try {
				const response = await got(url)				
				callback(response.body)
			} catch (error) {
				console.log(error.response.body)
			}
		},

		requestForWrite(url, path, callback) {
			request.head(url, (err, res, body) => {
				request(url)
				.pipe(fs.createWriteStream(path))
				.on('close', callback)
			})
		},

        requestToUrl: function(url, callback) {
				// console.log(url)
			request(url, function(err, res, body) {
				 if (err) {
					return console.log(err + ": " + url);
				}
				else {
					let allImg = []			
				
					const $ = cheerio.load(body)

					$("a.thumbnail").each(function() {						
						let link = $(this)
						var href = link.attr("href")
						allImg.push(href)

						let img = $(this).children('img')
						let src = img.attr("src")
						allImg.push(src)
					})
					callback(allImg)
				}
			})
		},
		
		readXLSX(file){
			var workbook = XLSX.readFile(file)
			const result = {}

			workbook.SheetNames.forEach(function(sheetName) {
				let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1})
				if(roa.length) result[sheetName] = roa
			})

			return result
		}
    }
}
</script>

<style>

</style>