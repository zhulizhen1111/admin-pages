<template>
    <el-dialog title='权限管理' :visible.sync='dialogVisible' top='5vh' width='60%'>
        <div class='box'>
            <div class='custom-tree-container'>
                <div class='block'>
                    <el-tree
                        ref='tree'
                        :data='data'
                        node-key='id'
                        default-expand-all
                        show-checkbox
                        :props='treeProps'
                        :expand-on-click-node='false'
                        :default-checked-keys='checkedBoxArr'
                        @check='getCurrentKey'
                    >
                        <span class='custom-tree-node' slot-scope='{ node, data }'>
                            <span>{{ node.label }}</span>
                            <span v-if='data.level == "second"'>
                                <el-checkbox
                                    v-for='(opt,index) in data.opts'
                                    :key='index'
                                    v-model='opt.checked'
                                    @change='changeCheckBox(node, data)'
                                >{{opt.name}}</el-checkbox>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <div class='btn-box'>
                <el-button type='primary' @click='save'>保 存</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import roleapi from '@/api/system/role'
import system_menus from '@/system/system-menus'
import utils from './eleTreeUtils'
export default {
    name: 'ele-tree',
    data() {
        return {
            roleId: null,
            dialogVisible: false,
            treeProps: {
                label: 'name'
            },
            permissions: [],
            data: [],
            checkedBoxArr: [] //被选中的数组
        }
    },
    methods: {
        show(roleId) {
            this.roleId = roleId
            console.log('edit role id = ', roleId)
            roleapi.getOperations(roleId).then(resp => {
                console.log('role opts ', resp)
                this.permissions = resp.data ? resp.data : []
                this.init()
            })
            this.dialogVisible = true
        },
        changeCheckBox(node, data) {
            utils.changeChecked(this.data)
            let flag = true
            if (data.opts) {
                data.opts.forEach(opt => {
                    if (!opt.checked) {
                        flag = false
                    }
                })
            }
            if (flag) {
                this.$refs['tree'].setChecked(data.id, true)
            } else {
                this.$refs['tree'].setChecked(data.id, false)
            }
        },
        //tree发生变化
        getCurrentKey(node, keys) {
            let checkedId = node.id
            //id-dict
            let checkedObjIds = {}
            keys.checkedKeys.forEach(id => {
                checkedObjIds[id] = true
            })
            //选中的时候
            keys.checkedNodes.forEach(node => {
                if (node.opts) {
                    node.opts.forEach(opt => {
                        opt.checked = true
                    })
                }
            })
            //取消选中的时候
            if (checkedObjIds[checkedId]) {
            } else {
                //点击第二级
                if (node.opts) {
                    node.opts.forEach(ele => {
                        ele.checked = false
                    })
                }
                //点击第一级
                if (node.children) {
                    node.children.forEach(second => {
                        if (second.opts) {
                            second.opts.forEach(opt => {
                                opt.checked = false
                            })
                        }
                    })
                }
            }
        },
        save() {
            let arr = []
            this.data.forEach(first => {
                if (first.children) {
                    first.children.forEach(second => {
                        if (second.opts) {
                            second.opts.forEach(opt => {
                                if (opt.checked) {
                                    arr.push(opt.permission)
                                }
                            })
                        }
                    })
                }
            })
            roleapi.setOperations({ roleId: this.roleId, opts: arr }).then(resp => {
                if (resp.result == 'success') {
                    this.$message.success('保存成功')
                    this.dialogVisible = false
                } else {
                    this.$message.error('保存失败')
                }
            })
        },
        isCheckBasic() {
            utils.changeChecked(this.data)
        },
        init() {
            let _menus = []
            if (process.env.NODE_ENV != 'production') {
                //_menus = _menus.concat(demoMenus)
            }
            _menus = _menus.concat(system_menus)
            let arr = utils.initCheckboxList(_menus, this.permissions)
            //获取默认选中
            this.checkedBoxArr = utils.getCheckedNodeArr(arr)
            this.data = arr
        }
    },
    created() {
        this.init()
    }
}
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node__content {
    border-bottom: 1px solid #e6e6e6;
}
</style>
<style scoped lang='less'>
.box {
    max-height: 500px;
    overflow: hidden;
    .btn-box {
        margin-top: 10px;
        text-align: center;
    }
}
</style>

