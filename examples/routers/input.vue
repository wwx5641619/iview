<template>
    <div style="width: 500px;">
        <Row :gutter="8">
            <i-col span="8"><Input v-model="obj.test" placeholder="hhh" type="textarea"
                                   :autosize="{minRows:1,maxRows:3}" :rows="1" size="small" wrap="hard"></Input></i-col>
            <i-col span="8"><Input placeholder="sdf" v-model="obj.test" size="small">
                <span slot="append">.com</span>
                </Input></i-col>
        </Row>
        <Split transparent/>

        <Row :gutter="8">
            <i-col span="8"><Input v-model="obj.test" placeholder="hhh" type="textarea"
                                   :autosize="{minRows:1,maxRows:5}"></Input></i-col>
            <i-col span="8"><Input placeholder="hh" v-model="obj.test">
                <span slot="prepend">http://</span>
                <span slot="append">.com</span>
                </Input></i-col>
        </Row>
        <Split transparent/>

        <Row :gutter="8">
            <i-col span="8"><Input size="large" v-model="obj.test" placeholder="hhh" type="textarea"
                                   :autosize="{minRows:1,maxRows:5}"></Input></i-col>
            <i-col span="8"><Input size="large" placeholder="dkfjdkjf" v-model="obj.test"></Input></i-col>
        </Row>

        {{ value1 }}
        <Input v-model="value1" upperCase clearable size="large" placeholder="large size"></Input>
        <br>
        <Input v-model="value2" lowerCase clearable placeholder="default size"></Input>
        <br>
        <Input v-model="value3" clearable size="small" placeholder="small size"></Input>
        <div style="width: 200px;margin: 100px;">
            {{ value6 }}
            <Input v-model="value5" type="textarea" placeholder="Enter something..."></Input>
            <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..."></Input>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value1: '',
                value2: '',
                value3: '',
                obj: {},
                value5: '',
                value6: ''
            };
        }
    };
</script>
