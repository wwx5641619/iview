<template>
    <div>
        普通
        <KSplit></KSplit>
        dashed
        <KSplit dashed></KSplit>
        transparent
        <KSplit transparent></KSplit>
        small
        <KSplit small></KSplit>
        big
        <KSplit big></KSplit>
        large
        <KSplit large></KSplit>
        <!--<Split large loss vertical></Split>-->

        111
        <!--<Split loss></Split>-->
        222
        <span>total: 333 <KSplit small vertical/>  Volume: 324</span>
        <br>
        <span class="fs14">total: 333 <KSplit vertical/>  Volume: 324</span>
        <br>
        <span class="fs16">total: 333 <KSplit big vertical/>  Volume: 324</span>
        <br>
        <span class="fs16">total: 333 <KSplit large vertical/>  Volume: 324</span>
    </div>
</template>
<script>
    import {Alert, Icon} from 'iview';
    export default {
        components: {Alert, Icon}
    };

</script>
