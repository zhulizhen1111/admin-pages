<template>
  <div class="custom">
    <div class="first-col">
      <el-row :gutter="12">
        <div class="season" v-for="(item,index) in seasons" :key="index">
          <el-col :span="12" v-if="item.seasonType=='Warn'">
            <el-card shadow="always">
              <p>供暖季</p>
              <p>{{item.startDate}}-{{item.endDate}}</p>
            </el-card>
          </el-col>
          <el-col :span="12" v-if="item.seasonType=='Cold'">
            <el-card shadow="hover">
              <p>供冷季</p>
              <p>{{item.startDate}}-{{item.endDate}}</p>
            </el-card>
          </el-col>
        </div>
      </el-row>
    </div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>微信调节选项</span>
          </div>
          <div class="tags">
            <el-tag v-for="(item,index) in feedbackItems" :key="index">{{item.name}}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>受控设备类型</span>
          </div>
          <div class="tags">
            <el-tag v-for="(item,index) in ctrlEquipTypes" :key="index">{{item.name}}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <div class="able">
        <el-col :span="8">
          <el-card shadow="always">
            <p>空间总数</p>
            <p>{{spaceCount}}</p>
          </el-card>
        </el-col>
      </div>
      <div class="able">
        <el-col :span="8">
          <el-card shadow="always">
            <p>空间组</p>
            <p>{{spaceGroupCount}}</p>
          </el-card>
        </el-col>
      </div>
      <div class="able" @click="showDetail">
        <el-col :span="8">
          <el-card shadow="always">
            <p>受控空间数</p>
            <p>{{ctrlSpaceCount}}</p>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "index",
  props: [],
  data() {
    return {
      seasons: [
        { seasonType: "Warn", startDate: "1101", endDate: "0315" },
        { seasonType: "Cold", startDate: "1101", endDate: "0315" }
      ],
      feedbackItems: [
        { name: "有点冷" },
        { name: "冷死了" },
        { name: "有点热" },
        { name: "热死了" },
        { name: "离开" }
      ],
      ctrlEquipTypes: [
        { name: "风机盘管" },
        { name: "水阀" },
        { name: "冷战" }
      ],
      spaceCount: 123,
      spaceGroupCount: 3,
      ctrlSpaceCount: 80
    };
  },
  computed: {},
  methods: {
    showDetail() {
      this.$router.push("/dashboard/detail");
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.custom {
  .able {
    cursor: pointer;
  }
}
</style>
<style lang='scss'>
.custom {
  .first-col {
    .el-card__body {
      padding: 0 20px;
    }
  }
  .el-col {
    margin-bottom: 10px;
  }
  .tags {
    .el-tag {
      margin: 6px;
    }
  }
}
</style>
