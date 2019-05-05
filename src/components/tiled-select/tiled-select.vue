<template>
    <label :class="classes" @click="handleClick">
        <slot>{{ label }}</slot>
    </label>
</template>
<script>
    import Icon from '../icon';
    import {oneOf} from '../../utils/assist';

    const prefixCls = 'ivu-tiled-select';
    export default {
        name: 'TiledSelect',
        components: {Icon},
        props: {
            value: {
                type: [String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            multiSelectable: {
                type: Boolean,
                default: false
            },
            selected: {
                type: Boolean,
                default: false
            },
            label: {
                type: String
            },
            size: {
                validator (value) {
                    return oneOf(value, ['big', 'large', 'default']);
                }
            },
            type: {
                validator (value) {
                    return oneOf(value, ['solid', 'default', 'text']);
                }
            },
        },
        data () {
            return {
                isSelected: this.selected,
                isMultiSelectable: this.multiSelectable,
                isGrouped: false,
                isDisabled: this.disabled,
                currentType: this.type,
                currentSize: this.size,
                currentValue: this.value,
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}--selected`]: this.isSelected,
                        [`${prefixCls}--multi`]: this.isMultiSelectable,
                        [`${prefixCls}--disabled`]: this.isDisabled,
                        [`${prefixCls}--${this.currentType}`]: this.currentType,
                        [`${prefixCls}--${this.currentSize}`]: this.currentSize,
                    }
                ];
            }
        },
        methods: {
            handleClick () {
                // 单个的时候自己管理状态，Group 的时候由父级来管
                if (this.isGrouped) {
                    this.$parent.change(this.value);
                } else {
                    if (!this.isDisabled) {
                        this.isSelected = !this.isSelected;
                    }
                }
            }
        }
    };
</script>