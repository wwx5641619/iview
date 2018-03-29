<template>
    <div style="margin: 100px;width: 200px;">
        <AutoComplete placement="top" transfer v-model="value" icon="ios-search" :data="data" @on-search="handleSearch"
                      @on-change="hc" :filter-method="fm">
            <!--<Option v-for="item in data" :value="item" :label="item" :key="item">-->
            <!--<span style="color: red">{{ item }}</span>-->
            <!--</Option>-->
        </AutoComplete>
        <AutoComplete placement="top" transfer v-model="value" icon="ios-search" :data="data1">
            <Option v-for="item in data1" :value="item" :label="item" :key="item">
                <span>{{ item }}</span>
            </Option>
        </AutoComplete>
    </div>
</template>
<script>

    export default {
        props: {},
        data () {
            return {
                value: '',
                data: [],
                data1: ['Burns Bay Road', 'Downing Street', 'Wall Sfdastreet', 'Wall Street2', 'Wall Street3', 'Wall Str2efet', 'Wadll asStreet', 'Wall asddStreet', 'Wall afStrefet', 'Wall Sftareet', 'Wall Ssstreet', 'Walla Street', 'Wall Stfreet', 'Wall Stgredet', 'Wall5 Street', 'Wall St6reet', 'Wall S6treet', 'Wall Sftreseft', 'Wall Stsre54et', 'Waslfl St45reet', 'Wall Streest', 'Wadll Strdeet', 'Wall S5trfeet', 'Wsall Stre6et', 'Wall St3reet']
            };
        },
        computed: {},
        methods: {
            handleSearch (value) {
                this.data = !value ? [] : [
                    value + '@qq.com',
                    value + '@sina.com',
                    value + '@163.com'
                ];
            },
            hc (v) {
//                console.log(v)
            },
            fm (value, item) {
                return item.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            }
        }
    };
</script>
