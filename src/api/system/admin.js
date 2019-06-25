import httputils from '@/api/httputils'

import system_menus from '@/system/system-menus'
import menus from '@/api/menus'

function checkMenu(menu, ps) {
    let result = { name: menu.name, icon: menu.icon, path: menu.path }
    if (menu.children) {
        // 如果有下级菜单权限,则自动拥有上级菜单权限
        result.children = []
        menu.children.forEach(child => {
            let submenu = checkMenu(child, ps)
            if (submenu) {
                result.children.push(submenu)
            }
        })
        return result.children.length > 0 ? result : null
    } else if (menu.opts) {
        return menu.opts.some(opt => ps[opt.permission]) ? result : null
    } else {
        // 如果没有下级菜单且没有opts属性, 菜单可以直接访问,不需要权限
        return result
    }
}

export default {
    loadUserInfo() {
        return httputils.getJson('/server/userInfo')
        // return new Promise((resolve, reject) => {
        //     resolve({
        //         result: 'success',
        //         username: 'admin',
        //         permissions: ['admin', 'demo'],
        //         projects: [{ projId: 'Pj1101080001', projLocalName: '广联达二期' }]
        //     })
        // })
    },

    getAllMenus() {
        return [].concat(system_menus).concat(menus)
    },

    getCheckedMenus(permissions) {
        let result = []
        let allMenus = [].concat(system_menus).concat(menus)
        let ps = !!permissions ? permissions : {}
        allMenus.forEach(item => {
            let menu = checkMenu(item, ps)
            if (!!menu) {
                result.push(menu)
            }
        })
        return [].concat(system_menus).concat(menus)
    }
}
