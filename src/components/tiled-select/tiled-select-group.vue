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
                type: Object,
                default: function () {
                    return {};
                }
            },
            hasAll: { // 是否需要全选
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
                currentValue: {}, // 实际需要提交的数据
                viewValue: {}, // 用于子组件状态显示的数据
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
            this.init();
        },
        methods: {
            init () {
                const val = {};
                this.childrens = findComponentsDownward(this, 'TiledSelect');
                this.initChildrenProps(this.childrens);
                if (this.hasAll) {
                    this.childrens.splice(0, 1);
                }
                this.childrens.forEach(child => {
                    val[child.value] = this.value[child.value] || child.selected;
                });
                this.viewValue = val;

                if (this.hasAll && !this.hasTrue(val)) {
                    const curVal = deepCopy(val);
                    for (let key in curVal) {
                        curVal[key] = true;
                    }
                    this.currentValue = curVal;
                } else {
                    this.currentValue = deepCopy(val);
                }
                this.update('init');
            },
            initChildrenProps (childrens) {
                // 把父级的各种状态赋给 children
                childrens.forEach((child, index) => {
                    if (this.selectType === 'multi') {
                        // All 选项不需要 multi 的样式
                        if (this.hasAll && index) child.isMultiSelectable = true;
                    }
                    child.isGrouped = true;
                    child.isDisabled = this.disabled;
                    child.currentType = this.type;
                    child.currentSize = this.size;
                });
            },
            hasTrue (obj) {
//                对象中是否有 true 的字段
                const ret = [];
                for (let item in obj) {
                    ret.push(obj[item]);
                }
                return ret.some(item => item);
            },
            setAllState () {
//                All 选项的选中取消判断
                if (this.hasAll) {
                    const hasTrue = this.hasTrue(this.viewValue);
                    const allOption = this.$children[0];
                    if (hasTrue) {
                        allOption.isSelected = false;
                    } else {
                        allOption.isSelected = true;
                    }
                }
            },
            update (source) { // init 的时候不带 source
                const viewVal = this.viewValue;
                const curVal = this.currentValue;
                source === 'init' && this.setAllState(); // 只在初始化的时候去计算是否 All 选项需要选中

                if (source && source !== 'init') {// 有 source 的说明都是从子组件触发的
                    if (source !== this.allOptionName) {

                        // 单选的时候需要把其他的选项设为 false
                        if (this.selectType === 'single') {
                            for (let source in viewVal) {
                                viewVal[source] = false;
                            }
                        }

                        viewVal[source] = !viewVal[source];

                        if (this.hasAll) {
                            const all = this.$children[0];
                            all.isSelected = false;
                        }
                    }

                    // 选择全部的时候把其他数据都设为 true
                    if (this.hasAll && source === this.allOptionName) {
                        const all = this.$children[0];
                        for (let source in curVal) {
                            curVal[source] = true;
                            viewVal[source] = false;
                        }

//                        当本来就是选中状态的时候，防止再次提交 on-change 事件
                        if (all.isSelected) {
                            return;
                        }

                        all.isSelected = true;
                    }

                    this.$emit('on-change', curVal);
                }

                this.setChildrenSelect(source);
                this.$emit('input', this.currentValue);

            },
            setChildrenSelect (source) {
                // 设置 children 的选中状态
                this.childrens.forEach(child => {
                    child.isSelected = this.viewValue[child.value];
                    if (source !== 'init' && source !== this.allOptionName) {
                        this.currentValue[child.value] = this.viewValue[child.value];
                    }
                });
            },
            change (valueName) {
                // 给子组件调用的事件
                if (!this.disabled) {
                    this.update(valueName);
                    this.dispatch('FormItem', 'on-form-change', this.currentValue);
                }
            }
        },
//        watch: {
//            value: {
//                handler () {
//                    console.log(11111);
//                    this.update('init');
////                    this.$emit('on-change', this.currentValue);
//                },
//                deep: true
//            }
//        }
    };
</script>

<style lang="less">
    @import "../../styles/custom";
</style>