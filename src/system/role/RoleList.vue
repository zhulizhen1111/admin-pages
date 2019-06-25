<template>
    <table-page-template>
        <el-form :inline='true' slot='form' size='mini'>
            <el-form-item label='角色'>
                <el-input class='input' v-model.trim='searchValue' placeholder='请输入角色名进行查询' clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-if='hasPermission("system:role:query")' type='primary' @click='query'>查询</el-button>
                <el-button type='primary' @click='editRole(null)'>创建角色</el-button>
            </el-form-item>
        </el-form>
        <el-table :data='roles' border stripe style='width: 100%' slot='table'>
            <el-table-column prop='id' label='ID' width='50'></el-table-column>
            <el-table-column prop='name' label='Name'></el-table-column>
            <el-table-column prop='remark' label='备注'></el-table-column>
            <el-table-column label='操作' width='250'>
                <template slot-scope='{row}'>
                    <opt-button text='编辑' @click='editRole(row)'/>
                    <opt-separator/>
                    <opt-button text='配置权限' @click='editAuth(row)'/>
                    <opt-separator/>
                    <opt-button text='删除' @click='deleteRole(row)' type='danger'/>
                </template>
            </el-table-column>
        </el-table>
        <div slot='dialog'>
            <role-edit ref='roleEdit' @saved='query'></role-edit>
            <role-manage ref='roleManage'></role-manage>
        </div>
    </table-page-template>
</template>
<script>
import roleapi from '@/api/system/role'
import RoleEdit from './RoleEdit'
import RoleManage from './RoleManage'
export default {
    name: 'RoleList',
    data() {
        return {
            roles: [],
            searchValue: ''
        }
    },
    methods: {
        query() {
            let criteria = {}
            if (this.searchValue) {
                criteria.name = { $like: this.searchValue + '%' }
            }
            roleapi.query({ criteria }).then(resp => {
                this.roles = resp.content
            })
        },
        editRole(row) {
            this.$refs['roleEdit'].show(row)
        },
        editAuth(row) {
            this.$refs['roleManage'].show(row.id)
        },
        deleteRole(row) {
            let opt = {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }
            this.$confirm('此操作将永久删除, 是否继续?', '提示', opt)
                .then(() => {
                    let params = { id: row.id }
                    roleapi.delete(params).then(res => {
                        if (res.result == 'success') {
                            this.$message.success('删除成功')
                            this.query()
                        } else {
                            this.$message.error('删除失败: ' + res.message)
                        }
                    })
                })
                .catch(() => {})
        }
    },
    created() {
        this.query()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.query()
        })
    },
    components: {
        RoleEdit,
        RoleManage
    }
}
</script>