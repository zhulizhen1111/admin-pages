import httputils from '@/api/httputils'
export default {
    tables() {
        return httputils.getJson('/server/hbase/tables')
    },

    query(criteria) {
        return httputils.postJson('/server/hbase/query', criteria)
    }
}
