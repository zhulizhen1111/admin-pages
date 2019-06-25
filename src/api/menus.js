export default [
    {
        path: '/dashboard',
        name: '看板',
        icon: 'el-icon-fa-bank',
        children: [
            {
                icon: 'el-icon-fa-diamond',
                name: '服务定制',
                path: '/dashboard/custom'
            },
            {
                icon: 'el-icon-fa-diamond',
                name: '故障诊断',
                path: '/dashboard/problem'
            },
            {
                icon: 'el-icon-fa-diamond',
                name: '报警配置',
                path: '/dashboard/alarm'
            }
        ]
    },
    {
        path: '/config',
        name: '项目管理',
        icon: 'el-icon-fa-bank',
        children: [
            {
                icon: 'el-icon-fa-diamond',
                name: '空间组',
                path: '/custom/spacegroups',
                opts: [
                    {
                        name: '查看',
                        basic: true,
                        permission: 'customization:spacegroup:query'
                    }
                ]
            },
            {
                icon: 'el-icon-fa-diamond',
                name: '服务定制',
                path: '/custom/customcontent',
                opts: [
                    {
                        name: '查看',
                        basic: true,
                        permission: 'customization:customcontent:query'
                    }
                ]
            }
        ]
    },
    {
        path: '/database',
        name: '数据库',
        icon: 'el-icon-fa-bank',
        children: [
            {
                icon: 'el-icon-fa-diamond',
                name: 'Redis',
                path: '/database/redis',
                opts: [
                    {
                        name: '查看',
                        basic: true,
                        permission: 'database:redis:query'
                    }
                ]
            },
            {
                icon: 'el-icon-fa-diamond',
                name: 'HBase',
                path: '/database/hbase',
                opts: [
                    {
                        name: '查看',
                        basic: true,
                        permission: 'database:hbase:query'
                    }
                ]
            }
        ]
    }
]
