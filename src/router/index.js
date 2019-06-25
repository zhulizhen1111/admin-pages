import Vue from 'vue'
import Router from 'vue-router'
import system from '@/system/system-routes'
import routes from '@/router/routes'
import layout from '@/layout/layout.js'

Vue.use(Router)

let _routes = []
_routes = _routes.concat(system)
_routes = _routes.concat(routes)

const router = new Router({
    mode: 'history',
    routes: _routes
})

router.beforeEach(layout.routerBeforeEach)

export default router
