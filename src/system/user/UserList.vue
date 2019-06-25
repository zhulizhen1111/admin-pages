<template>
    <div class='flex-column'>
        <div class='query-form'>
            <el-form :inline='true' :model='queryData' size='mini'>
                <el-form-item label='用户'>
                    <el-input v-model.trim='queryData.username' placeholder='请输入用户名进行查询' clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' @click='query'>查询</el-button>
                    <el-button v-if='hasPermission("system:user:add")' type='primary' @click='openAdd(null)'>添加用户</el-button>
                </el-form-item>
            </el-form>
        </div>
        <page-table :total='pageData.total' :page='pageData.page' :size='pageData.size' @pageChanged='pageChanged'>
            <el-table :data='pageData.users' border stripe slot='table'>
                <el-table-column prop='id' label='ID'></el-table-column>
                <el-table-column prop='name' label='Name'></el-table-column>
                <el-table-column prop='remark' label='Remark'></el-table-column>
                <el-table-column prop='status' label='Status' :formatter='statusFormatter' width='150' align='center'></el-table-column>
                <el-table-column label='操作' width='150' align='center'>
                    <template slot-scope='{row}'>
                        <opt-button text='编辑' @click='openEdit(row)'/>
                        <opt-separator/>
                        <opt-button v-if='row.status == 1 && hasPermission("system:user:setValid")' text='禁用' @click='setInvalid(row)' type='danger'/>
                        <opt-button v-if='row.status != 1 && hasPermission("system:user:setValid")' text='启用' @click='setValid(row)'/>
                    </template>
                </el-table-column>
            </el-table>
        </page-table>
        <user-add ref='addUser' @confirm='getData' slot='dialog'></user-add>
        <user-edit ref='editUser' @confirm='getData' slot='dialog'></user-edit>
    </div>
</template>
<script>
import userapi from '@/api/system/user'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
export default {
    name: 'UserList',
    data() {
        return {
            queryData: { username: null },
            pageData: { page: 1, size: 10, total: 0, users: [] }
        }
    },
    methods: {
        openAdd(user) {
            this.$refs.addUser.open(user)
        },
        openEdit(user) {
            this.$refs.editUser.open(user)
        },
        pageChanged(page, size) {
            this.pageData.page = page
            this.pageData.size = size
            this.getData(page, size)
        },
        query() {
            this.pageData.page = 1
            this.getData()
        },
        async getData() {
            let vm = this
            let username = this.queryData.username
            let criteria = {}
            if (username) {
                criteria.name = { $like: '%' + username + '%' }
            }
            let request = { page: vm.pageData.page, size: vm.pageData.size, criteria: criteria }
            userapi.query(request).then(resp => {
                vm.pageData.total = resp.count
                vm.pageData.users = resp.content
            })
        },
        setValid(user) {
            userapi.setValid({ id: user.id, status: 1 }).then(resp => {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                this.getData()
            })
        },
        setInvalid(user) {
            this.$confirm('禁用用户会导致用户无法登陆此系统, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                userapi.setValid({ id: user.id, status: 0 }).then(resp => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    })
                    this.getData()
                })
            })
        },
        statusFormatter(row, column, cellValue, index) {
            if (cellValue == 1) {
                return '正常'
            } else {
                return '禁用'
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.query()
        })
    },
    components: {
        'user-add': UserAdd,
        'user-edit': UserEdit
    }
}
</script>
