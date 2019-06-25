<template>
  <div>
    <div class="query-form">
      <el-form ref="queryForm" label-width="80px" :inline="true">
        <el-form-item label>
          <el-radio-group v-model="equipmentType" size="small">
            <el-radio-button
              v-for="(item, index) in equipmentTypeArr"
              :label="item.equipID"
              :key="index"
            >{{item.equipName}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <div class="result-table">
        <el-table
          :data="equipmentSettingData"
          border
          strip
          @sort-change="sortChange"
          tooltip-effect="dark"
          style="width: 100%;margin-bottom:10px;"
        >
          <el-table-column label="时间" prop="time" sortable>
            <template slot-scope="scope">{{scope.row.time | formatDate}}</template>
          </el-table-column>
          <el-table-column label="infoID" prop="funcid">
            <template slot-scope="scope">{{scope.row.funcid}}</template>
          </el-table-column>
          <el-table-column label="设定值" prop="value">
            <template slot-scope="scope">{{scope.row.value}}</template>
          </el-table-column>
          <el-table-column label="执行结果" prop="result">
            <template slot-scope="scope">{{scope.row.result}}</template>
          </el-table-column>
          <el-table-column label="耗时" prop="duration">
            <template slot-scope="scope">{{scope.row.duration}}</template>
          </el-table-column>
        </el-table>
        <base-pagination
          class="roomservice_page"
          :total="total"
          :current-page="page"
          :customconfig="{pageSize:20}"
          @pageChanged="pageChanged"
        />
      </div>
    </el-row>
  </div>
</template>
<script>
import httputils from "@/api/httputils";
export default {
  name: "EnvTabEquipmentSetting",
  props: ["projectId", "groupId", "spaceId"],
  data() {
    return {
      page: 1, //页码
      size: 20, //条数
      total: "",
      equipmentType: "", //设备类型
      loaded: false,
      equipmentSettingData: [],
      equipmentTypeArr: [],
      OrderBy: [{ Column: "time", Asc: false }]
    };
  },
  methods: {
    loadData() {
      //加载数据
      let vm = this;
      if (!this.loaded) {
        this.loaded = true;
        this.queryequipID();
      }
    },
    queryequipID() {
      //查询设备id
      let vm = this;
      let params = {
        projectId:this.projectId,
        criteria: {
          to_id: this.spaceId,
          graph_id: "GtEquipforSpace001",
          rel_type: "1"
        }
      };
      // httputils.postJson(
      //   `/server/dataplatform/relation/query?projectId=${this.projectId}`,
      //   params,
      queryRoom(params).then(
        resp => {
          if (resp.Content && resp.Content.length > 0) {
            let eqIdArr = resp.Content.map(item => {
              return {
                id: item.from_id
              };
            });
            this.queryEquipmentInfo(eqIdArr);
          }
        }
      );
    },
    queryEquipmentInfo(equipID) {
      //设备信息查询
      let param = {
        projectId:this,projectId,
        criterias: equipID
      };
      // httputils.postJson(
      //   `/server/dataplatform/object/batchquery?projectId=${this.projectId}`,
      //   param,
      batchquery(param).then(
        resp => {
          let data = resp.Content;
          if (data && data.length > 0) {
            let obj = {};
            for (let i = 0; i < data.length; i++) {
              obj = {
                equipID: data[i].id,
                equipName: data[i].infos.EquipLocalName
              };
              this.equipmentTypeArr.push(obj);
              this.equipmentTypeArr.sort((a, b) => {
                return a.equipName > b.equipName;
              });
            }
            this.equipmentType = this.equipmentTypeArr[0].equipID;
          }
        }
      );
    },
    pageChanged(page, size) {
      // 分页查询
      this.page = page;
      this.size = size;
      this.orderQuery();
    },
    orderQuery() {
      //指令数据查询
      let criteria = {
        projectId: this.projectId,
        targetId: this.equipmentType
      };
      let jump = this.page >= 2 ? Number(this.page - 1) * this.size : 0;
      let limit = { Skip: jump, Count: this.size };
      let param = {
        projectId:this.projectId,
        QueryType: "select",
        Datatable: "sagacloud_setting_order",
        Criteria: criteria,
        OrderBy: this.OrderBy,
        Limit: limit
          ? limit
          : {
              Skip: 0,
              Count: 100
            }
      };
      // httputils.postJson(
      //   `/server/dataplatform/customdata/execute?projectId=${this.projectId}`,
      //   param,
      execute(param).then(
        res => {
          if (res.Content != null && res.Content.length > 0) {
            this.equipmentSettingData = res.Content;
          }
        }
      );
      this.customDataCount(criteria, limit);
    },
    customDataCount(criteria, limit) {
      //总条数查询
      let param = {
        projectId:this.projectId,
        QueryType: "select_count",
        Datatable: "sagacloud_setting_order",
        Criteria: criteria,
        Limit: limit
          ? limit
          : {
              Skip: 0,
              Count: 100
            }
      };
     // httputils.postJson(
      //   `/server/dataplatform/customdata/execute?projectId=${this.projectId}`,
      //   param,
      execute(param).then(
        res => {
          this.total = res.Count ? res.Count : 0;
        }
      );
    },

    sortChange(arg) {
      let vm = this;
      if (arg.order == "ascending") {
        vm.OrderBy[0].Asc = true;
      } else {
        vm.OrderBy[0].Asc = false;
      }
    }
  },
  filters: {
    formatDate(val) {
      if (val === null || val === undefined) {
        return;
      }
      return `${val.substring(0, 4)}-${val.substring(4, 6)}-${val.substring(
        6,
        8
      )} ${val.substring(8, 10)}:${val.substring(10, 12)}:${val.substring(
        12,
        14
      )}`;
    }
  },

  watch: {
    equipmentType(newVal, oldVal) {
      this.equipmentType = newVal;
      this.page = 1;
      this.OrderBy = [{ Column: "time", Asc: false }];
      this.orderQuery();
    }
  },
  created() {}
};
</script>
<style lang="css" scoped>
</style>
