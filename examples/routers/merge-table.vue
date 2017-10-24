<template>
    <MergeTable :data="tableData">
        <tr slot="thead">
            <th width="60">1111</th>
            <th>222</th>
            <th>333</th>
            <th width="70">444</th>
        </tr>
        <TableTr slot="tbody" slot-scope="props" :rowData="props">
            <TableTd renderKey="item"/>
            <TableTd renderKey="detail"/>
            <TableTd renderKey="dd"/>
            <TableTd>
                <Button type="primary" size="small">{{props.index}} add</Button>
            </TableTd>
        </TableTr>
    </MergeTable>
</template>
<script>
    export default {
        data () {
            return {
                tableData: [{item: 1, detail: 11, dd: 111}, {
                    item: 2,
                    children: [{detail: 22, dd: 222}, {detail: 23, children: [{dd: 232}, {dd: 343}]}]
                }]
            }
        },
        methods: {
            cc (dd) {
                console.log(dd)
            }
        }
    }
</script>
