<template>
    <div>
        <Select v-model="model1" style="width:200px" extra @on-extra-click="hhh">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        <Select v-model="model2" multiple style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        <Select v-model="model3" filterable style="width:200px">
            <Option v-for="(item, index) in customerList" :value="item.shortName" :key="index" :optionData="item">{{ item.shortName }}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
                model2: [],
                model3: '',
                customerList: [
                    {
                        code: 'A001',
                        shortName: 'test001',
                        name: 'test 001'
                    },
                    {
                        code: 'A002',
                        shortName: 'test002',
                        name: 'test 002'
                    },
                    {
                        code: 'A003002',
                        shortName: 'test003',
                        name: 'test 003'
                    },
                    {
                        code: 'A004',
                        shortName: 'test004',
                        name: 'test 004'
                    }
                ],
            }
        },
        methods: {
            onClear() {
                console.log('onClear');
            },
            hhh() {
                console.log('extra clicked!');
                this.cityList.unshift({
                    value: '1111',
                    label: '23232'
                });
                this.$nextTick(function () {
                    this.model1 = '1111';
                });
            },
            remoteMethod1(query) {
                if (query !== '') {
                    this.loading2 = true;
                    setTimeout(() => {
                        this.loading2 = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = []
                }
            }
        },
    }
</script>
