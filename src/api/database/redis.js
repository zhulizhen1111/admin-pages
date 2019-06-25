import httputils from '@/api/httputils'
export default {
    query(criteria) {
        return httputils.postJson('/server/redis/query', criteria)
    },
    save(redisData) {
        return httputils.postJson('/server/redis/save', redisData)
    },
    delete(redisData) {
        return httputils.postJson('/server/redis/delete', redisData)
    }
}
