<template>
    <Panel shadow class="dkfj">
        <Input type="textarea" v-model="val"/>
        <textarea-format :data="val"></textarea-format>
    </Panel>
</template>
<script>
    export default {
      data () {
        return {
          val: ''
        }
      }
    };

</script>
