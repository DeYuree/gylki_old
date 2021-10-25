<template>
    <v-fade-transition>
        <v-row>
            <v-col cols="12" md="4" class="offset-md-2 order-last order-md-first py-0">
                <infile-field @setField="setdata" v-if="fieldVal" ref="inFilefield" />
            </v-col>

            <v-col cols="12" md="6" class="order-first order-md-last py-0">
                <v-select
                    :items="prodProps"
                    item-value="name"
                    item-text="title"
                    label="поле в товаре"
                    clearable
                    clear-icon="fas fa-minus"
                    append-icon="fas fa-caret-down"
                    outlined
                    :value="fieldVal"
                    @change="checkFieldVal"
                    @click:clear="clearField"
                ></v-select>
            </v-col>
        </v-row>
    </v-fade-transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data: () => ({
        fieldVal: null,
        finalData: Object.create(null),
        rules: {
            file: [
                v => !!v || 'Name is required'
            ]
        }
    }),

    computed: {
		...mapState('admin', {
			prodProps: 'productsProps'
		})
	},


    methods: {
        checkFieldVal: function(val) {
            let oldFieldVal = this.fieldVal
            this.fieldVal = val // update field val

            if(oldFieldVal == null) { // change select from null
                this.$emit('anotherProp', true) // add new field if change event was from null
                this.setdata(null)
            }
            else if(val == null) { // change select to null
                this.setdata(null)
            }
            else {                
                let curInfileField = this.$refs.inFilefield.$data.inFilefield
                this.setdata(curInfileField)
            }
        },

        clearField() {
            this.$emit('anotherProp', false)
            //this.setdata(null)
        },

        setdata: function (val) {
            let finalDataKeys = Object.keys(this.finalData)

            //clear finalData
            finalDataKeys.forEach(key => {
                delete this.finalData[key]
            })

            this.finalData[this.fieldVal] = val

            // console.log(this.finalData)
        }
    }
}
</script>

<style>

</style>