import LayoutMain from '@/layout/Main'

const Dashboard = () => import('@/views/dashboard')
const DashboardAlarm = () => import('@/views/dashboard/alarm')
const DashboardCustom = () => import('@/views/dashboard/custom')
const DashboardDetail = () => import('@/views/dashboard/custom/detail.vue')
const DashboardEnvDetail = () => import('@/views/dashboard/custom/envdetail.vue')
const DashboardProblem = () => import('@/views/dashboard/problem')

const HBase = () => import('@/views/database/hbase')
const Redis = () => import('@/views/database/redis')

export default [
    {
        path: '/',
        name: 'LayoutMain',
        component: LayoutMain,
        children: [
            { path: '', name: 'Dashboard', component: Dashboard },
            {
                path: '/dashboard/alarm',
                name: 'DashboardAlarm',
                component: DashboardAlarm,
                meta: { keepAlive: true, breadcrumbs: [{ label: '看板' }, { label: '报警配置' }] }
            },
            {
                path: '/dashboard/custom',
                name: 'DashboardCustom',
                component: DashboardCustom,
                meta: { keepAlive: true, breadcrumbs: [{ label: '看板' }, { label: '服务定制' }] }
            },
            {
                path: '/dashboard/detail',
                name: 'DashboardDetail',
                component: DashboardDetail,
                meta: { keepAlive: true, breadcrumbs: [{ label: '服务定制' }, { label: '受控空间' }] }
            },
            {
                path: '/dashboard/envdetail',
                name: 'DashboardEnvDetail',
                component: DashboardEnvDetail,
                meta: { keepAlive: true, breadcrumbs: [{ label: '受控空间' }, { label: '受控空间详情' }] }
            },
            {
                path: '/dashboard/problem',
                name: 'DashboardProblem',
                component: DashboardProblem,
                meta: { keepAlive: true, breadcrumbs: [{ label: '看板' }, { label: '故障诊断' }] }
            },

            {
                path: '/database/redis',
                name: 'Redis',
                component: Redis,
                meta: { keepAlive: true, breadcrumbs: [{ label: '数据库' }, { label: 'Redis' }] }
            },
            {
                path: '/database/hbase',
                name: 'HBase',
                component: HBase,
                meta: { keepAlive: true, breadcrumbs: [{ label: '数据库' }, { label: 'Hbase' }] }
            }
        ]
    }
]
