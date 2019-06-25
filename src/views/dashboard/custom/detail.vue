<template>
  <div class="detail">
    <div class="query-form">
      <div class="demo-form-inline">
        <el-select v-model="build" size="mini" placeholder="请选择">
          <el-option
            v-for="item in builds"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="my-radio">
        <el-radio
          v-for="(floor,index) in floors"
          :key="index"
          v-model="floorItem"
          :label="floor.infos.FloorID"
          @change="getSaces(floorItem)"
          size="small"
          border
        >{{floor.infos.FloorLocalName}}</el-radio>
      </div>
      <div class="card-gid">
        <div class="my-card" v-for="(space,index) in spaces" :key="index">
          <el-card class="box-card">
            <div class="text item">
              <p class="my-roomname">{{space.infos.RoomLocalName}}</p>
              <p class="my-roomid">{{space.infos.RoomID}}</p>
              <el-button type="primary" size="small" @click="showDetail(space.infos)">详细</el-button>
              <el-button
                v-if="space.flag"
                type="danger"
                size="small"
                @click="delData(space.infos.RoomID)"
              >解除受控</el-button>
              <el-button
                v-if="!space.flag"
                type="error"
                size="small"
                @click="addSpace(space.infos.RoomID)"
              >添加为受控</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import httputils from "@/api/httputils";
import {
  getSpaces,
  subquery,
  addSpaces,
  removeSpaces
} from "@/api/custom/detail";
export default {
  name: "index",
  props: [],
  data() {
    return {
      build: "建筑1",
      builds: [
        { value: "建筑1", label: "建筑1" },
        { value: "建筑2", lable: "建筑2" }
      ],
      floorItem: "",
      floors: [
        {
          infos: {
            FloorLocalName: "室外"
          }
        },
        {
          infos: {
            FloorLocalName: "地上四层"
          }
        }
      ],
      spaceIds: [],
      spaces: [
        {
          infos: {
            RoomLocalName: "4FJC-6号弱电间",
            RoomID: "Sp44190000038922550b9c8211e894a5d52f7d7efec2"
          }
        },
        {
          infos: {
            RoomLocalName: "4FJC-1号弱电间",
            RoomID: "Sp4419000003891b291a9c8211e894a575aa956a99df"
          }
        },
        {
          infos: {
            RoomLocalName: "4FJC-6号强电间",
            RoomID: "Sp44190000038814dc859c8211e894a593ca9e92af5c"
          }
        },
        {
          infos: {
            RoomLocalName: "4FJC-6号弱电间",
            RoomID: "Sp44190000038922550b9c8211e894a5d52f7d7efec2"
          }
        },
        {
          infos: {
            RoomLocalName: "4FJC-1号弱电间",
            RoomID: "Sp4419000003891b291a9c8211e894a575aa956a99df"
          }
        },
        {
          infos: {
            RoomLocalName: "4FJC-6号强电间",
            RoomID: "Sp44190000038814dc859c8211e894a593ca9e92af5c"
          }
        }
      ],
      controllSpaces: []
    };
  },
  computed: {
    ...mapGetters(["projectId"])
  },
  methods: {
    //根据项目id得到楼层
    getFloors() {
      let vm = this;
      vm.spaces = [];
      let params = {
        criteria: {
          type: ["Fl"]
        }
      };
      httputils.postJson(
        "/server/dataplatform/object/subquery?projectId=" + vm.projectId,
        params,
        resp => {
          vm.floors = resp.Content;
          vm.floorItem = vm.floors[0].infos.FloorID;
          vm.getControllSpaces();
        }
      );
    },
    //得到受控空间
    getControllSpaces() {
      let vm = this;
      vm.controllSpaces = [];
      httputils.getJson(
        `/server/algorithm/getSpaces?projectId=${vm.projectId}`,
        null,
        resp => {
          vm.controllSpaces = resp.data;
          vm.getSaces();
        }
      );
    },
    //根据楼层得到所有空间
    getSaces() {
      let vm = this;
      vm.spaces = [];
      let params = {
        criteria: {
          id: vm.floorItem,
          type: ["Sp"]
        }
      };
      httputils.postJson(
        "/server/dataplatform/object/subquery?projectId=" + vm.projectId,
        params,
        resp => {
          vm.spaces = resp.Content.sort(function(a, b) {
            return a.infos.RoomLocalName - b.infos.RoomLocalName;
          });
          let tempSpaces = [];
          vm.spaces.forEach(ele => {
            if (vm.controllSpaces) {
              let flag = vm.controllSpaces.indexOf(ele.infos.RoomID);
              if (flag == -1) {
                ele.flag = false;
              } else {
                ele.flag = true;
              }
            }
            if (vm.search != "") {
              if (ele.infos.RoomLocalName.match(vm.search) != null) {
                tempSpaces.push(ele);
              }
            }
          });
          if (vm.search != "") {
            vm.spaces = tempSpaces;
          }
        }
      );
    },
    //空间详细信息
    showDetail(row) {
      this.$router.push({
        path: `envdetail`,
        query: {
          projectId: this.projectId,
          RoomID: row.RoomID,
          RoomName: row.RoomName,
          RoomLocalName: row.RoomLocalName
        }
      });
    },
    //添加受控空间
    addSpace(id) {
      let vm = this;
      httputils.postJson(
        "/server/algorithm/addSpaces?projectId=" + vm.projectId,
        [id],
        resp => {
          vm.$message({
            type: "success",
            message: "添加成功"
          });
          vm.getControllSpaces();
        }
      );
    },
    //删除空间
    delData(id) {
      let vm = this;
      httputils.postJson(
        "/server/algorithm/removeSpaces?projectId=" + vm.projectId,
        [id],
        resp => {
          vm.$message({
            type: "success",
            message: "删除成功"
          });
          vm.getControllSpaces();
        }
      );
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.detail {
  .my-radio {
    margin: 10px 0;
  }
  .card-gid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 10px;
    // grid-template-rows: repeat(4, 130px);
    .my-card {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang='scss'>
.detail {
  .el-radio {
    margin: 0;
  }
  .el-card__body {
    padding: 8px;
  }
}
</style>
