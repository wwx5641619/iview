<template>
    <div :class="classes">
        <TiledSelect v-if="hasAll" :value="allOptionName" selected>{{t('i.tiledSelect.all')}}</TiledSelect>
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
            hasAll: { // TODO 多选的逻辑还未完成
                type: Boolean,
                default: false
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
                allOptionName: 'all'
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}-group`,
                ];
            },
        },
        mounted () {
            this.update();
        },
        methods: {
            setChildren () {
                this.childrens = findComponentsDownward(this, 'TiledSelect');
                this.initChildrenProps(this.childrens);
                if (this.hasAll) {
                    this.childrens.splice(0, 1);
                }
            },
            initChildrenProps () {
                // 把父级的各种状态赋给 children
                this.childrens.forEach(child => {
                    if (this.selectType === 'multi') {
                        // All 选项不需要 multi 的样式
                        child.isMultiSelectable = true;
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
                    return !!val && val !== this.allOptionName;
                }
            },
            setAllState () {
//                All 选项的选中取消判断
                if (this.hasAll) {
                    const hasTrue = this.hasTrue(this.currentValue);
                    const allOption = this.$children[0];
                    if (hasTrue) {
                        allOption.isSelected = false;
                    } else {
                        allOption.isSelected = true;
                    }
                }
            },
            update (source) { // init 的时候不带 source
                this.$nextTick(() => {
                    this.setChildren();
                    this.initChildrenProps();
                    this.setChildrenSelect(source);
                    this.setAllState(source); // 只在初始化的时候去计算是否 All 选项需要选中
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
                this.update();
            }
        }
    };
</script>