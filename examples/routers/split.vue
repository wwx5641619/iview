<template>
    <div>
        普通
        <Split></Split>
        dashed
        <Split dashed></Split>
        transparent
        <Split transparent></Split>
        small
        <Split small></Split>
        large
        <Split large></Split>
        <Split large loss vertical></Split>
        <Split large></Split>

        <span>total: 333 <Split small vertical/>  Volume: 324</span>
        <br>
        <span class="fs14">total: 333 <Split vertical/>  Volume: 324</span>
        <br>
        <span class="fs16">total: 333 <Split large vertical/>  Volume: 324</span>
    </div>
</template>
<script>
    import {Alert, Icon} from 'iview';
    export default {
        components: {Alert, Icon}
    };

</script>
