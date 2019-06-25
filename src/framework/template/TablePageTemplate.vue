<template>
    <div class='page-table-template'>
        <div class='query-form'>
            <slot name='form'></slot>
        </div>
        <div class='data-table'>
            <slot name='table'></slot>
        </div>
        <div class='data-table-pagination'>
            <slot name='pagination'></slot>
        </div>
        <slot name='dialog'></slot>
    </div>
</template>
<script>
export default {
    name: 'TablePageTemplate',
    props: [],
    data() {
        return {}
    },
    computed: {},
    methods: {},
    created() {
        console.log('--------------------- TablePageTemplate created')
    },
    mounted() {},
    components: {}
}
</script>
<style lang='scss' scoped>
</style>