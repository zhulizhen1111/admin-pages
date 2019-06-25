<template>
    <div class='page-header'>
        <div id='page-header-logo' class='page-logo'>
            <a href='index.html'>
                <!-- <img src='@/assets/logo.png' alt='logo' class='logo-default'> -->
                <span class='logo-text'>
                    <b>{{systemName}}</b>
                </span>
            </a>
            <div class='menu-toggler sidebar-toggler' @click.stop='toggleSidebar'>
                <span>
                    <i class='el-icon-fa-bars'></i>
                </span>
            </div>
        </div>
        <div id='page-header-data-menu' class='data-menu'>
            <el-select v-model='selectedProjectId' placeholder='请选择'>
                <el-option v-for='item in projects' :key='item.id' :label='item.name' :value='item.id'></el-option>
            </el-select>
        </div>
        <div id='page-header-user-menu' class='user-menu'>
            <el-dropdown trigger='hover' class='user-menu-dropdown' @command='userMenuCommand'>
                <span class='el-dropdown-link'>
                    {{userInfo.username}}
                    <i class='el-icon-fa-user el-icon--right'></i>
                </span>
                <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item icon='el-icon-plus' command='logout'>退出</el-dropdown-item>
                    <!-- <el-dropdown-item icon='el-icon-circle-plus'>修改密码</el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import layout from '@/layout/layout'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'PageHeader',
    props: [],
    data() {
        return {
            selectedProjectId: null
        }
    },
    computed: {
        ...mapGetters('layout', ['sidebarClosed', 'userInfo', 'projects', 'systemName']),
        ...mapGetters(['projectId'])
    },
    watch: {
        selectedProjectId(n, o) {
            this.setProjectId(n)
        }
    },
    methods: {
        ...mapMutations('layout', ['setSidebarClosed']),
        ...mapMutations(['setProjectId']),
        handleSelect() {},
        toggleSidebar() {
            this.setSidebarClosed(!this.sidebarClosed)
        },
        userMenuCommand(cmd) {
            if (cmd == 'logout') {
                layout.toLogout()
            }
        }
    },
    created() {
        this.selectedProjectId = this.projectId
    },
    mounted() {},
    components: {}
}
</script>