import layout from '@/layout/layout'
import storage from '@/framework/utils/storage'

const KEY_MENU_SELECTED = 'menu_selected'
const KEY_PROJECT_SELECTED = 'global_project_selected'
const KEY_PAGE_BRANDCRUMB = 'page_brandcrumb'

export default {
    namespaced: true,
    state: {
        systemName: process.env.SYSTEM_NAME ? process.env.SYSTEM_NAME : 'SagaCloud',
        sidebarClosed: false,
        sidebarSelected: '', // sidebar选中的选项
        logined: false,
        userInfo: null,
        menus: [],
        permissions: null,
        projects: [],
        breadcrumb: []
    },
    getters: {
        systemName: state => state.systemName,
        logined: state => state.logined,
        menus: state => state.menus,
        sidebarClosed: state => state.sidebarClosed,
        sidebarSelected: state => {
            if (!state.pageSidebarSelected) {
                let menu = storage.get(KEY_MENU_SELECTED)
                if (menu) {
                    state.pageSidebarSelected = menu
                }
            }
            return state.pageSidebarSelected
        },
        userInfo: state => state.userInfo,
        permissions: state => state.permissions,
        projects: state => state.projects,
        breadcrumb: state => {
            if (!state.breadcrumb) {
                let arr = storage.get(KEY_PAGE_BRANDCRUMB)
                if (arr) {
                    state.breadcrumb = arr
                }
            }
            return state.breadcrumb
        }
    },
    mutations: {
        setSidebarClosed: (state, val) => (state.sidebarClosed = val),
        setSidebarSelected: (state, val) => {
            state.sidebarSelected = val
            storage.set(KEY_MENU_SELECTED, val)
        },
        logined: (state, val) => (state.logined = val),
        userInfo: (state, val) => (state.userInfo = val),
        permissions: (state, val) => (state.permissions = val),
        projects: (state, val) => (state.projects = val),
        menus: (state, val) => (state.menus = val)
    },
    actions: {
        loadUserInfo({ state }) {
            return new Promise((resolve, reject) => {
                layout.loadUserInfo().then(resp => {
                    console.log('api load user info ', resp)
                    if (resp.result == 'success') {
                        state.userInfo = { username: resp.username }
                        state.permissions = {}
                        if (resp.permissions) {
                            resp.permissions.forEach(p => (state.permissions[p] = true))
                        }
                        state.projects = []
                        if (resp.projects) {
                            resp.projects.forEach(proj =>
                                state.projects.push({
                                    id: proj.projId,
                                    name: proj.projLocalName
                                })
                            )
                        }
                        state.logined = true
                    } else {
                        state.userInfo = null
                    }
                    resolve(resp)
                })
            })
        },
        setBreadcrumb: {
            root: true,
            handler({ state }, val) {
                state.breadcrumb = []
                state.breadcrumb = val
                storage.set(KEY_PAGE_BRANDCRUMB, val)
            }
        }
    }
}
