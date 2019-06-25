<template>
    <el-dialog title='编辑用户' :visible.sync='dialogFormVisible' @close='close'>
        <el-form :model='form' :rules='newUserRules' ref='loginForm'>
            <el-form-item label='用户名' :label-width='formLabelWidth'>
                <el-input v-model='form.name' auto-complete='off' disabled></el-input>
            </el-form-item>
            <el-form-item label='备注' :label-width='formLabelWidth'>
                <el-input v-model='form.remark' auto-complete='off'></el-input>
            </el-form-item>
            <el-form-item label='角色' :label-width='formLabelWidth'>
                <el-checkbox-group v-model='form.roleIds'>
                    <el-checkbox v-for='role in roles' :label='role.id' :key='role.id'>{{role.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer'>
            <el-button @click='close' size='small'>取消</el-button>
            <el-button type='primary' @click='save' size='small'>保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import userapi from '@/api/system/user'
import roleapi from '@/api/system/role'
export default {
    name: 'UserEdit',
    data() {
        return {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            roles: null,
            title: null,
            form: {
                id: null,
                name: null,
                remark: null,
                roleIds: []
            },
            newUserRules: {}
        }
    },
    methods: {
        async open(data) {
            let vm = this
            vm.dialogFormVisible = true
            if (!vm.roles) {
                let resp = await roleapi.query({ criteria: {} })
                vm.roles = resp.content
            }
            vm.form.id = data.id
            vm.form.name = data.name
            vm.form.remark = data.remark
            vm.form.roleIds = []
            if (data.roles) {
                data.roles.forEach(item => vm.form.roleIds.push(item.id))
            }
        },

        save() {
            let param = { id: this.form.id, remark: this.form.remark, roleIds: this.form.roleIds }
            userapi.update(param).then(this.saveResult)
        },
        saveResult(resp) {
            if (resp.result == 'success') {
                this.$message.success('编辑用户成功')
                this.dialogFormVisible = false
                this.$emit('confirm')
            } else {
                this.$message.error('编辑用户失败')
            }
        },
        close() {
            let vm = this
            vm.dialogFormVisible = false
            if (vm.form.id) {
                vm.form.id = null
                vm.form.name = null
                vm.form.remark = null
                vm.form.roleIds = []
            }
            vm.$emit('cancel')
        }
    }
}
</script>
