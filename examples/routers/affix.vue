<style>
    body{
        /*height: 2000px;*/
    }
    .demo-affix{
        width: 100px;
        height: 30px;
        background: #f60;
        color: #fff
    }
</style>
<template>
    <div>
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
        <Icon type="dot" class="color-warning"></Icon> 待发送
        <Affix>
            <span class="demo-affix">固定在最顶部</span>
        </Affix>
    </div>
</template>
<script>
    export default {

    }
</script>
