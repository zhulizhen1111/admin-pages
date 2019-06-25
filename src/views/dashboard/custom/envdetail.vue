<template>
  <div>
    <div class="query-form">
      <el-form inline class="demo-form-inline">
        <el-form-item label>
          <span>{{this.spaceId}}</span>
        </el-form-item>
        <el-form-item label>
          <span>{{this.RoomName}}</span>
        </el-form-item>
        <el-form-item label>
          <span>{{this.RoomLocalName}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane name="envTabTarget" label="定制目标">
        <envTabTarget
          ref="envTabTarget"
          :projectId="projectId"
          :spaceId="spaceId"
          :groupId="groupId"
        ></envTabTarget>
      </el-tab-pane>
      <el-tab-pane name="envTabEquipmentSetting" label="设备与指令">
        <envTabEquipmentSetting
          ref="envTabEquipmentSetting"
          :projectId="projectId"
          :spaceId="spaceId"
          :groupId="groupId"
        ></envTabEquipmentSetting>
      </el-tab-pane>
      <el-tab-pane name="envTabInitContent" label="初始服务定制">
        <envTabInitContent
          ref="envTabInitContent"
          :projectId="projectId"
          :spaceId="spaceId"
          :groupId="groupId"
        ></envTabInitContent>
      </el-tab-pane>
      <el-tab-pane name="envTabGroupContent" label="加班时间">
        <envTabGroupContent
          ref="envTabGroupContent"
          :projectId="projectId"
          :spaceId="spaceId"
          :groupId="groupId"
        ></envTabGroupContent>
      </el-tab-pane>
      <el-tab-pane name="envTabSpaceContent" label="算法定制">
        <envTabSpaceContent
          ref="envTabSpaceContent"
          :projectId="projectId"
          :spaceId="spaceId"
          :groupId="groupId"
        ></envTabSpaceContent>
      </el-tab-pane>
      <el-tab-pane name="envTabTemporaryContent" label="临时服务定制">
        <envTabTemporaryContent
          ref="envTabTemporaryContent"
          :projectId="projectId"
          :spaceId="spaceId"
          :groupId="groupId"
        ></envTabTemporaryContent>
      </el-tab-pane>
      <el-tab-pane name="EnvTabFeedbackRecord" label="反馈记录">
        <EnvTabFeedbackRecord
          ref="EnvTabFeedbackRecord"
          :projectId="projectId"
          :spaceId="spaceId"
          :groupId="groupId"
        ></EnvTabFeedbackRecord>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import EnvTabTarget from "./EnvTabTarget";
import EnvTabEquipmentSetting from "./EnvTabEquipmentSetting";
import EnvTabInitContent from "./EnvTabInitContent";
import EnvTabGroupContent from "./EnvTabGroupContent";
import EnvTabSpaceContent from "./EnvTabSpaceContent";
import EnvTabTemporaryContent from "./EnvTabTemporaryContent";
import EnvTabFeedbackRecord from "./EnvTabFeedbackRecord";
import httputils from "@/api/httputils";

export default {
  name: "envDetail",
  data() {
    return {
      projectId: null,
      groupId: null,
      spaceId: null,
      activeTab: "envTabTarget"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$refs[tab.name].loadData();
    },
    //回退
    goBack() {
      this.$router.push({ path: "detail"})
      // this.$router.push({ path: "detail",query:{buildingId:this.buildingId,floorID:this.floorId}});
    }
  },
  created() {
    this.projectId = this.$route.query.projectId;
    this.spaceId = this.$route.query.RoomID;
    this.RoomName = this.$route.query.RoomName;
    this.RoomLocalName = this.$route.query.RoomLocalName;
    httputils.getJson(
      "/server/customization/spacegroup/findGroupId",
      { projectId: this.projectId, spaceId: this.spaceId },
      resp => {
        this.groupId = resp.data;
        this.$refs["envTabTarget"].loadData();
      },
      fail => {
        console.log(fail.message);
      }
    );
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta  实现后退缓存
    to.meta.keepAlive = true;
    next();
  },
  components: {
    envTabTarget: EnvTabTarget,
    envTabEquipmentSetting: EnvTabEquipmentSetting,
    envTabInitContent: EnvTabInitContent,
    envTabGroupContent: EnvTabGroupContent,
    envTabSpaceContent: EnvTabSpaceContent,
    envTabTemporaryContent: EnvTabTemporaryContent,
    EnvTabFeedbackRecord: EnvTabFeedbackRecord
  }
};
</script>
<style lang="css" scoped>
</style>
