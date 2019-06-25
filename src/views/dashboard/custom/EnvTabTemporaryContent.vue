<template>
  <div>
    <div class="query-form">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-date-picker
            v-model="dateValue"
            type="date"
            value-format="yyyyMMdd"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="refresh">刷新</el-button>
        </el-form-item>
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
        <el-table-column prop="time" label="时间" sortable width="120"></el-table-column>
        <el-table-column prop="item" label="类型" sortable width="120"></el-table-column>
        <el-table-column prop="minValue" label="最小值" width="120"></el-table-column>
        <el-table-column prop="maxValue" label="最大值" width="120"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import httputils from "@/api/httputils";
import basicutils from "@/framework/utils/basicutils";
export default {
  name: "EnvTabTemporaryContent",
  props: ["projectId", "groupId", "spaceId"],
  data() {
    return {
      loaded: false,
      dateValue: null,
      tableData: {
        contents: [],
        total: 0
      }
    };
  },
  methods: {
    loadData() {
      let vm = this;
      if (!this.loaded) {
        let param = {
          criteria: {
            projectId: vm.projectId,
            objectId: vm.spaceId,
            date: vm.dateValue
          },
          orders: [{ column: "time", asc: true }]
        };
        // httputils.postJson(
        //   "/server/customization/customtemporary/query",
        //   param,
        queryCustomtemporary(param).then(
          resp => {
            vm.tableData.total = resp.count;
            vm.tableData.contents = resp.content;
            vm.loaded = true;
          }
        );
      }
    },
    refresh() {
      let vm = this;
      vm.loaded = false;
      vm.loadData();
    }
  },
  created() {
    this.dateValue = basicutils.formatDateByPattern(
      new Date(),
      "yyyyMMdd"
    );
  }
};
</script>
<style lang="css" scoped>
</style>
