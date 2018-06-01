<template>
    <div style="padding: 30px;">
        <Panel title="small & shadow" noHeaderBorder actived>
            <Panel title="small & shadow" split>
                show
            </Panel>
        </Panel>

        <Panel title="small & shadow" grayHeader shadow :hideBody="show">
            <template slot="fn">
                <Button size="small" @click="toggle">toggle</Button>
            </template>
            内容
        </Panel>

        <Panel title="shadow" size="large" grayHeader shadow :hideBody="show" :actived="!show">
            <template slot="fn">
                <Button size="small" @click="toggle">toggle</Button>
            </template>
            内容
        </Panel>

        <Panel title="small & shadow" size="small" grayHeader shadow :hideBody="show">
            <template slot="fn">
                <Button size="small" @click="toggle">toggle</Button>
            </template>
            内容
        </Panel>


        <Panel title="large & shadow" shadow size="large">
            内容
            <Panel noPadding title="large & shadow" noHeaderBorder>
                内容
            </Panel>
        </Panel>

        <Panel shadow noHeaderBorder title="title">
            <Panel gray size="small" split>111</Panel>
        </Panel>

        <Panel gray shadow size="small">
            <Panel title="aksdjf" shadow size="small">
                dfasd
            </Panel>
        </Panel>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                panels: [ 1, 2, 3 ],
                show: false
            };
        },
        methods: {
            test(index) {
                this.panels.splice(index, 1);
            },
            toggle() {
                this.show = !this.show;
            }
        }
    };
</script>
