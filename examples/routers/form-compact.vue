<template>
    <Panel shadow>
        <Form labelPosition="right" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80"
              compact size="small">
            <Form-item label="打卡机:">
                <TiledSelect :selected="true" disabled :value="1" label="全部"></TiledSelect>
                <TiledSelect multiSelectable type="solid" selected label="adskf" disabled></TiledSelect>
                <TiledSelect type="text" disabled multiSelectable label="adskf"></TiledSelect>
                <TiledSelect type="text" label="asdkfj"></TiledSelect>
                <TiledSelect label="asdkfj"></TiledSelect>
            </Form-item>
            <Form-item label="单选:">
                <TiledSelectGroup v-model="formValidate.tiledSelectSingle" size="large" type="solid">
                    <TiledSelect value="apple">苹果</TiledSelect>
                    <TiledSelect value="orage">橘子</TiledSelect>
                    <TiledSelect value="hhh">橘子</TiledSelect>
                </TiledSelectGroup>
            </Form-item>
            <Form-item label="单选" prop="tiledSelectSingle1" ref="tesss">
                <TiledSelectGroup v-model="formValidate.tiledSelectSingle1" hasAll type="text">
                    <TiledSelect value="apple">FTL</TiledSelect>
                    <TiledSelect value="orage">LTL</TiledSelect>
                    <TiledSelect value="banana">Expression</TiledSelect>
                </TiledSelectGroup>
            </Form-item>
            <Button @click="set">set</Button>
            {{formValidate.tiledSelectSingle}}
            {{formValidate.tiledSelectSingle1}}
            <Form-item label="多选">
                <TiledSelectGroup v-model="formValidate.tiledSelectMulti" disabled size="big" selectType="multi"
                                  @on-change="handlecg" hasAll>
                    <TiledSelect value="apple">苹果</TiledSelect>
                    <TiledSelect value="orage">橘子</TiledSelect>
                </TiledSelectGroup>
                {{formValidate.tiledSelectMulti}}
            </Form-item>
            <Form-item label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入姓名" size="small"></Input>
            </Form-item>

            <Form-item label="邮箱" prop="mail" size="small">
                <Form-item prop="mail" size="small">
                    <Input v-model="formValidate.mail" placeholder="请输入邮箱" size="small">
                    <span slot="append">@</span>
                    </Input>
                </Form-item>
                <Form-item prop="mail" size="small">
                    <Input v-model="formValidate.mail" placeholder="请输入邮箱" size="small">
                    <span slot="append">@</span>
                    </Input>
                </Form-item>
            </Form-item>
            <Form-item label="城市" prop="city">
                <Select v-model="formValidate.city" placeholder="请选择所在地" size="small">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </Form-item>
            <Row>
                <Col span="11">
                <Form-item prop="date" label="选择日期">
                    <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" size="small"></Date-picker>
                </Form-item>
                <Form-item>
                    <Time-picker :timestamp="false" type="time" placeholder="选择时间" v-model="formValidate.time"
                                 size="small"></Time-picker>
                </Form-item>
                </Col>
            </Row>
            <Form-item label="性别" prop="gender" size="small">
                <Radio-group v-model="formValidate.gender">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="爱好" prop="interest" ref="tettt">
                <Checkbox-group v-model="formValidate.interest">
                    <Checkbox label="吃饭"></Checkbox>
                    <Checkbox label="睡觉"></Checkbox>
                    <Checkbox label="跑步"></Checkbox>
                    <Checkbox label="看电影"></Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="介绍" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="请输入..."></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
        <Split dashed large/>
        <Form text :label-width="60" labelPosition="left">
            <Row>
                <i-col span="6">
                    <FormItem label="Name:">FEN</FormItem>
                    <FormItem label="Old:">36</FormItem>
                    <FormItem label="Tel:">13958302447</FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem label="Label:">hehe</FormItem>
                    <FormItem label="Label:">hehe</FormItem>
                    <FormItem label="Label:">hehe</FormItem>
                </i-col>
            </Row>
        </Form>

        <Split dashed large/>
        <Form text labelPosition="top">
            <Row>
                <i-col span="4">
                    <FormItem label="Name:">FEN</FormItem>
                    <FormItem label="Old:">36</FormItem>
                    <FormItem label="Tel:">13958302447</FormItem>
                </i-col>
                <i-col span="4">
                    <FormItem label="Label:">我是可爱的值</FormItem>
                    <FormItem label="Label:">hehe</FormItem>
                    <FormItem label="Label:">
                        <textarea-format>{{formValidate.desc}}</textarea-format>
                    </FormItem>
                </i-col>
            </Row>
        </Form>
    </Panel>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                const ret = [];
                for (let item in value) {
                    ret.push(value[item]);
                }
                if (!ret.some(item => item)) {
                    callback(new Error('必须选择一项'));
                } else {
                    callback();
                }
            };
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    test: [''],
                    date: '2017-12-12',
                    time: null,
                    desc: '',
                    tiledSelect: ['dsdf', 'sdfasdf', 'hhhk', 'wolaile'],
                    tiledSelectSingle: {},
                    tiledSelectSingle1: {},
                    tiledSelectMulti: {},
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: '请选择城市', trigger: 'change'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    interest: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change'},
                        {type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change'}
                    ],
                    date: [
                        {required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    time: [
                        {required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请输入个人介绍', trigger: 'blur'},
                        {type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur'}
                    ],
                    tiledSelectSingle1: [
                        {required: true, type: 'object', message: '请输入个人介绍', trigger: 'change'},
                        {validator: validatePass, trigger: 'change'},
                    ]
                }
            };
        },
        mounted () {
            console.log(this.$refs.tesss);
            console.log(this.$refs.tettt);
        },
        methods: {
            set () {
                this.formValidate.tiledSelectSingle1 = {orange: true};
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            handlecg (data) {
                console.log(data);
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    };
</script>
