<template>
    <div>
        <Button @click="instance('info')">Info</Button>
        <Button @click="instance('success')">Success</Button>
        <Button @click="instance('warning')">Warning</Button>
        <Button @click="instance('error')">Error</Button>
        <Button @click="toggle('show')">side view</Button>
        <Button @click="toggle('inShow')">sideview</Button>

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
                loading: false
            };
        },
        created () {
            console.log(this.$refs.hh);
        },
        methods: {
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
