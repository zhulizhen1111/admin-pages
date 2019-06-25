<template>
    <el-dialog :title='title' :visible.sync='dialogFormVisible' @close='close' width='50'>
        <el-form :model='form' :rules='newUserRules' ref='form'>
            <el-form-item label='账号' :label-width='formLabelWidth' prop='key'>
                <el-input v-model='form.key' auto-complete='off' placeholder='请输入用户名、手机号、邮箱、身份证号码任意一项'></el-input>
            </el-form-item>
            <el-form-item label='用户名' :label-width='formLabelWidth'>
                <el-input v-model='form.username' auto-complete='off' readonly></el-input>
            </el-form-item>
            <el-form-item label='手机号' :label-width='formLabelWidth'>
                <el-input v-model='form.phone' auto-complete='off' readonly></el-input>
            </el-form-item>
            <el-form-item label='邮箱' :label-width='formLabelWidth'>
                <el-input v-model='form.mail' auto-complete='off' readonly></el-input>
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
            <el-button type='primary' @click='save' size='small'>确定</el-button>
            <!-- <el-button type='primary' v-else @click='save()' size='small'>确定</el-button> -->
        </div>
    </el-dialog>
</template>
<script>
import userapi from '@/api/system/user'
import roleapi from '@/api/system/role'
export default {
    name: 'UserAdd',
    data() {
        return {
            title: '添加用户',
            dialogFormVisible: false,
            formLabelWidth: '120px',
            roles: null,
            form: { id: null, key: null, username: null, phone: null, mail: null, remark: null, roleIds: [] },
            newUserRules: {
                key: [{ required: true, trigger: ['blur', 'commit'], validator: this.checkUser }]
            }
        }
    },
    methods: {
        checkUser(rule, value, callback) {
            userapi.checkUser(this.form.key).then(resp => {
                if (resp.result == 'success') {
                    let user = resp.user
                    this.form.id = user.id
                    this.form.username = user.username
                    this.form.phone = user.phone
                    this.form.mail = user.mail
                    callback()
                } else {
                    callback(new Error('用户不存在'))
                }
            })
        },
        open() {
            let vm = this
            vm.dialogFormVisible = true
            vm.form = { id: null, key: null, username: null, phone: null, mail: null, remark: null, roleIds: [] }
            if (!vm.roles) {
                roleapi.query({ criteria: {} }).then(resp => (vm.roles = resp.content))
            }
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let user = { ssoId: this.form.id, remark: this.form.remark, roleIds: this.form.roleIds }
                    userapi.add(user).then(resp => {
                        if (resp.result == 'success') {
                            this.$message.success(this.title + '成功')
                            this.dialogFormVisible = false
                            this.$emit('confirm')
                        } else if (resp.result == 'fail') {
                            this.$message.error(this.title + '失败 ' + resp.message)
                        } else {
                            this.$message.error(resp.message)
                        }
                    })
                }
            })
        },
        close() {
            this.dialogFormVisible = false
            this.$emit('cancel')
        }
    }
}
</script>
<style lang="css" scoped>
</style>
