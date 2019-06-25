import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/framework/utils/storage'
import layout from '@/layout/store'
Vue.use(Vuex)

const KEY_LAST_ROUTE = 'last_route'
const KEY_PROJECT_SELECTED = 'global_project_selected'

export default new Vuex.Store({
    state: {
        ssoToken: null,
        lastRoute: null,
        projectId: null
    },
    getters: {
        ssoToken: state => state.ssoToken,
        projectId: state => {
            if (!state.projectId) {
                let pid = storage.get(KEY_PROJECT_SELECTED)
                if (pid) {
                    state.projectId = pid
                }
            }
            return state.projectId
        },
        lastRoute: state => {
            if (!state.lastRoute) {
                let lastRoute = storage.get(KEY_LAST_ROUTE)
                if (lastRoute) {
                    state.lastRoute = lastRoute
                }
            }
            return state.lastRoute
        }
    },
    mutations: {
        setSsoToken: (state, val) => (state.ssoToken = val),
        setLastRoute: (state, val) => {
            state.lastRoute = val
            storage.set(KEY_LAST_ROUTE, val)
        },
        setProjectId: (state, val) => {
            state.projectId = val
            storage.set(KEY_PROJECT_SELECTED, val)
        }
    },
    actions: {},
    modules: {
        layout
    }
})
