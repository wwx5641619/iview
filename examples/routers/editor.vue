<template>
    <div>
        <Panel shadow size="large">
            <Editor v-model="content" :disabled="disabled" height="200"></Editor>
            <KSplit transparent></KSplit>
            <Button type="primary" @click="getContent">get html</Button>
            <Button @click="handleDisabled">disabled</Button>
            <KSplit transparent large></KSplit>
            <Editor v-model="defaultContent" :toolbar="customToolbar" placeholder="请输入" disabled></Editor>
        </Panel>
    </div>

</template>
<script>

    export default {
        components: {},
        created () {
            console.log(this.$refs);
        },
        data () {
            return {
                defaultContent: '<br/><br/><br/><br/><p>----------</p><p>我是初始化内容</p>',
                content: '11111',
                disabled: false,
                customToolbar: [
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    [{'font': []}],
                    ['bold', 'italic', 'underline', 'strike']
                ],
            };
        },
        methods: {
            handleDisabled () {
                this.disabled = !this.disabled;
            },
            onChange (txt) {
                this.content = txt;
            },
            getContent () {
                console.log(this.content);
            }
        }
    };
</script>
