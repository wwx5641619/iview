<template>
    <div :class="classes">
        <TiledSelect v-if="unlimited" :value="unlimitedOptionName" selected>{{unlimitedTextContent}}</TiledSelect>
        <slot></slot>
    </div>
</template>
<script>
    import Icon from '../icon';
    import {findComponentsDownward, oneOf, deepCopy} from '../../utils/assist';
    import TiledSelect from './tiled-select';
    import Locale from '../../mixins/locale';
    import Emitter from '../../mixins/emitter';

    const prefixCls = 'ivu-tiled-select';
    export default {
        name: 'TiledSelectGroup',
        mixins: [Locale, Emitter],
        components: {Icon, TiledSelect},
        props: {
            value: {
                type: [String, Array],
                default: '',
            },
            unlimited: {
                type: Boolean,
                default: false
            },
            unlimitedText: {
                type: String
            },
            selectType: {
                type: String,
                default: 'single',
                validator (value) {
                    return oneOf(value, ['multi', 'single']);
                }
            },
            disabled: {
                type: Boolean,
                default: false
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
                currentValue: this.value, // 实际需要提交的数据
                viewValue: '', // 用于子组件状态显示的数据
                childrens: [],
                unlimitedOptionName: ''
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}-group`,
                ];
            },
            unlimitedTextContent () {
                return this.unlimitedText ? this.unlimitedText : this.t('i.tiledSelect.unlimited');
            }
        },
        created () {
            this.update();
        },
        methods: {
            setChildren () {
                // 获取 group 下面的 childrens 赋值给 data 中的 childrens，并初始化
                this.childrens = findComponentsDownward(this, 'TiledSelect');
                this.initChildrenProps(this.childrens);
                if (this.unlimited) {
                    this.childrens.splice(0, 1);
                }
            },
            initChildrenProps () {
                // 把父级的各种状态赋给 children
                this.childrens.forEach((child, index) => {
                    if (this.selectType === 'multi') {
                        // unlimited 选项不需要 multi 的样式
                        // 当没有 unlimited 选项，又可以多选的时候，样式为全部可勾选状态
                        child.isMultiSelectable = this.unlimited ? !!index : true;
                    }
                    child.isGrouped = true;
                    child.isDisabled = this.disabled;
                    child.currentType = this.type;
                    child.currentSize = this.size;
                });
            },
            hasTrue (val) {
//                对象中是否有 true 的字段
                if (Array.isArray(val)) {
                    return val.length > 0;
                } else {
                    return !!val && val !== this.unlimitedOptionName;
                }
            },
            setUnlimitedState () {
//                unlimited 选项的选中取消判断
                if (this.unlimited) {
                    const hasTrue = this.hasTrue(this.currentValue);
                    const unlimitedOption = this.$children[0];
                    if (hasTrue) {
                        unlimitedOption.isSelected = false;
                    } else {
                        unlimitedOption.isSelected = true;
                    }
                }
            },
            update () {
                this.$nextTick(() => {
                    this.setChildren();
                    this.setChildrenSelect();
                    this.setUnlimitedState(); // 只在初始化的时候去计算是否 All 选项需要选中
                });
            },
            setChildrenSelect () {
                // 设置 children 的选中状态
                const value = this.value;
                this.childrens.forEach(child => {
                    if (this.selectType === 'single') {
                        child.isSelected = value === child.value;
                    } else {
                        child.isSelected = value.some(val => val === child.value);
                    }
                });
            },
            setCurrentValue (valueName) {

                const setMutiValue = () => {
                    if(valueName === ''){
                        this.currentValue = [];
                        return;
                    }
                    const hasValue = this.currentValue.some(val => val === valueName);
                    if (hasValue) {
                        for (let i = 0, l = this.currentValue.length; i <= l; i++) {
                            if (this.currentValue[i] === valueName) {
                                this.currentValue.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        this.currentValue.push(valueName);
                    }
                };

                if (this.selectType === 'single') {
                    this.currentValue = valueName;
                } else {
                    setMutiValue();
                }
            },
            change (valueName) {
                // 给子组件调用的事件
                if (!this.disabled) {
                    this.setCurrentValue(valueName);
                    this.update(valueName);
                    this.$emit('input', this.currentValue);
                    this.dispatch('FormItem', 'on-form-change', this.currentValue);
                }
            }
        },
        watch: {
            value () {
                console.log('change');
                this.update();
            }
        }
    };
</script>
