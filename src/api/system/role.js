import httputils from '@/api/httputils'
export default {
    query(criteria) {
        return httputils.postJson('/server/role/query', criteria)
        // return new Promise((resolve, reject) => {
        //     resolve({
        //         result: 'success',
        //         count: 1,
        //         content: [
        //             {
        //                 id: 1,
        //                 name: 'administrator',
        //                 remark: '超级管理员'
        //             },
        //         ]
        //     })
        // })
    },
    create(role) {
        return httputils.postJson('/server/role/create', role)
    },
    update(role) {
        return httputils.postJson('/server/role/update', role)
    },
    delete(role) {
        return httputils.postJson('/server/role/delete', role)
    },
    getOperations(id) {
        return httputils.getJson('/server/role/getOperations?id=' + id)
    },
    setOperations(data) {
        return httputils.postJson('/server/role/setOperations', data)
    }
}
