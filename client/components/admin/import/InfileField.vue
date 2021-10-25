<template>
    <v-fade-transition>
        <v-text-field
            label="столбец в файле"
            clearable
            clear-icon="fas fa-minus"
            outlined
            type="number"
            min="1"
            :rules="[rules.digits]"
            v-model="inFilefield"
            @input="setField"
        ></v-text-field>
    </v-fade-transition>
</template>

<script>

export default {
    data: () => ({
        inFilefield: null,
        rules: {
            digits: value => {
                const pattern = /^\d+$/
                return pattern.test(value) || 'Только цифры!!!'
          },
        }
    }),

    methods: {
        setField() {
            this.$emit('setField', this.inFilefield)
        }
    }
}
</script>

<style>

</style>