<template>
    <pre :class="classes"><slot>{{data}}</slot></pre>
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