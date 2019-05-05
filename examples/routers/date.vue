<template>
    <div>
        {{ value1 }} {{value2}}
        <Date-picker :options="options1" v-model="value1" type="daterange" placeholder="选择日期"
                     style="width: 200px"
                     @on-change="hc"></Date-picker>
        <Date-picker v-model="value2" type="date" placeholder="选择日期" style="width: 200px" @on-change="hc"></Date-picker>
        <Date-picker v-model="value3" type="date" placeholder="选择日期" style="width: 200px" @on-change="hc"></Date-picker>
        <Date-picker type="date" placeholder="选择日期" style="width: 200px" @on-change="hc"></Date-picker>
        <Date-picker :timestamp="false" v-model="value4" type="date" placeholder="选择日期" style="width: 200px"
                     @on-change="hc"></Date-picker>
        <Date-picker :options="options1" v-model="value1" type="daterange" placeholder="选择日期" style="width: 200px"
                     @on-change="hc"></Date-picker>
        <Button @click="setDate">set date</Button>
        <Button @click="getDate">get date</Button>

        <Form ref="formValidate" :model="formValidate" :label-width="80">
            <FormItem label="1" prop="date">
                <Date-picker v-model="formValidate.date" type="datetime" placeholder="选择日期"
                             style="width: 200px"></Date-picker>
            </FormItem>
            <FormItem label="232" prop="num">
                <Input v-model="formValidate.num" number style="width: 200px"></Input>
            </FormItem>
            <Button @click="vdate">vdate</Button>
        </Form>

        <p><input type="text"></p>

        <DatePicker type="month" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
        <DatePicker type="year" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>

        <DatePicker type="date" transfer show-week-numbers placeholder="Select date" style="width: 400px"></DatePicker>
        <DatePicker type="datetime" show-week-numbers confirm placeholder="Select date"
                    style="width: 400px"></DatePicker>

        <DatePicker type="daterange" transfer show-week-numbers placeholder="Select date"
                    style="width: 400px"></DatePicker>
        <DatePicker type="datetimerange" transfer show-week-numbers placeholder="Select date"
                    style="width: 400px"></DatePicker>
        <Time-Picker :steps="[1, 1, 15]" :value="new Date()"></Time-Picker>
        <!--<Date-picker v-model="value2" type="daterange" placeholder="选择日期" style="width: 200px"></Date-picker>-->
        <!--<Date-picker transfer type="datetimerange" placeholder="选择日期" style="width: 200px" @on-change="changeDate"></Date-picker>-->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options1: {
                    sidebarWidth: 160,
                    shortcuts: [
                        {
                            text: 'Today 11 11111',
                            value() {
                                return new Date();
                            },
                            onClick: (picker) => {
                                this.$Message.info('Click today');
                            }
                        },
                        {
                            text: 'Yesterday',
                            value() {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('Click yesterday');
                            }
                        },
                        {
                            text: 'One week',
                            value() {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('Click a week ago');
                            }
                        }
                    ]
                },
                value11: [ 1508143679588, 1513008000000 ],
                value1: [ '2017-12-12', '2017-12-12' ],
                value2: null,
                value3: '',
//                value3: '2017-12-12',
                value5: '',
                value4: '2017-12-12',
                formValidate: {
                    date: '2017-12-12',
                    num: 0
                },
                ruleValidate: {
                    num: { required: true, type: 'number', message: 'Please select the date', trigger: 'change' },
                    date: {
                        required: true,
                        type: 'number',
                        length: 13,
                        message: 'Please select the date',
                        trigger: 'change'
                    },
                },
            };
        },

        created() {
            const date = new Date();
            date.setTime(this.value2);
            console.log(date.getTime(), 22);
        },
        mounted () {
            console.log(this.value2);
        },
        methods: {
            vdate() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
            changeDate(date) {
                console.log(date);
            },
            setDate() {
                this.value1 = [ '2014-10-10', '2017-10-10' ];
                this.value2 = '1508143679588';
            },
            getDate() {
                const date = new Date();
                console.log(this.value1, 'value1');
                console.log(this.value2, 'value2');
                console.log(this.value3, 'value3');
                console.log(this.value4, 'value4');
                console.log(this.formValidate.date, 'date');
            },
            hc(d) {
                console.log(d);
            }
        }
    };
</script>
<style>
    body {
        width: 100%;
    }
</style>
