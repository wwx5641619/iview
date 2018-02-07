<style>
    body {
        /*height: 2000px;*/
    }

    .demo-affix {
        height: 30px;
        background: #f60;
        color: #fff
    }
</style>
<template>
    <div>
        <Affix :offset-top="0">
            <div class="demo-affix">固定在最顶部</div>
        </Affix>
        <Icon type="checkmark-circled"></Icon>
        <Icon type="close-circled"></Icon>
        <Icon type="arrow-return-left"></Icon>
        <Icon type="sort-alpha-ase"></Icon>
        <Icon type="trash" size="16"></Icon>
        <Icon type="trash-outline" size="16"></Icon>
        <Split></Split>
        <Icon type="company" size="16" class="vam"></Icon>
        <span class="vam">咖狗网</span>
        <Split></Split>

        <div v-for="(item,index) in arr">{{item}}</div>
        <Affix :offset-bottom="0">
            <div class="demo-affix">固定在最顶部</div>
        </Affix>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                arr: []
            };
        },
        created () {
            for (let i = 0; i < 100; i++) {
                this.arr.push(i);
            }
        }
    };
</script>
