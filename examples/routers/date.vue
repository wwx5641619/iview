<template>
    <div>
        {{ value1 }} {{value2}}
        <Date-picker v-model="value1" type="daterange" placeholder="选择日期" style="width: 200px" @on-change="hc"></Date-picker>
        <Date-picker v-model="value2" type="date" placeholder="选择日期" style="width: 200px" @on-change="hc"></Date-picker>
        <Date-picker v-model="value3" type="date" placeholder="选择日期" style="width: 200px" @on-change="hc"></Date-picker>
        <Date-picker type="date" placeholder="选择日期" style="width: 200px" @on-change="hc"></Date-picker>
        <Date-picker :timestamp="false" v-model="value4" type="date" placeholder="选择日期" style="width: 200px" @on-change="hc"></Date-picker>
        <Button @click="setDate">set date</Button>
        <Button @click="getDate">get date</Button>

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="1" prop="date">
                <Date-picker v-model="formValidate.date" type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
            </FormItem>
            <FormItem label="232" prop="num">
                <Input v-model="formValidate.num" number style="width: 200px"></Input>
            </FormItem>
            <Button @click="vdate">vdate</Button>
        </Form>
        <!--<Date-picker v-model="value2" type="daterange" placeholder="选择日期" style="width: 200px"></Date-picker>-->
        <!--<Date-picker transfer type="datetimerange" placeholder="选择日期" style="width: 200px" @on-change="changeDate"></Date-picker>-->
    </div>
</template>
<script>
export default {
    data () {
        return {
            value11: [1508143679588, 1513008000000],
            value1: ['2017-12-12', '2017-12-12'],
            value2: '2017-12-12',
            value3: 1508143679588,
            value5: '',
            value4: '2017-12-12',
            formValidate: {
                date: 1508143679588,
                num: 0
            },
            ruleValidate: {
                num: { required: true, type: 'number', message: 'Please select the date', trigger: 'change' },
                date: { required: true, type: 'number', length: 13, message: 'Please select the date', trigger: 'change' },
            },
        }
    },

    created () {
        const date = new Date()
        date.setTime(this.value2)
        console.log(date.getTime(), 22)
        console.log(this.value2.toString().length)
    },
    methods: {
        vdate () {
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        changeDate (date) {
            console.log(date);
        },
        setDate () {
            this.value1 = ['2014-10-10', '2017-10-10'];
            this.value2 = '1508143679588';
        },
        getDate () {
            const date = new Date()
            console.log(this.value1, 'value1')
            console.log(this.value2, 'value2')
            console.log(this.value3, 'value3')
            console.log(this.value4, 'value4')
            console.log(this.formValidate.date, 'date')
        },
        hc (d) {
            console.log(d);
        }
    }
}
</script>
<style>
body {
    width: 100%;
}
</style>


<!--<template>-->
    <!--<row>-->
        <!--<i-col span="12">-->
            <!--<Date-picker type="date" :options="options1" placeholder="选择日期" style="width: 200px"></Date-picker>-->
        <!--</i-col>-->
        <!--<i-col span="12">-->
            <!--<Date-picker type="daterange" :options="options2" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>-->
        <!--</i-col>-->
    <!--</row>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--data () {-->
            <!--return {-->
                <!--options1: {-->
                    <!--shortcuts: [-->
                        <!--{-->
                            <!--text: '今天',-->
                            <!--value () {-->
                                <!--return new Date();-->
                            <!--},-->
                            <!--onClick: (picker) => {-->
                                <!--this.$Message.info('点击了今天');-->
                            <!--}-->
                        <!--},-->
                        <!--{-->
                            <!--text: '昨天',-->
                            <!--value () {-->
                                <!--const date = new Date();-->
                                <!--date.setTime(date.getTime() - 3600 * 1000 * 24);-->
                                <!--return date;-->
                            <!--},-->
                            <!--onClick: (picker) => {-->
                                <!--this.$Message.info('点击了昨天');-->
                            <!--}-->
                        <!--},-->
                        <!--{-->
                            <!--text: '一周前',-->
                            <!--value () {-->
                                <!--const date = new Date();-->
                                <!--date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);-->
                                <!--return date;-->
                            <!--},-->
                            <!--onClick: (picker) => {-->
                                <!--this.$Message.info('点击了一周前');-->
                            <!--}-->
                        <!--}-->
                    <!--]-->
                <!--},-->
                <!--options2: {-->
                    <!--shortcuts: [-->
                        <!--{-->
                            <!--text: '最近一周',-->
                            <!--value () {-->
                                <!--const end = new Date();-->
                                <!--const start = new Date();-->
                                <!--start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);-->
                                <!--return [start, end];-->
                            <!--}-->
                        <!--},-->
                        <!--{-->
                            <!--text: '最近一个月',-->
                            <!--value () {-->
                                <!--const end = new Date();-->
                                <!--const start = new Date();-->
                                <!--start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);-->
                                <!--return [start, end];-->
                            <!--}-->
                        <!--},-->
                        <!--{-->
                            <!--text: '最近三个月',-->
                            <!--value () {-->
                                <!--const end = new Date();-->
                                <!--const start = new Date();-->
                                <!--start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);-->
                                <!--return [start, end];-->
                            <!--}-->
                        <!--}-->
                    <!--]-->
                <!--}-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->


<!--<template>-->
    <!--<row>-->
        <!--<i-col span="12">-->
            <!--<Date-picker :value="value1" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 200px"></Date-picker>-->
        <!--</i-col>-->
        <!--<i-col span="12">-->
            <!--<Date-picker :value="value2" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>-->
        <!--</i-col>-->
    <!--</row>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--data () {-->
            <!--return {-->
                <!--value1: '2016-01-01',-->
                <!--value2: ['2016-01-01', '2016-02-15']-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->


<!--<template>-->
    <!--<div>-->
        <!--<Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>-->
        <!--<br>-->
        <!--<Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></Date-picker>-->
        <!--<br>-->
        <!--<Date-picker type="datetimerange" placeholder="选择日期和时间" style="width: 300px"></Date-picker>-->
        <!--<br>-->
        <!--<Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 300px"></Date-picker>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->

    <!--}-->
<!--</script>-->


<!--<template>-->
    <!--<row>-->
        <!--<i-col span="12">-->
            <!--<Time-picker type="time" placeholder="选择时间" style="width: 168px"></Time-picker>-->
        <!--</i-col>-->
        <!--<i-col span="12">-->
            <!--<Time-picker type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 168px"></Time-picker>-->
        <!--</i-col>-->
    <!--</row>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--data () {-->
            <!--return {-->
                <!--t1: ''-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->




