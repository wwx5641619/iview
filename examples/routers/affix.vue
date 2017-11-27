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
        <Affix>
            <span class="demo-affix">固定在最顶部</span>
        </Affix>
    </div>
</template>
<script>
    export default {

    }
</script>
