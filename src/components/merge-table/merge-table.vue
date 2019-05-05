<template>
    <div class="go-table-wrapper">
        <table class="go-table">
            <thead>
            <slot name="thead"></slot>
            </thead>
            <tbody>
            <slot name="tbody" v-for="(item, i) in mergedData" :rowData="item" :index="i"></slot>
            </tbody>
        </table>
        <div class="go-table__no-data" v-if="!data.length"><Icon type="coffee" size="18"></Icon> {{ t('i.table.noDataText') }} !</div>
        <Spin size="large" fix v-if="loading"></Spin>
    </div>
</template>


<script>
    import tableDataFormat from './tableDataFormat';
    import Locale from '../../mixins/locale';

    export default {
        name: 'MergeTable',
        mixins: [ Locale ],
        data () {
            return {};
        },
        props: {
            data: {
                type: Array,
                require: true
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            mergedData () {
                return tableDataFormat(this.data);
            }
        }
    };

</script>