<template>
    <div style="width: 500px;">
        <!--<Input autocomplete="on" v-model="value1" size="large" placeholder="large size"></Input>-->
        <!--<br>-->
        <!--<Input v-model="value2" placeholder="default size"></Input>-->
        <!--<br>-->
        <!--<Input v-model="value3" size="small" placeholder="small size"></Input>-->
        <!--<br>-->
        <!--<Input v-model="value1" size="large" placeholder="large size" icon="ios-clock-outline"></Input>-->
        <!--<br>-->
        <!--<Input v-model="value2" placeholder="default size" icon="ios-clock-outline"></Input>-->
        <!--<br>-->
        <!--<Input v-model="value3" size="small" placeholder="small size" icon="ios-clock-outline"></Input>-->
        <!--<Split transparent/>-->
        <Row :gutter="8">
            <i-col span="8"><Input v-model="obj.test" placeholder="hhh" type="textarea" :autosize="{minRows:1,maxRows:3}" :rows="1" size="small"></Input></i-col>
            <i-col span="8"><Input placeholder="dkfjdkjf" v-model="obj.test" size="small"></Input></i-col>
        </Row>
        <Split transparent/>

        <Row :gutter="8">
            <i-col span="8"><Input v-model="obj.test" placeholder="hhh" type="textarea" :autosize="{minRows:1,maxRows:5}" ></Input></i-col>
            <i-col span="8"><Input placeholder="dkfjdkjf" v-model="obj.test" ></Input></i-col>
        </Row>
        <Split transparent/>

        <Row :gutter="8">
            <i-col span="8"><Input size="large" v-model="obj.test" placeholder="hhh" type="textarea" :autosize="{minRows:1,maxRows:5}" ></Input></i-col>
            <i-col span="8"><Input size="large" placeholder="dkfjdkjf" v-model="obj.test" ></Input></i-col>
        </Row>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                value1: '',
                value2: '',
                value3: '',
                obj: {

                }
            }
        }
    }
</script>
