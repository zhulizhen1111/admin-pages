import store from '@/store'
import PaginationTable from '@/framework/components/PaginationTable'
import BasePagination from '@/framework/components/BasePagination'
import OptButton from '@/framework/components/OptButton'
import OptSeparator from '@/framework/components/OptSeparator'
import TableTemplate from '@/framework/template/TablePageTemplate'
//tools
import basicutils from '@/framework/utils/basicutils'

export default {
    install: function(Vue) {
        Vue.prototype.hasPermission = function(permission) {
            return store.getters['layout/permissions'][permission]
        }

        Vue.prototype.initPagination = function() {
            return {
                pageSize: 10,
                pageSizes: [10, 20, 50, 100, 200, 500],
                layout: 'total, sizes, prev, pager, next, jumper',
                total: 0,
                currentPage: 1,
                data: [],
                params: {}
            }
        }

        Vue.component('page-table', PaginationTable)
        Vue.component('base-pagination', BasePagination)
        Vue.component('opt-button', OptButton)
        Vue.component('opt-separator', OptSeparator)
        Vue.component('table-page-template', TableTemplate)

        Vue.prototype.indexInArray = basicutils.indexInArray
        Vue.prototype.itemInArray = basicutils.itemInArray
        Vue.prototype.deleteInArray = basicutils.deleteInArray

        Vue.prototype.formatDate = function(date) {
            return basicutils.formatDateByPattern(date, 'yyyy-MM-dd HH:mm:ss')
        }

        Vue.filter('formatDateForMillisecond', function(value) {
            if (!value) return ''
            return basicutils.formatDateByPattern(new Date(value), 'yyyy-MM-dd')
        })

        Vue.filter('formatDateTimeForMillisecond', function(value) {
            if (!value) return ''
            return basicutils.formatDateByPattern(new Date(value), 'yyyy-MM-dd HH:mm:ss')
        })
    }
}
