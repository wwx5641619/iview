<template>
    <td :rowspan="data[renderKey].rowSpan" v-if="data[renderKey]">
        <slot>{{data[ renderKey ].content}}</slot>
    </td>
    <td v-else-if="!renderKey">
        <slot></slot>
    </td>
</template>


<script>
    export default {
        name: 'TableTd',
        data() {
            return {};
        },
        props: {
            renderKey: {
                type: String,
                default: ''
            }
        },
        computed: {
            data() {
                return this.$parent.rowData.rowData;
            }
        }
    };

</script>
