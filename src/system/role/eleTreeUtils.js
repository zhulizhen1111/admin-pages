//初始化checkBox--list
const utils = {
    initCheckboxList(menus, permissions) {
        var permissObj = {}
        permissions.forEach(permission => {
            permissObj[permission] = true
        })
        let arr = []
        var id = 1;
        menus.forEach(first => {
            let firstObj = {id: id++, name: first.name, level: 'first' }
            if (first.children) {
                firstObj.children = []
                first.children.forEach(second => {
                    let secondObj = { id: id++, name: second.name, level: 'second' }
                    if (second.opts) {
                        secondObj.opts = []
                        second.opts.forEach(third => {
                            let flag = this.isChecked(third, permissObj)
                            let thirdObj = {}
                            if (flag) {
                                thirdObj = { id: id++, name: third.name, checked: true, permission: third.permission, basic: third.basic }
                            } else {
                                thirdObj = { id: id++, name: third.name, checked: false, permission: third.permission, basic: third.basic }
                            }
                            secondObj.opts.push(thirdObj)
                        })
                    }
                    firstObj.children.push(secondObj)
                })
            }
            arr.push(firstObj)
        })
        return this.isBasic(arr, permissObj)
    },
    // 判断当前是否在权限里
    isChecked(opt, permissObj) {
        if (permissObj[opt.permission]) {
            return true
        } else {
            return false
        }
    },
    //判断是否为basic,[basic同级 假如有checked的则basic为true]
    isBasic(arr, permissObj) {
        arr.forEach(first => {
            if (first.children) {
                first.children.forEach(second => {
                    if (second.children) {
                        second.children.forEach(opts => {
                            if (opts.basic) {
                                // 1。是basic
                                if (permissObj[opts.value]) {
                                    //2.有权限
                                } else {
                                    let flag = this.isBasicOther(second.children)
                                    if (flag) {
                                        opts.checked = true
                                    }
                                }
                            }
                        })
                    }
                })
            }
        })
        return arr
    },
    //判断和basic同级的是否有被选中的
    isBasicOther(arr) {
        let flag = false
        arr.forEach(opt => {
            if (!opt.basic) {
                if (opt.checked) {
                    flag = true
                }
            }
        })
        return flag
    },
    /********************************************************************************** */
    //当点击的时候，判断时候为basic，如果不是，查看basic是否选中
    changeChecked(data) {
        data.forEach(first => {
            if (first.children) {
                first.children.forEach(second => {
                    if (second.opts) {
                        second.opts.forEach(opt => {
                            // console.log(opt)
                            if (opt.basic) {
                                //基本权限
                            } else {
                                if (opt.checked) {
                                    this.checkedBasic(second.opts)
                                }
                            }
                        })
                    }
                })
            }
        })
    },
    checkedBasic(arr) {
        arr.forEach(item => {
            if(item.basic) {
                item.checked  = true
            }
        })
    },
    getCheckedNodeArr(arr) {
        let checkedIdArr = [];
        arr.forEach(first => {
            if(first.children) {
                first.children.forEach(second => {
                    if(second.opts) {
                        let flag = true
                        second.opts.forEach(opt => {
                            if(!opt.checked){
                                flag = false
                            }
                        })
                        if(flag) {
                            checkedIdArr.push(second.id)
                        }
                    }
                })
            }
        })
        return checkedIdArr
    }
}
export default utils
