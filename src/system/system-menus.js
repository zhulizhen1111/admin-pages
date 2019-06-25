export default [
    {
        path: '/system',
        name: '系统管理',
        icon: 'el-icon-fa-bank',
        children: [
            {
                path: '/system/roles',
                name: '角色管理',
                icon: 'el-icon-fa-user',
                opts: [
                    {
                        name: '查看',
                        basic: true,
                        permission: 'system:role:query'
                    },
                    {
                        name: '创建',
                        permission: 'system:role:create'
                    },
                    {
                        name: '编辑',
                        permission: 'system:role:update'
                    },
                    {
                        name: '配置权限',
                        permission: 'system:role:setOpts'
                    },
                    {
                        name: '删除',
                        permission: 'system:role:delete'
                    }
                ]
            },
            {
                path: '/system/users',
                name: '用户管理',
                icon: 'el-icon-fa-user',
                opts: [
                    {
                        name: '查看',
                        basic: true,
                        permission: 'system:user:query'
                    },
                    {
                        name: '添加',
                        permission: 'system:user:add'
                    },
                    {
                        name: '编辑',
                        permission: 'system:user:update'
                    },
                    {
                        name: '启用/禁用',
                        permission: 'system:user:setValid'
                    }
                ]
            }
        ]
    }
]
