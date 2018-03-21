<template>
    <div>
        <InputNumber :max="1000000000" :min="1" v-model="value1" :formatter="formatter" :parser="parser" @on-change="change" style="width: 200px"></InputNumber>
        <InputNumber :max="1000000000" :min="1" v-model="value2" :formatter="formatter2" :parser="parser2" @on-change="change" style="width: 200px"></InputNumber>

        <InputNumber placeholder="hhhhh" :show-handler="true" @on-change="change" style="width: 200px"></InputNumber>

        <InputNumber placeholder="hhhhh" show-handler="hover" v-model="valueNull" @on-change="change" style="width: 200px"></InputNumber>
        <InputNumber v-model="valueNull" @on-change="change" :formatter="formatter" :parser="parser" style="width: 200px"></InputNumber>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value1: 1800000,
                value2: 55,
                valueNull:null,
                formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                parser: (value) => value.replace(/\$\s?|(,*)/g, ''),
                formatter2: (value) => `${value}%`,
                parser2: (value) => value.replace('%', '')
            }
        },
        computed: {},
        methods: {
            c () {
                this.v1 = 5;
            },
            changeMax () {
                this.max++;
            }
        }
    }
</script>
