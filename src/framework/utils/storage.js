const PREFIX = '_sagacloud_admin_store_'
const sessionStorage = window.sessionStorage

export default {
    set(key, value, fn) {
        let _value = null
        try {
            _value = JSON.stringify(value)
        } catch (e) {
            _value = value
        }
        sessionStorage.setItem(PREFIX + key, _value)
        fn && fn()
    },
    get(key, fn) {
        if (!key) {
            return null
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。')
        }
        var _value = sessionStorage.getItem(PREFIX + key)
        if (_value !== null) {
            try {
                return JSON.parse(_value)
            } catch (e) {}
        }
        return _value
    },
    remove(key) {
        sessionStorage.removeItem(PREFIX + key)
    }
}
