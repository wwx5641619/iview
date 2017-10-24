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
    </div>
</template>


<script>
    import tableDataFormat from './tableDataFormat';

    export default {
        name: 'MergeTable',
        data () {
            return {};
        },
        props: {
            data: {
                type: Array,
                require: true
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
        border:1px solid @border-color-base;
        border-spacing:0;
        border-collapse:collapse;

        &-wrapper{
            background-color: #fff;
        }

        td,th{
            border:1px solid @border-color-base;
            padding:8px;
            text-align: left;
        }

        th {
            white-space: nowrap;
            overflow: hidden;
            background-color: @table-thead-bg;
        }
        td{
            transition: background-color @transition-time @ease-in-out;
        }
    }
</style>