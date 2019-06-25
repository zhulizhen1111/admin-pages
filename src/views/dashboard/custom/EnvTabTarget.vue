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
        :data="targets"
        border
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="timepoint" label="时间" sortable width="150">
          <template slot-scope="scope">{{scope.row.date + scope.row.time}}</template>
        </el-table-column>
        <el-table-column prop="temperatureMax" label="温度Max" width="100"></el-table-column>
        <el-table-column prop="temperatureMin" label="温度Min" width="100"></el-table-column>
        <el-table-column prop="co2Max" label="co2Max" width="100"></el-table-column>
        <el-table-column prop="co2Min" label="co2Min" width="100"></el-table-column>
        <el-table-column prop="humidityMax" label="湿度Max" width="100"></el-table-column>
        <el-table-column prop="humidityMin" label="湿度Min" width="100"></el-table-column>
        <el-table-column prop="pm25Max" label="pm25Max" width="100"></el-table-column>
        <el-table-column prop="pm25Min" label="pm25Min" width="100"></el-table-column>
        <el-table-column prop="hchoMax" label="甲醛Max" width="100"></el-table-column>
        <el-table-column prop="hchoMin" label="甲醛Min" width="100"></el-table-column>
        <el-table-column prop="sunFixed" label="阳光" width="100"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import httputils from "@/api/httputils";
import basicutils from "@/framework/utils/basicutils";
export default {
  name: "EnvTabTarget",
  props: ["projectId", "groupId", "spaceId"],
  data() {
    return {
      loaded: false,
      dateValue: null,
      targets: []
    };
  },
  methods: {
    refresh() {
      this.loaded = false;
      this.loadData();
    },
    loadData() {
      let vm = this;
      if (!vm.loaded) {
        let param = {
          projectId: vm.projectId,
          objectId: vm.spaceId,
          date: vm.dateValue,
          beginTime: "000000"
        };
        // httputils.getJson(
        //   "/server/customization/custom/target",
        //   param,
        target(param).then(
          resp => {
            vm.loaded = true;
            vm.targets = resp.data;
          }
        );
      }
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
