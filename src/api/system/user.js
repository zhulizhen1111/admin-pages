import httputils from '@/api/httputils'
export default {
    query(criteria) {
        return httputils.postJson('/server/user/query', criteria)
    },

    add(user) {
        return httputils.postJson('/server/user/add', user)
    },

    update(user) {
        return httputils.postJson('/server/user/update', user)
    },

    delete(user) {
        return httputils.postJson('/server/user/delete', user)
    },

    checkUser(key) {
        return httputils.getJson('/server/user/checkUser?key=' + key)
    },

    setValid(user) {
        return httputils.postJson('/server/user/setValid', user)
    }
}
