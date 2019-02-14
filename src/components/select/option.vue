<template>
    <li
        :class="classes"
        @click.stop="select"
        @mousedown.prevent
    ><slot>{{ showLabel }}</slot></li>
</template>
<script>
    import Emitter from '../../mixins/emitter';
    import { findComponentUpward } from '../../utils/assist';

    const prefixCls = 'ivu-select-item';

    export default {
        name: 'iOption',
        componentName: 'select-item',
        mixins: [ Emitter ],
        props: {
            value: {
                type: [String, Number],
                required: true
            },
            label: {
                type: [String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            selected: {
                type: Boolean,
                default: false
            },
            isFocused: {
                type: Boolean,
                default: false
            },
            // add by fen
            optionData: {
                type: Object
            }
            // end
        },
        data () {
            return {
                searchLabel: '',  // the slot value (textContent)
                autoComplete: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-selected`]: this.selected && !this.autoComplete,
                        [`${prefixCls}-focus`]: this.isFocused
                    }
                ];
            },
            showLabel () {
                return (this.label) ? this.label : this.value;
            },
            optionLabel(){
                return this.label || (this.$el && this.$el.textContent);
            }
        },
        methods: {
            select () {
                if (this.disabled) return false;

                this.dispatch('iSelect', 'on-select-selected', {
                    value: this.value,
                    label: this.optionLabel,
                    optionData: this.optionData // Add By FEN 为了适应 仓库选择后需要对不同类型的仓库做判断，需要返回整个对象
                });
                this.$emit('on-select-selected', {
                    value: this.value,
                    label: this.optionLabel,
                });
            },
        },
        mounted () {
            const Select = findComponentUpward(this, 'iSelect');
            if (Select) this.autoComplete = Select.autoComplete;
        },
    };
</script>
