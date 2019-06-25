<template>
    <table-page-template>
        <el-form slot='form' :inline='true' size='mini'>
            <el-form-item label>
                <el-input v-model='pageParams.key' placeholder='关键字'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='query'>查询</el-button>
                <el-button type='primary' @click='add'>新增</el-button>
            </el-form-item>
        </el-form>
        <el-table slot='table' :data='pageData.content' border tooltip-effect='dark'>
            <el-table-column label='KEY' prop='key'></el-table-column>
            <el-table-column prop='type' label='类型' width='120'></el-table-column>
            <el-table-column prop='address' label='值' show-overflow-tooltip>
                <template slot-scope='scope'>
                    <template v-if='scope.row.type == "string"'>{{scope.row.stringValue}}</template>
                    <template v-if='scope.row.type == "hash"'>
                        <template v-for='(value, index) in scope.row.hashValue'>
                            {{index}} - {{value}}
                            <br>
                        </template>
                    </template>
                    <template v-else-if='scope.row.type == "list"'>
                        <template v-for='(value, index) in scope.row.listValue'>
                            {{index}} - {{value}}
                            <br>
                        </template>
                    </template>
                    <template v-if='scope.row.type == "set"'>
                        <template v-for='(value, index) in scope.row.setValue'>
                            {{index}} - {{value}}
                            <br>
                        </template>
                    </template>
                    <template v-if='scope.row.type == "zset"'>
                        <template v-for='(value, index) in scope.row.zsetValue'>
                            {{index}} - {{value}}
                            <br>
                        </template>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label='操作' width='150'>
                <template slot-scope='scope'>
                    <opt-button text='编辑' @click='edit(scope.row)' :disabled='scope.row.type == "zset"'/>
                    <opt-separator/>
                    <opt-button text='删除' @click='del(scope.row)' :disabled='scope.row.type == "zset"' type='danger'/>
                </template>
            </el-table-column>
        </el-table>
        <base-pagination
            :total='pageData.count'
            :currentPages='pageParams.page'
            @pageChanged='pageChanged'
            slot='pagination'
        ></base-pagination>
        <el-dialog :title='opt.title' :visible.sync='opt.doing' :rules='rules' slot='dialog'>
            <el-form :rules='rules' ref='addForm' :model='opt.value' label-width='100px'>
                <el-form-item label='数据类型' prop='type'>
                    <el-select v-model='opt.value.type' placeholder='请选择数据类型'>
                        <el-option v-for='type in opt.types' :key='type.value' :label='type.lable' :value='type.value'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='KEY' prop='key'>
                    <el-input v-model='opt.value.key'></el-input>
                </el-form-item>
                <el-form-item label='过期时间' prop='expire'>
                    <el-input v-model='opt.value.expire'></el-input>
                </el-form-item>
                <el-form-item v-if='opt.value.type === "string"' label='Value' prop='string'>
                    <el-input v-model='opt.value.string'></el-input>
                </el-form-item>
                <el-form-item v-if='opt.value.type === "list"' label='List' prop='list'>
                    <el-row v-for='item in opt.value.list' :key='item.index'>
                        <el-col :span='20'>
                            <el-input v-model='item.value'></el-input>
                        </el-col>
                        <el-col :span='4'>
                            <el-button type='primary' @click='addList' size='mini' icon='fa-plus'>增加</el-button>
                            <el-button type='danger' @click='deleteList(item.index)' size='mini' icon='fa-times'>删除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item v-if='opt.value.type === "set"' label='Set' prop='list'>
                    <el-row v-for='item in opt.value.list' :key='item.index'>
                        <el-col :span='20'>
                            <el-input v-model='item.value'></el-input>
                        </el-col>
                        <el-col :span='4'>
                            <el-button type='primary' @click='addList' size='mini' icon='fa-plus'>增加</el-button>
                            <el-button type='danger' @click='deleteList(item.index)' size='mini' icon='fa-times'>删除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item v-if='opt.value.type === "hash"' label='Entries' prop='hash'>
                    <el-row>
                        <el-col :span='8'>
                            <span>hash key</span>
                        </el-col>
                        <el-col :span='12'>
                            <span>hash value</span>
                        </el-col>
                    </el-row>
                    <el-row v-for='item in opt.value.hash' :key='item.index'>
                        <el-col :span='8'>
                            <el-input v-model='item.key'></el-input>
                        </el-col>
                        <el-col :span='12'>
                            <el-input v-model='item.value'></el-input>
                        </el-col>
                        <el-col :span='4'>
                            <el-button type='primary' @click='addHash' size='mini' icon='fa-plus'>增加</el-button>
                            <el-button type='danger' @click='deleteHash(item.index)' size='mini' icon='fa-times'>删除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot='footer' class='dialog-footer'>
                <el-button type='primary' @click='submitForm'>确定</el-button>
                <el-button @click='resetForm'>重置</el-button>
            </div>
        </el-dialog>
    </table-page-template>
</template>
<script>
import redisapi from '@/api/database/redis'
export default {
    name: 'RedisData',
    props: [],
    data() {
        return {
            tempIndex: 0,
            pageParams: {
                page: 1,
                size: 10,
                key: 'duoduo*',
                type: '0'
            },
            pageData: {
                count: 0,
                content: []
            },
            opt: {
                doing: false,
                title: '',
                types: [
                    { label: 'String', value: 'string' },
                    { label: 'Hash', value: 'hash' },
                    { label: 'List', value: 'list' },
                    { label: 'Set', value: 'set' }
                ],
                value: null
            },
            rules: {
                key: { required: true, trigger: 'blur' }
            }
        }
    },
    computed: {},
    methods: {
        initOptValue() {
            return {
                type: 'string',
                key: '',
                expire: 0,
                string: '',
                list: [{ index: this.getIndex(), value: '' }],
                hash: [{ index: this.getIndex(), key: '', value: '' }]
            }
        },
        getIndex() {
            return this.tempIndex++
        },
        add() {
            this.opt.title = '新增'
            this.opt.doing = true
        },
        edit(data) {
            this.opt.title = '编辑'
            let v = this.initOptValue()
            v.type = data.type
            v.key = data.key

            if (data.type === 'string') {
                v.string = data.stringValue
            } else if (data.type === 'list') {
                v.list = []
                data.listValue.forEach(item => {
                    v.list.push({ index: this.getIndex(), value: item })
                })
            } else if (data.type === 'set') {
                v.list = []
                data.setValue.forEach(item => {
                    v.list.push({ index: this.getIndex(), value: item })
                })
            } else if (data.type === 'hash') {
                v.hash = []
                for (let arr in data.hashValue) {
                    v.hash.push({ index: this.getIndex(), key: arr, value: data.hashValue[arr] })
                }
            }
            this.opt.value = v
            this.opt.doing = true
        },
        addList() {
            this.opt.value.list.push({ index: this.getIndex(), value: '' })
        },
        deleteList(idx) {
            let list = this.opt.value.list
            let i = 0,
                len = list.length
            for (; i < len; i++) {
                if (idx === list[i].index) {
                    break
                }
            }
            list.splice(i, 1)
            if (list.length === 0) {
                list.push({ index: this.getIndex(), value: '' })
            }
        },
        addHash() {
            this.opt.value.hash.push({ index: this.getIndex(), key: '', value: '' })
        },
        deleteHash(idx) {
            let list = this.opt.value.hash
            let i = 0,
                len = list.length
            for (; i < len; i++) {
                if (idx === list[i].index) {
                    break
                }
            }
            list.splice(i, 1)
            if (list.length === 0) {
                list.push({ index: this.getIndex(), key: '', value: '' })
            }
        },
        del(data) {
            redisapi.delete({ key: data.key }).then(resp => {
                if (resp.result === 'success') {
                    this.query()
                }
            })
        },
        delFromList(idx) {},
        submitForm() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    let value = this.opt.value
                    let data = { key: value.key, type: value.type, expire: value.expire }
                    if (value.type === 'string') {
                        data.stringValue = value.string
                    } else if (value.type === 'list') {
                        data.listValue = []
                        value.list.forEach(item => {
                            if (this.notBlank(item.value)) {
                                data.listValue.push(item.value)
                            }
                        })
                    } else if (value.type === 'set') {
                        data.setValue = []
                        value.list.forEach(item => {
                            if (this.notBlank(item.value)) {
                                data.setValue.push(item.value)
                            }
                        })
                    } else if (value.type === 'hash') {
                        data.hashValue = {}
                        value.hash.forEach(item => {
                            if (this.notBlank(item.key) && this.notBlank(item.value)) {
                                data.hashValue[item.key] = item.value
                            }
                        })
                    }
                    redisapi.save(data).then(resp => {
                        if (resp.result === 'success') {
                            this.opt.doing = false
                            this.query()
                        }
                    })
                } else {
                }
            })
        },
        resetForm() {
            this.opt.value = this.initOptValue()
        },
        notBlank(str) {
            return str && str !== ''
        },
        queryBtnClicked() {
            this.pageParams.page = 1
            this.query()
        },
        pageChanged(page, size) {
            console.log('page changed page = ', page, ', size = ', size)
            this.pageParams.page = page
            this.pageParams.size = size
            this.query()
        },
        query() {
            redisapi.query(this.pageParams).then(resp => {
                console.log('redis data ', resp)
                this.pageData.count = resp.count
                this.pageData.content = resp.content
            })
        }
    },
    created() {
        console.log('--------------------- index created')
        this.$store.dispatch('setBreadcrumb', [{ label: '数据库' }, { label: 'Redis' }])
        this.opt.value = this.initOptValue()
    },
    mounted() {},
    components: {}
}
</script>
<style lang='scss' scoped>
</style>