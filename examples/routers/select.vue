<template>
    <div>
        <Select v-model="model1" style="width:200px" extra @on-extra-click="hhh">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Split></Split>
        <Select
            v-model="model1"
            size="small"
            style="width:200px;">
            <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>
        <Select
            v-model="model10"
            size="small"
            multiple
            style="width:260px">
            <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>

        <br><br>

        <Select
            v-model="model1"
            size="large"
            style="width:200px"
            clearable
            @on-clear="onClear">
            <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>
        <Select
            v-model="model10"
            size="large"
            multiple
            style="width:260px">
            <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>

        <br><br>

        <Select
            v-model="model1"
            style="width:200px">
            <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>
        <Select
            v-model="model11"
            multiple
            style="width:260px">
            <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>
        111
        <Select
            v-model="model1"
            remote
            filterable
            :remote-method="remoteMethod1"
            style="width:260px">
            <Option
                v-for="item in options"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>

        <br><br>

        <br><br>

        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <Select
            v-model="model10"
            multiple
            style="width:260px">
            <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>
        <br><br>

        <br><br>

        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <Select
            v-model="model10"
            multiple
            style="width:260px">
            <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">{{item.label}}
            </Option>
        </Select>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: [],
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York',
                    },
                    {
                        value: '中国',
                        label: '中国',
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney',
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa',
                    },
                    {
                        value: 'Paris',
                        label: 'Paris',
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra',
                    },
                ],
                model1: '',
                model10: [],
                model11: [],
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
            };
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
    };
</script>
