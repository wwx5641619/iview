<template>
    <Panel shadow class="dkfj">
        <Input type="textarea" v-model="val" autosize/>
        <textarea-format>{{val}}</textarea-format>
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
