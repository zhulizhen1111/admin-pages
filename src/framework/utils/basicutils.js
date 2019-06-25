function deepCopy(source) {
    if (!source) {
        return null
    }
    var result
    source instanceof Array ? (result = []) : (result = {})
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key]
    }
    return result
}

export default {
    formatDateByPattern: function(date, pattern) {
        let fmt = pattern
        var o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'H+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        return fmt
    },

    deepCopy: deepCopy,

    /**
     * 找出数组arr中第一个属性key的值等于val的元素的下标
     * @param {*} arr 数组
     * @param {*} key 属性
     * @param {*} val 值
     */
    indexInArray: function(arr, key, val) {
        if (!arr || !arr.length || arr.length == 0) {
            return -1
        } else {
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index]
                if (key in element && element[key] == val) {
                    return index
                }
            }
        }
        return -1
    },

    /**
     * 找出数组arr中第一个属性key的值等于val的元素
     * @param {*} arr 数组
     * @param {*} key 属性名
     * @param {*} val 属性值
     */
    itemInArray: function(arr, key, val) {
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index]
            if (key in element && element[key] == val) {
                return element
            }
        }
        return null
    },

    /**
     * 从数组中将属性key的值等于val的元素删除
     * @param {*} arr 数组
     * @param {*} key 属性名
     * @param {*} val 属性值
     */
    deleteInArray: function(arr, key, val) {
        if (!arr || !arr.length || arr.length == 0) {
            return
        } else {
            for (let index = arr.length - 1; index > -1; index--) {
                const element = arr[index]
                if (element[key] && element[key] == val) {
                    arr.splice(index, 1)
                }
            }
        }
    }
}
