import httputils from '@/api/httputils'
export default {
    //得到受控空间
    getSpaces(projectId) {
        return httputils.getJson(`/server/algorithm/getSpaces?projectId=${projectId}`)
    },
    //根据项目id得到楼层
    subquery(postParams) {
        return httputils.postJson('/server/dataplatform/object/subquery', postParams)
    },
    //添加受控空间
    addSpaces() {
        return httputils.postJson('/server/algorithm/addSpaces', postParams)
    },
    //删除空间
    removeSpaces() {
        return httputils.postJson('/server/algorithm/removeSpaces', postParams)
    },
    //--
    findGroupId(getParams) {
        return httputils.getJson('/server/customization/spacegroup/findGroupId', getParams)
    },
    //==EnvTabEquipmentSetting
    queryRoom(param) {
        return httputils.postJson('/server/dataplatform/relation/query', param)
    },
    //==EnvTabEquipmentSetting
    batchquery(param) {
        return httputils.postJson('/server/dataplatform/object/batchquery', param)
    },
    //==EnvTabEquipmentSetting
    execute(param) {
        return httputils.postJson('server/dataplatform/customdata/execute', param)
    },
    //==EnvTabFeedbackRecord
    queryFeedback(param) {
        return httputils.postJson('/server/customization/feedback/query', param)
    },
    //==
    queryCostomcontent(postParams) {
        return httputils.postJson('/server/customization/costomcontent/query', postParams)
    },
    //==
    target(postParams) {
        return httputils.postJson('/server/customization/custom/target', postParams)
    },
    //
    queryCustomtemporary(postParams) {
        return httputils.postJson('/server/customization/customtemporary/query', postParams)
    },
    
}
