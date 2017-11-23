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

<style lang="less">
    @import "../../styles/custom";

    .go-table {
        width: 100%;
        border: 1px solid @border-color-base;
        border-spacing: 0;
        border-collapse: collapse;

        &-wrapper {
            position: relative;
            background-color: #fff;

            > .ivu-spin-fix {
                border:1px solid #ddd;
            }
        }

        &__no-data{
            height: 280px;
            line-height:280px;
            border:1px solid @border-color-base;
            border-top:none;
            text-align: center;
            color: #999;
        }

        td, th {
            border: 1px solid @border-color-base;
            padding: 8px;
            text-align: left;
        }

        th {
            white-space: nowrap;
            overflow: hidden;
            background-color: @table-thead-bg;
        }
        td {
            transition: background-color @transition-time @ease-in-out;
        }
    }
</style>