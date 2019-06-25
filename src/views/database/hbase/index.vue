<template>
    <table-page-template>
        <el-form slot='form' :inline='true' size='mini'>
            <el-form-item label>
                <el-select v-model='namespace' placeholder='请选择 namespace' @change='namespaceChanged'>
                    <el-option v-for='item in namespaces' :key='item.name' :label='item.name' :value='item.name'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label>
                <el-select v-model='table' placeholder='请选择 table' @change='tableChanged'>
                    <el-option v-for='item in tables' :key='item' :label='item' :value='item'></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table slot='table' :data='tableData' border tooltip-effect='dark'>
            <el-table-column v-for='c in columns' :key='c' :prop='c' :label='c'></el-table-column>
        </el-table>
    </table-page-template>
</template>
<script>
import hbaseapi from '@/api/database/hbase'
export default {
    name: 'HBase',
    props: [],
    data() {
        return {
            namespaces: [],
            tables: [],
            namespace: null,
            table: null,
            columns: [],
            tableData: []
        }
    },
    computed: {},
    methods: {
        namespaceChanged(val) {
            console.log(' namespace changed ', val)
            this.tables = this.itemInArray(this.namespaces, 'name', val).tables
        },
        tableChanged() {
            console.log(' table changed ', this.namespace.name, this.table)
            this.queryData()
        },
        queryData() {
            this.columns = []
            this.tableData = []
            if (this.namespace && this.table) {
                hbaseapi.query({ criteria: { namespace: this.namespace, table: this.table } }).then(resp => {
                    if (resp.content) {
                        resp.content.forEach(item => {
                            for (let attr in item) {
                                if (this.columns.indexOf(attr) == -1) {
                                    this.columns.push(attr)
                                }
                            }
                        })
                        this.tableData = resp.content
                    }
                })
            }
        }
    },
    created() {
        this.$store.dispatch('setBreadcrumb', [{ label: '数据库' }, { label: 'HBase' }])
        hbaseapi.tables().then(resp => {
            this.namespaces = resp.data
        })
    },
    mounted() {},
    components: {}
}
</script>
<style lang='scss' scoped>
</style>