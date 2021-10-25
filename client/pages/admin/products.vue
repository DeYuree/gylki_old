<template>
	<v-container fluid class="pa-4">
		<v-row no-gutters class="main_block mb-8">
			<v-col cols="12" class="px-8 py-0">
				<h3>Товары</h3>
			</v-col>
			<v-col cols="12">
				<v-data-table
					class="cart-table mt-8"
					:headers="headers"
					:items="this.products"
					items-per-page.sync=10
					dense
					key="item.id"
				>

				<template v-slot:item.actions="{ item }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-icon 
								small 
								class="mr-2"
								v-on="on"
								@click="startChanges(item, 'isFullEditDialogShow')"
							>
								fas fa-pencil-alt
							</v-icon>
						</template>
						<span><v-icon>fas fa-edit</v-icon> Редактировать</span>
    				</v-tooltip>
					<v-icon small>
						fas fa-trash
					</v-icon>
				</template>
				

				<template v-slot:item.image="{ item }">
					<nuxt-link :to="`/product/` + item.link">
						<v-img
							:aspect-ratio="1/2"
							:src="checkImgInCart(item)"
							width="80px"
							height="80px"
							class="my-2"
							style="border-radius: 50%"
						/>
					</nuxt-link>
				</template>

				<!-- <template v-slot:item.title="{ item }">
					<nuxt-link :to="`/product/` + item.link">{{item.title}}</nuxt-link>
				</template> -->

				<template v-slot:item.title="{ item }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-edit-dialog
								:return-value.sync="item.title"
								large
								save-text="Сохранить"
								cancel-text="Отмена"								
								@open="startChanges(item, false)"
								@save="finishChanges(true, false)"
								>
								<span 
									v-on="on">
								{{ item.title }}
								</span>
								<template v-slot:input>
									<div class="mt-4 px-8">
										<v-icon>fas fa-edit</v-icon>
										Редактирование
									</div>
									<v-text-field
										counter
										autofocus
										v-model="editableItem.title"
									></v-text-field>
								</template>
							</v-edit-dialog>							
						</template>
						<span><v-icon>fas fa-edit</v-icon> Редактировать</span>
    				</v-tooltip>
				</template>

				<template v-slot:item.active="{ item }">
					<v-switch
						color="success"
						:value="item.active"
						:input-value="item.active"
						:id="item.vendorCode"
						hide-details
						@change="startChanges(item, 'isConfirmShow')"
						>
					</v-switch>
				</template>

				</v-data-table>
			</v-col>
		</v-row>

		<confirm-dialog
	   		:cancelButton="'Отмена'"
			:confirmButton="'Обновить'"
			:headerText="'Обновить данные'"
			:maxWidth="500"
			:isVisible="isConfirmShow"
			@close="finishChanges($event, 'isConfirmShow')"
			>
			<v-container class="py-0 pt-2">
				<v-row>
					<v-col cols="4" justify-self="center" class="my-6">
						<v-img
							:aspect-ratio="1/2"
							:src="checkImgInCart(editableItem)"
							width="60px"
							height="60px"
							class="my-0 mx-auto"
							style="border-radius: 50%"
						/>
					</v-col>
					<v-col cols="8" align-self="center" class="d-flex flex-column">
						<span>Артикул: <strong class="ml-2">{{editableItem.vendorCode}}</strong></span>
						<span>Название: <strong class="ml-2">{{editableItem.title}}</strong></span>						
						<span>Ссылка: <strong class="ml-2">{{editableItem.link}}</strong></span>						
					</v-col>
				</v-row>
			</v-container>
	   	</confirm-dialog>

		<productedit-dialog
			:showDialog="isFullEditDialogShow"
			:item="editableItem"
			@close="finishChanges($event, 'isFullEditDialogShow')"
		>
		</productedit-dialog>
		<quick-message />
	</v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import ProducteditDialog from '../../components/admin/products/ProducteditDialog.vue'

export default {
  components: { ProducteditDialog },
	data: () => ({
		headers: [
			{ text: 'Действия', value: 'actions', width: '5%', sortable: false },
			{ text: '', value: 'image', sortable: false, width: '10%' },
			{ text: 'Товар', align: 'left', value: 'title', width: '20%' },
			{ text: 'Описание', value: 'description', sortable: false, width: '30%' },
			{ text: 'Цена', value: 'actualPrice', width: '10%', align: 'center' },
			{ text: 'Линк', value: 'link', width: '10%', align: 'left' },
			{ text: 'Активность', value: 'active', width: '10%', align: 'center' },
		],
		isConfirmShow: false,
		isFullEditDialogShow: false,
		editableItem: {}
	}),

	async fetch ( { store } ) {
		try {
			await store.dispatch('products/GET_ALL_PRODUCTS')

			} catch (err) {
			return error({
				statusCode: 404,
				message: 'Категория не найдена или сервер не доступен'
			})
		}
	},

	computed: {
		...mapState('products', {
			products: 'visibleProducts'
		}),
		
	},

	methods: {
		...mapActions('admin', ['UPDATE_SINGLE_PRODUCT_IN_DB']),
		...mapActions('products', ['UPDATE_SINGLE_PRODUCT']),
		...mapActions('message', ['INIT_MESSAGE', 'clearMessage']),

		checkImgInCart(item) {
			try {
				return require("~/static/product/" + item.vendorCode + "/" + item.images.mainImage.src)
			}
			catch {
				return require('~/static/noProductImage.jpg')
			}
		},

		startChanges(item, confirm) {
			this.initEditingItem(item)
			if (confirm) { this.$data[confirm] = true }
		},

		async finishChanges(val, confirm) {
			if (confirm) { this.returnSwitcher(confirm, val) }

			if (val) { this.updateItem(this.editableItem) }
			
			if (confirm) { this.$data[confirm] = false }
		},

		async updateItem(val) {
			this.$nuxt.$loading.start()
			try {
				let updatedItem = await this.UPDATE_SINGLE_PRODUCT_IN_DB(val)

				if (updatedItem) {
					await this.UPDATE_SINGLE_PRODUCT(updatedItem)

					let message = {
						mainText: updatedItem.vendorCode + "<br>" + updatedItem.title,
						extraText: 'Обновлено: ',
						color: 'green accent-4',
						icon: 'fas fa-check'
					}
					this.clearMessage()

					setTimeout(() =>
						this.INIT_MESSAGE(message)
					, 400)
				}
			} catch(err) {
				let message = {
					mainText: "Что-то пошло не так. Попробуйте обновить товар еще раз.",
					extraText: 'Не удалось обновить',
					color: 'red lighten-1',
					icon: 'fas fa-minus-circle'
				}
				this.clearMessage()

				setTimeout(() =>
					this.INIT_MESSAGE(message)
				, 400)
			}
			setTimeout(() => this.$nuxt.$loading.finish(), 500)
		},

		initEditingItem(val){
			this.editableItem = Object.assign({}, val)
		},

		returnSwitcher(confirm, flag) {
			if( confirm == 'isConfirmShow') {
				if (flag == false) {
					// return switcher without changes
					document.getElementById(this.editableItem.vendorCode).
						dispatchEvent(new Event('change', { 'bubbles': true }))
				}
				else { // change active attr of editable obj
					this.editableItem.active = document.getElementById(this.editableItem.vendorCode).getAttribute('aria-checked')
				}
			}
		}
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
		.v-data-table
			background-color: transparent
			th 
				color: $broun-color
				&.active
					color: $blue-color
</style>