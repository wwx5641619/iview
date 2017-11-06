<template>
    <Panel shadow>
        <Button @click="show">get</Button>
        <Split transparent></Split>
        <MergeTable :data="tableData" ref="table">
            <tr slot="thead">
                <th width="60">item</th>
                <th>detail</th>
                <th>status</th>
                <th>input</th>
                <th width="70">actions</th>
            </tr>
            <TableTr slot="tbody" slot-scope="props" :rowData="props">
                <TableTd renderKey="item">
                    {{tableData[props.rowData.rowIndex].item}}
                    <Input v-model="tableData[props.rowData.rowIndex].item"/>
                </TableTd>
                <TableTd renderKey="detail"/>
                <TableTd renderKey="status"/>
                <TableTd>
                    <Input v-model="props.rowData.dd.parent[props.rowData.dd.index].dd"/>
                </TableTd>
                <TableTd>
                    <Button type="primary" size="small">{{props.index}} add</Button>
                </TableTd>
            </TableTr>
        </MergeTable>
    </Panel>
</template>
<script>
    export default {
        data () {
            return {
                i: 0,
                testData: [],
                tableData: [
                    {
                        item: 2,
                        woqu: 'djjdjd',
                        children: [
                            {
                                detail: 23, status: 'error',
                                children: [
                                    {dd: 232}
                                ]
                            }]
                    },
                    {
                        item: 3,
                        woqu: 'djjdjd',
                        children: [
                            {detail: 22, status: 'success', dd: 222},
                            {
                                detail: 23, status: 'error',
                                children: [
                                    {dd: 232},
                                    {dd: 343}
                                ]
                            }]
                    },
                    {
                        item: 4,
                        woqu: 'djjdjd',
                        children: [
                            {detail: 22, status: 'success', dd: 222},
                            {
                                detail: 23, status: 'error',
                                children: [
                                    {dd: 232},
                                    {dd: 343}
                                ]
                            }]
                    }
                ]
            }
        },
        methods: {
            trans (sourceData) {
                const ret = []
                let row = {}
                let oldLength = 0
                sourceData.forEach(item => {
                    if (oldLength) {
                        item.length < oldLength
                    }
                })
            },
            show () {
                console.log(this.$refs.table.data)
                console.log(this.$refs.table.mergedData)
            },
            cc (dd) {
                console.log(dd)
            }
        }
    }
</script>
