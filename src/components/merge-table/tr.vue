<template>
    <tr>
        <slot></slot>
    </tr>
</template>


<script>
    export default {
        name: 'TableTr',
        data() {
            return {};
        },
        props: {
            rowData: {
                type: Object,
                default: {}
            }
        }
    };

</script>
