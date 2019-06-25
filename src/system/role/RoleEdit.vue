<template>
    <el-dialog :title='title' :visible.sync='dialogVisible'>
        <el-form ref='form' :model='formValue' :rules='roleRules' label-width='100px'>
            <el-form-item label='角色名' prop='name'>
                <el-input v-model.trim='formValue.name'></el-input>
            </el-form-item>
            <el-form-item label='备注' prop='remark'>
                <el-input v-model.trim='formValue.remark'></el-input>
            </el-form-item>
        </el-form>
        <div class='btn-box'>
            <el-button type='primary' size='mini' @click='save'>保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import roleapi from '@/api/system/role'
export default {
    name: 'RoleEdit',
    data() {
        return {
            title: '创建角色',
            dialogVisible: false,
            type: null,
            formValue: { id: null, name: null, remark: null },
            roleRules: {
                name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            }
        }
    },
    methods: {
        show(row) {
            console.log(row)
            this.dialogVisible = true
            if (row) {
                this.type = 'update'
                this.title = '编辑角色'
                this.formValue.id = row.id
                this.formValue.name = row.name
                this.formValue.remark = row.remark
            } else {
                this.type = 'create'
                this.title = '创建角色'
                this.formValue.id = null
                this.formValue.name = null
                this.formValue.remark = null
            }
        },
        save() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    console.log(this.formValue)
                    if (this.type == 'create') {
                        roleapi.create(this.formValue).then(resp => {
                            console.log('create role ', resp)
                            this.$message.success(this.title + '成功')
                            this.$emit('saved')
                            this.dialogVisible = false
                        })
                    } else {
                        roleapi.update(this.formValue).then(resp => {
                            console.log('update role ', resp)
                            this.$message.success(this.title + '成功')
                            this.$emit('saved')
                            this.dialogVisible = false
                        })
                    }
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.btn-box {
    text-align: center;
}
</style>
