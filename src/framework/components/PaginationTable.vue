<template>
    <div class='page-table'>
        <div class='data-table'>
            <slot name='table'></slot>
        </div>
        <div class='data-table-pagination'>
            <el-pagination
                @size-change='handleSizeChange'
                @current-change='handleCurrentChange'
                :page-sizes='pageInfo.pageSizes'
                :layout='pageInfo.layout'
                :total='total'
                :current-page='page'
                :page-size='size'
                :small='false'
                style='text-align: center'
            ></el-pagination>
            <slot name='actions'></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PaginationTable',
    props: {
        total: { type: Number, default: 0, required: false },
        page: { type: Number, default: 1, required: false },
        size: { type: Number, default: 10, required: false }
    },
    data() {
        let pageInfo = this.initPagination()
        if (this.page) {
            pageInfo.page = this.page
        }
        if (this.size) {
            pageInfo.size = this.size
        }
        return {
            pageInfo: pageInfo
        }
    },
    methods: {
        handleSizeChange: function(size) {
            this.pageInfo.size = size
            this.$emit('pageChanged', this.pageInfo.page, this.pageInfo.size)
        },
        handleCurrentChange: function(page) {
            this.pageInfo.page = page
            this.$emit('pageChanged', this.pageInfo.page, this.pageInfo.size)
        }
    }
}
</script>
<style lang='scss' scoped>
</style>