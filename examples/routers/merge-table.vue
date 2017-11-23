<template>
    <div>
        <Panel shadow>
            <Button @click="show">get</Button>
            <Button @click="show">show</Button>
            <Button @click="hide">hide</Button>
            <Split transparent small></Split>
            <MergeTable :data="tableData" ref="table" :loading="isLoading">
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
        <Panel shadow>
            <Button @click="show">get</Button>
            <Split transparent small></Split>
            <MergeTable :data="testData" ref="table" :loading="isLoading">
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
    </div>
</template>
<script>
    export default {
        data () {
            return {
                i: 0,
                testData: [],
                isLoading: false,
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
            };
        },
        methods: {
            trans (sourceData) {
                const ret = [];
                let row = {};
                let oldLength = 0;
                sourceData.forEach(item => {
                    if (oldLength) {
                        item.length < oldLength;
                    }
                });
            },
            show () {
//                this.$Spin.show();
                const that = this;
                this.isLoading = true;
                setTimeout(function () {
//                    that.testDate = that.tableData;
                    that.$set(that,'testData',that.tableData)
                    that.isLoading = false;
                },1000);
                console.log(this.$refs.table.data);
                console.log(this.$refs.table.mergedData);
            },
            hide () {
                this.isLoading = false;
            },
            cc (dd) {
                console.log(dd);
            }
        }
    };
</script>
