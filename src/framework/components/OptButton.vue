<template>
    <el-button type='text' size='mini' :disabled='disabled' @click='_click' v-bind:class='"opt-button-" + type'>{{text}}</el-button>
</template>
<script>
export default {
    name: 'OptButton',
    props: {
        text: { type: String, required: true },
        type: { type: String, required: false, default: 'primary' },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        _click() {
            console.log('this disabled: ', this.disabled)
            this.$emit('click')
        }
    }
}
</script>
<style lang='scss'>
.opt-button-danger {
    color: #f56c6c;
}
</style>