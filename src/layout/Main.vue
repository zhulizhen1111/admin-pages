<template>
    <div id='page-main' v-bind:class='{"page-sidebar-closed": sidebarClosed}'>
        <page-header></page-header>

        <div id='page-container' class='page-container'>
            <page-sidebar></page-sidebar>

            <div id='page-content-wrapper' class='page-content-wrapper'>
                <div class='page-bar'>
                    <el-breadcrumb separator='/'>
                        <el-breadcrumb-item :to='{ path: "/" }'>首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-for='(b, index) in breadcrumb' :key='index'>{{b.label}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

                <keep-alive>
                    <router-view v-if='$route.meta.keepAlive' class='page-content'></router-view>
                </keep-alive>
                <router-view v-if='!$route.meta.keepAlive' class='page-content'></router-view>
            </div>
        </div>
        <div class='page-footer'>footer</div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import PageHeader from './PageHeader'
import PageSidebar from './PageSidebar'
export default {
    name: 'Main',
    components: {
        'page-header': PageHeader,
        'page-sidebar': PageSidebar
    },
    props: [],
    data() {
        return {}
    },
    computed: {
        ...mapGetters('layout', ['sidebarClosed', 'breadcrumb'])
    },
    methods: {
        ...mapMutations('layout', ['setSidebarClosed']),
        windwoResize() {
            // 窗口大小发生变化时
            let clientWidth = `${document.documentElement.clientWidth}`
            let clientHeight = `${document.documentElement.clientHeight}`
            //this.setPageContentHeight(height)
            if (clientWidth > 1000) {
                this.setSidebarClosed(false)
            } else if (clientWidth > 800) {
                this.setSidebarClosed(true)
            } else {
                this.setSidebarClosed(false)
            }
        }
    },
    mounted() {
        this.windwoResize()
        window.onresize = this.windwoResize
    }
}
</script>