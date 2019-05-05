<template>
    <Panel shadow>
        <Button type="primary" @click="inShow1 = !inShow1">side view</Button>
        <!--<SideView v-model="inShow1" fromSideView url="http://www.qq.com"></SideView>-->
        <SideView v-model="inShow1">
            <Button type="primary" @click="inShow = !inShow">side view</Button>
            <SideView v-model="inShow"  src="http://www.qq.com">asdfasdfasd</SideView>
        </SideView>
        <Button type="primary" @click="component = 'SideView';inShow1 = !inShow1">side view</Button>
        <component :is="component" v-model="inShow1">动态生成</component>

        <Form compact ref="formValidate" :model="formValidate" :rules="ruleValidate"
              label-position="top"
        >
            <Form-item label="打卡机:">
                <Tag>dkj</Tag>
            </Form-item>
            <Form-item label="单选:">
                {{formValidate.tiledSelectSingle1}}
                <TiledSelectGroup v-model="formValidate.tiledSelectSingle">
                    <TiledSelect v-for="item in tiledSelects" :value="item.value" :key="item.value">{{item.label}}
                    </TiledSelect>
                </TiledSelectGroup>
            </Form-item>
            <Form-item label="单选" prop="tiledSelectSingle1" ref="tesss">
                <TiledSelectGroup v-model="formValidate.tiledSelectSingle1" unlimited >
                    <TiledSelect value="apple">FTL</TiledSelect>
                    <TiledSelect value="orage">LTL</TiledSelect>
                    <TiledSelect value="banana">Expression</TiledSelect>
                </TiledSelectGroup>
            </Form-item>
            <Form-item label="单选" prop="tiledSelectSingle1" unlimited>
                <TiledSelectGroup v-model="formValidate.tiledSelectSingle1" size="big">
                    <TiledSelect value="apple">苹果</TiledSelect>
                    <TiledSelect value="orage">橘子</TiledSelect>
                    <TiledSelect value="banana">Expression</TiledSelect>
                </TiledSelectGroup>
            </Form-item>
            <Button @click="set">set</Button>
            {{formValidate.tiledSelectSingle}}
            {{formValidate.tiledSelectSingle1}}
            <Form-item label="多选">
                <TiledSelectGroup unlimitedText="不限" unlimited v-model="formValidate.tiledSelectMulti" size="large" selectType="multi"
                                  @on-change="handlecg">
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
                    <Radio v-for="item in radios" :label="item" :key="item"></Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="爱好" prop="interest" ref="tettt">
                <Checkbox-group v-model="formValidate.interest" type="button">
                    <Checkbox v-for="item in radios" :label="item" :key="item"></Checkbox>
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
        <KSplit dashed large/>
        <Form label-position="top" size="small" compact>
            <Row :gutter="16">
                <i-col span="6">
                    <FormItem label="Name">
                        <Input size="small"/>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem label="Name">
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" size="small" class="w100p"></Date-picker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem label="Name">
                        <Select size="small">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai" disabled>London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                </i-col>
            </Row>
        </Form>
        <KSplit dashed/>
        <Form label-position="top">
            <Row :gutter="16">
                <i-col span="6">
                    <FormItem label="Name">
                        <Input />
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem label="Name">
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class="w100p"></Date-picker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem label="Name">
                        <Select>
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai" disabled>London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                </i-col>
            </Row>
        </Form>
        <KSplit dashed large/>
        <Form text :label-width="60" labelPosition="left">
            <Row>
                <i-col span="6">
                    <FormItem label="Name:">FEN</FormItem>
                    <FormItem label="Old:">36</FormItem>
                    <FormItem label="Tel:">13958302447</FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem label="船名">阿斯顿发斯蒂芬</FormItem>
                    <FormItem label="航次">阿斯蒂芬是</FormItem>
                    <FormItem label="提单号">阿斯顿发斯蒂芬</FormItem>
                </i-col>
            </Row>
        </Form>

        <KSplit dashed large/>
        <Form text labelPosition="top">
            <Row>
                <i-col span="4">
                    <FormItem label="Name:">FEN</FormItem>
                    <FormItem label="Old:">36</FormItem>
                    <FormItem label="Tel:">13958302447</FormItem>
                </i-col>
                <i-col span="4">
                    <FormItem label="呵呵">我是可爱的值</FormItem>
                    <FormItem label="啊地方">阿萨撒旦发射点发</FormItem>
                    <FormItem label="撒地方">
                        <textarea-format>{{formValidate.desc}}</textarea-format>
                    </FormItem>
                </i-col>
            </Row>
        </Form>
    </Panel>
</template>
<script>
    import FormSide from '../../src/components/side-view';

    export default {
        components:{FormSide},
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
                component: '',
                inShow: false,
                inShow1: false,
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: 'ftl',
                    interest: [],
                    test: [''],
                    date: '2017-12-12',
                    time: null,
                    desc: '',
                    tiledSelect: '',
                    tiledSelectSingle: '',
                    tiledSelectSingle1: '',
                    tiledSelectMulti: [],
                    radio: 'ftl'
                },
                radios: ['ftl', 'ltl', 'expression'],
                tiledSelects: [],
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
                        {required: true, type: 'string', message: '请输入个人介绍', trigger: 'change'},
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
                this.radios = ['hh', 'aa'];
                this.formValidate.gender = 'hh';
                this.tiledSelects = [{value: 'FTL', label: '整车'}, {value: 'LTL', label: '拼车'}];
                this.formValidate.tiledSelectSingle = 'FTL';
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
