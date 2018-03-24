<template>
    <div>
        <Button @click="instance('info')">Info</Button>
        <Button @click="instance('success')">Success</Button>
        <Button @click="instance('warning')">Warning</Button>
        <Button @click="instance('error')">Error</Button>
        <Button @click="toggle">side view</Button>
        <SideView v-model="show"
                  title="订单详情"
                  footerHide
                  ok-text="保存"
                  cancel-text="取消"
                  @on-ok="ok"
                  loading
                  :moreMenu="menu"
                  :beforeClose="validate"
                  defaultActions
        >
            <FormCompact/>
        </SideView>
    </div>
</template>
<script>
    import FormCompact from './form-compact.vue';

    export default {
        components: {FormCompact},
        data () {
            return {
                show: true, inShow: false, inShow1: false,
                menu: [{
                    label: 'woqu', handler (v) {
                        console.log(111);
                    }
                }, {
                    label: '34534534', handler (v) {
                        console.log(222);
                    }
                }]
            };
        },
        created () {
            console.log(this.$refs.hh);
        },
        methods: {
            validate (next) {
                this.$Modal.confirm({
                    title: '更改未保存',
                    content: '<p>你做的修改为保存！</p>',
                    okText:'保存更改',
                    cancelText:'舍弃更改',
                    onOk: () => {
                        next();
                    }
                });
            },
            ok () {
                setTimeout(() => this.show = false, 2000);
            },
            toggle () {
                this.show = !this.show;
            },
            instance (type) {
                const title = 'Title';
                const content = '<p>Content of dialog</p><p>Content of dialog</p>';
                switch (type) {
                    case 'info':
                        this.$Modal.info({
                            title: title,
                            content: content,
                            closable: true
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
