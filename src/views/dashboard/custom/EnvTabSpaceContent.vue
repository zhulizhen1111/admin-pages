<template>
  <div>
    <div class="query-form">
      <el-form :inline="true" class="demo-form-inline">
        <el-button type="primary" size="small" @click="refresh">刷新</el-button>
      </el-form>
    </div>
    <div class="result-table">
      <el-table
        ref="multipleTable"
        :data="tableData.contents"
        border
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="seasonType" label="季节类型" sortable width="120">
          <template slot-scope="scope">{{scope.row.seasonType|getSeasonTypeName}}</template>
        </el-table-column>
        <el-table-column prop="dayType" label="日期类型" sortable width="120">
          <template slot-scope="scope">{{scope.row.dayType|getDayTypeName}}</template>
        </el-table-column>
        <el-table-column prop="startDate" label="开始日期" sortable width="120"></el-table-column>
        <el-table-column prop="endDate" label="结束日期" sortable width="120"></el-table-column>
        <el-table-column prop="timePoint" label="时间点" width="120"></el-table-column>
        <el-table-column prop="item" label="类型" sortable width="120"></el-table-column>
        <el-table-column prop="minValue" label="最小值" width="120"></el-table-column>
        <el-table-column prop="maxValue" label="最大值" width="120"></el-table-column>
        <el-table-column prop="createTime" sortable label="创建时间">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTimeForMillisecond }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import httputils from "@/api/httputils";
export default {
  name: "EnvTabSpaceContent",
  props: ["projectId", "groupId", "spaceId"],
  data() {
    return {
      loaded: false,
      tableData: {
        contents: [],
        total: 0
      }
    };
  },
  methods: {
    loadData() {
      let vm = this;
      if (vm.groupId) {
        if (!this.loaded) {
          let param = {
            criteria: {
              projectId: vm.projectId,
              objectId: vm.spaceId,
              sourceType: "Space",
              status: 1
            },
            orders: [{ column: "startTime", asc: true }]
          };
          httputils.postJson(
            "/server/customization/costomcontent/query",
            param,
            resp => {
              vm.tableData.total = resp.count;
              vm.tableData.contents = !!resp.content ? resp.content : [];
              console.log(vm.tableData.contents, "tableData.contents");
              vm.loaded = true;
            }
          );
        }
      } else {
        this.$message({ type: "warning", message: "未分配空间组" });
      }
    },
    refresh() {
      let vm = this;
      vm.loaded = false;
      vm.loadData();
    },
    del() {}
  },
  created() {
    //console.log('EnvTabInitContent created projectId=', this.projectId, ' spaceId=', this.spaceId, ' groupId=', this.groupId)
  },
  mounted() {
    //console.log('EnvTabInitContent mounted projectId=', this.projectId, ' spaceId=', this.spaceId, ' groupId=', this.groupId)
  }
};
</script>
<style lang="css" scoped>
</style>
