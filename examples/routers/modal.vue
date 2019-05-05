<template>
    <div>
        <Button type="primary" @click="modal1 = true">Display dialog box</Button>
        <Modal
                v-model="modal1"
                title="Common Modal dialog box title"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <Button @click="openMessage">Message</Button>
            <Select v-model="model1" style="width:200px" :transfer="false">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model1" style="width:200px" :transfer="true">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Dropdown transfer>
                <a href="javascript:void(0)">
                    下拉菜单
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>驴打滚</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem disabled>豆汁儿</DropdownItem>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem divided>北京烤鸭</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <DatePicker type="date" placeholder="Select date" style="width: 200px" transfer></DatePicker>
            <Cascader :data="data" v-model="value1" transfer></Cascader>
            <Tooltip content="Here is the prompt text" transfer>
                A balloon appears when the mouse passes over this text
            </Tooltip>
            <Poptip trigger="hover" title="Title" content="content" transfer>
                <Button>Hover</Button>
            </Poptip>
            <Button type="primary" @click="handleSpinShow">整页显示，3秒后关闭</Button>
        </Modal>
        <Select v-model="model1" style="width:200px" :transfer="false">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model1" style="width:200px" :transfer="true">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <SideView v-model="inShow"
                  title="订单详情"
                  footerHide
                  ok-text="保存"
                  cancel-text="取消"
                  @on-ok="ok"
                  :moreMenu="menu"

        >
            <FormCompact/>
        </SideView>
        <SideView v-model="show"
                  title="订单详情"
                  ok-text="保存"
                  cancel-text="取消"
                  @on-ok="ok"
                  :beforeVisible="beforevisible"
                  :afterVisible="aftervisible"
                  :beforeClose="validate"
                  :afterClose='afterclose'
                  :afterRender='afterrender'
                  :viewLoading='loading'
        >
            2313123
        </SideView>
    </div>
</template>
<script>
    import FormCompact from './form-compact.vue';

    export default {
        components: {FormCompact},
        data () {
            return {
                show: false, inShow: false, inShow1: false,
                menu: [{
                    label: 'woqu', handler (v) {
                        console.log(111);
                    }
                }, {
                    label: '34534534', handler (v) {
                        console.log(222);
                    }
                }],
                loading: false,
                modal1: false,
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
                value1: [],
                data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }]
            }
        },
        methods: {
            ok () {
//                this.$Message.info('Clicked ok');
            },
            cancel () {
//                this.$Message.info('Clicked cancel');
            },
            openMessage () {
                this.$Message.info({
                    content: 'hello world',
                    duration: 2
                });
            },
            handleSpinShow () {
                this.$Spin.show();
            },
            beforevisible (next) {
                this.loading = true;

//                setTimeout(() => next(), 1000);
                next();
            },
            aftervisible () {
                setTimeout(() => {
                    this.loading = false;
                }, 6000);
                console.log('visivled');
            },
            afterclose () {
                console.log('closed');
            },
            afterrender () {
                console.log('rendered');
            },
            validate (next, confirm) {
                confirm()
            },
            ok () {
                setTimeout(() => this.show = false, 2000);
            },
            toggle (v) {
                this[v] = !this[v];
            },
            instance (type) {
                const title = 'Title';
                const content = '<p>Content of dialog</p><p>Content of dialog</p>';
                switch (type) {
                    case 'info':
                        this.$Modal.info({
                            title: title,
                            content: content
                        });
                        break;
                    case 'success':
                        this.$Modal.success({
                            title: title,
                            content: content
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: title,
                            content: content
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            }
        }
    };
</script>
