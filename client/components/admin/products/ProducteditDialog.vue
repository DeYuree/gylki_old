<template>
	<confirm-dialog
		:cancelButton="cancelButton"
		:confirmButton="'Обновить'"
		:headerText="'Обновить данные'"
		:maxWidth="850"
		:isVisible="showDialog"
		@close="makeChanges($event)"
		>
		<v-container class="py-0 pt-2 pb-6">
			<v-row>
				<v-col cols="4" justify-self="center">
					<v-img
						:aspect-ratio="1/2"
						:src="this.$parent.checkImgInCart(item)"
						width="60px"
						height="60px"
						class="my-0 mx-auto"
						style="border-radius: 50%"
					/>
				</v-col>
				<v-col cols="4" align-self="center">
					<span>Артикул: <strong class="ml-2">{{item.vendorCode}}</strong></span>
					
				</v-col>
				<v-col cols="4" align-self="center">
					<span>Название: <strong class="ml-2">{{item.title}}</strong></span>
				</v-col>
			</v-row>
			<v-row class="ma-2">
				<v-col cols="8" class="d-flex flex-column">
					<v-text-field
						hide-details
						v-model="item.vendorCode"
						label="Артикул"
						class="mb-6"
						>
					</v-text-field>
					<v-text-field
						hide-details
						v-model="item.title"
						label="Наименование товара"
						class="mb-6"
						>
					</v-text-field>
					<v-textarea
						class="pl-0"
						dense
						auto-grow
						filled
						rows='3'
						v-model="item.description"
						label="Описание"
						color="#005cc1"
						background-color="transparent"
						>
					</v-textarea>
					<v-text-field
						hide-details
						v-model="item.link"
						label="Ссылка"
						class="mb-6"
						>
					</v-text-field>
				</v-col>
				<v-col cols="4" class="d-flex flex-column">
					<v-checkbox
						class="align-self-end mb-6"
						v-model="item.active"
						label="Активность"
						color="green"
						hide-details
						>
					</v-checkbox>

					<div class="d-flex mb-6">
						<span>
							<v-text-field
								hide-details
								v-model="item.actualPrice"
								label="Актуальная цена"
								reverse
								class="ma-2"
								>
							</v-text-field>
						</span>
						<span>
							<v-text-field
								hide-details
								v-model="item.oldPrice"
								label="Старая цена"
								reverse
								class="ma-2"
								>
							</v-text-field>
						</span>
					</div>

					<div class="mb-6 d-flex flex-column">
						<label>Главное фото</label>
						<v-img
							:aspect-ratio="1/2"
							:src="this.$parent.checkImgInCart(item)"
							width="150px"
							height="150px"
							class="my-2 mx-auto"
						/>
						<div class="d-flex">
							<span class="align-self-end mb-4">{{prefixSRC}}</span>
							<v-text-field
								hide-details
								:v-model="this.$parent.checkImgInCart(item)"
								label="Имя файла"
								class="ma-2"
							>
						</v-text-field>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</confirm-dialog>
</template>

<script>
export default {
	props:{
		cancelButton: {
			type: String,
			default: 'Отмена'
		},
		showDialog: {
			type: Boolean,
			default: false
		},
		item: {
			type: Object,
			default: {}
		}
	},

	computed: {
		mainImageSRC: {
			get() {
				return this.$parent.checkImgInCart(this.item).split('/').pop()
			},
			set(val) {
				this.item.images.mainImage.src = val
			}
		},

		prefixSRC() {
			return this.$parent.checkImgInCart(this.item)
				.split(this.$parent.checkImgInCart(this.item).split('/').pop()).shift()
		}
	},

	methods: {
		makeChanges(val) {
			this.$emit('close', val)
		}
	}
}
</script>

<style>

</style>