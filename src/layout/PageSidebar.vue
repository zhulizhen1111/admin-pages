<template>
    <div id='page-sidebar-wrapper' class='page-sidebar-wrapper'>
        <el-menu
            :collapse='sidebarClosed'
            :default-active='sidebarSelected'
            @open='handleOpen'
            @close='handleClose'
            @select='menuSelect'
            background-color='#364150'
            text-color='#fff'
            active-text-color='#ffd04b'
            unique-opened
            router
            class='sidebar-menu'
        >
            <template v-for='menu in menus'>
                <el-submenu v-if='menu.children' :index='menu.path' :key='menu.path' class='sidebar-menu-submenu'>
                    <template slot='title'>
                        <i v-if='menu.icon' :class='"el-icon-fa "+ menu.icon'></i>
                        <span>{{menu.name}}</span>
                    </template>
                    <template v-for='submenu in menu.children'>
                        <el-menu-item :index='submenu.path' :key='submenu.path' class='sidebar-menu-item'>
                            <i v-if='submenu.icon' :class='"el-icon-fa "+ submenu.icon'></i>
                            <span slot='title'>{{submenu.name}}</span>
                        </el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item v-else :index='menu.path' :key='menu.path' class='sidebar-menu-item'>
                    <i v-if='menu.icon' :class='"el-icon-fa "+ menu.icon'></i>
                    <span slot='title'>{{menu.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'PageSidebar',
    props: [],
    data() {
        return {}
    },
    computed: {
        ...mapGetters('layout', ['sidebarClosed', 'sidebarSelected', 'permissions', 'menus'])
    },
    methods: {
        ...mapMutations('layout', ['setSidebarSelected']),
        handleOpen(val) {},
        handleClose(val) {},
        menuSelect(index, indexPath) {
            this.setSidebarSelected(index)
        }
    }
}
</script>