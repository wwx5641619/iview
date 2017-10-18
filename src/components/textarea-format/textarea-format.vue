<template>
    <pre :class="classes">{{data}}</pre>
</template>

<script>
    const prefixCls = 'go-textarea-format';

    export default {
        name: 'split',
        props: {
            data: {
                type: String,
                default: ''
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`
                ];
            }
        }
    };

</script>