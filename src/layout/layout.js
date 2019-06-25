import store from '@/store'

function toLogin() {
    let ssoServer = process.env.SSO_SERVER
    let redirectUrl = window.location.protocol + '//' + window.location.host
    window.location.href = `${ssoServer}/login?redirectUrl=${redirectUrl}/auth`
}

function toLogout() {
    let ssoServer = process.env.SSO_SERVER
    let redirectUrl = window.location.protocol + '//' + window.location.host
    window.location.href = `${ssoServer}/logout?redirectUrl=${redirectUrl}/auth`
}

export default {
    routerBeforeEach: async function(to, from, next) {
        console.log('router before ', to)
        if (to.path == '/auth' || to.path == '/nouser') {
            next()
        } else {
            let logined = store.getters['layout/logined']
            if (!logined) {
                // 本地是未登录状态, 保存目标页面地址, 去登录
                let lastRoute = { path: to.path, params: to.params, query: to.query }
                store.commit('setLastRoute', lastRoute)
                toLogin()
            } else {
                if (to.meta.breadcrumbs) {
                    store.dispatch('setBreadcrumb', to.meta.breadcrumbs)
                }
                next()
            }
            return true
        }
    },
    toLoginPage: toLogin,
    toLogout: toLogout
}
