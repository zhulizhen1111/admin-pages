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
        <el-button type="primary" size="small" @click="refresh">反馈刷新</el-button>
      </el-form>
    </div>
    <div class="result-table">
      <el-table
        ref="multipleTable"
        :data="tableData.contents"
        border
        tooltip-effect="dark"
        @sort-change="sortChange"
        style="width: 100%"
      >
        <el-table-column prop="sourceType" label="反馈来源"></el-table-column>
        <el-table-column prop="userId" label="反馈用户ID"></el-table-column>
        <el-table-column prop="valueType" label="反馈值类型">
          <template slot-scope="scope">{{scope.row.valueType == 1 ? "反馈项": "精确设定"}}</template>
        </el-table-column>
        <el-table-column prop="itemId" label="反馈项ID"></el-table-column>
        <el-table-column prop="value" label="反馈值" sortable></el-table-column>
        <el-table-column prop="createTime" sortable label="反馈时间">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTimeForMillisecond }}</template>
        </el-table-column>
      </el-table>
      <base-pagination
        class="roomservice_page"
        :total="tableData.total"
        :current="tableData.page"
        @pageChanged="pageChanged"
      />
    </div>
  </div>
</template>
<script>
import httputils from "@/api/httputils";
import basicutils from "@/framework/utils/basicutils";
export default {
  name: "EnvTabFeedbackRecord",
  props: ["projectId", "groupId", "spaceId"],
  data() {
    return {
      loaded: false,
      dateValue: null,
      orders: [{ column: "createTime", asc: false }],
      tableData: { contents: [], total: 0, page: 1, size: 10 }
    };
  },
  methods: {
    pageChanged(page, size) {
      console.log("page = ", page, " size = ", size);
      this.tableData.page = page;
      this.tableData.size = size;
      this.query();
    },
    loadData() {
      if (!this.loaded) {
        this.loaded = true;
        this.query();
      }
    },
    refresh() {
      this.loaded = false;
      this.tableData.page = 1;
      this.loadData();
    },
    query() {
      let vm = this;
      vm.tableData.contents = [];
      let startTime = vm.dateValue + "000000";
      let endTime = vm.dateValue + "235959";

      var criteria = {
        projectId: vm.projectId,
        objectId: vm.spaceId, //空间id
        createTime: { $gte: startTime, $lt: endTime }
      };

      let param = {
        projectId:this.projectId,
        page: vm.tableData.page,
        size: vm.tableData.size,
        criteria: criteria,
        orders: vm.orders
      };
      // httputils.postJson(
      //   `/server/customization/feedback/query?projectId=${this.projectId}`,
      //   param,
      queryFeedback(param).then(
        resp => {
          if (resp.result === "success") {
            vm.tableData.total = resp.count;
            if (resp.content) {
              vm.tableData.contents = resp.content;
            }
            vm.loaded = true;
          }
        }
      );
    },
    sortChange(arg) {
      let vm = this;
      if (arg.order === "ascending") {
        vm.tableData.orders[0].asc = true;
      } else {
        vm.tableData.orders[0].asc = false;
      }
      this.query();
    }
  },
  created() {
    this.dateValue = basicutils.formatDateByPattern(new Date(), "yyyyMMdd");
  }
};
</script>
