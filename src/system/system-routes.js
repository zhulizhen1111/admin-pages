const LayoutMain = () => import('@/layout/Main')

const Auth = () => import('@/system/auth')

const UserList = () => import('@/system/user/UserList')
const RoleList = () => import('@/system/role/RoleList')
const NoUser = () => import('@/system/nouser')

export default [
    {
        path: '/auth',
        component: Auth
    },
    {
        path: '/system',
        name: 'LayoutMain',
        component: LayoutMain,
        children: [
            { path: 'nouser', name: 'NoUser', component: NoUser },

            {
                path: 'users',
                name: 'UserList',
                component: UserList,
                meta: { keepAlive: true, breadcrumbs: [{ label: '系统管理' }, { label: '用户列表' }] }
            },
            {
                path: 'roles',
                name: 'RoleList',
                component: RoleList,
                meta: { keepAlive: true, breadcrumbs: [{ label: '系统管理' }, { label: '角色列表' }] }
            }
        ]
    }
]
