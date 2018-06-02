<template>
    <button
        ref="button"
        :type="htmlType"
        :class="classes"
        :disabled="disabled"
        @click="handleClick">
        <Icon class="ivu-load-loop" type="load-c" v-if="loading"></Icon>
        <Icon :type="icon" v-if="icon && !loading"></Icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
        <div :class="rippleClass" v-show="rippleShow">
            <div :class="rippleItemClass"></div>
        </div>
    </button>
</template>
<script>
    import Icon from '../icon';
    import { oneOf } from '../../utils/assist';

    const prefixCls = 'ivu-btn';
    const prefixKagouCls = 'go-ripple';

    export default {
        name: 'Button',
        components: { Icon },
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default', 'link', 'secondary']);
                }
            },
            shape: {
                validator (value) {
                    return oneOf(value, ['circle', 'circle-outline']);
                }
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                }
            },
            loading: Boolean,
            disabled: Boolean,
            htmlType: {
                default: 'button',
                validator (value) {
                    return oneOf(value, ['button', 'submit', 'reset']);
                }
            },
            icon: String,
            long: {
                type: Boolean,
                default: false
            },
            ghost: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                showSlot: true,
                ripple_button: {
                    animate: false,
                    toggle: false
                },
                rippleShow: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.type}`]: !!this.type,
                        [`${prefixCls}-ghost`]: this.ghost,
                        [`${prefixCls}-long`]: this.long,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-loading`]: this.loading != null && this.loading,
                        [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading)
                    }
                ];
            },
            rippleClass () {
                return [
                    `${prefixKagouCls}`
                ];
            },
            rippleItemClass () {
                return [
                    `${prefixKagouCls}__item`,
                    {'animate': this.ripple_button.animate}
                ];
            }
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
                this.handlerRippleShow(event);
            },
            // 涟漪效果
            handlerRippleShow (e) {
                this.rippleShow = true;
                this.ripple_button.animate = true;
                let button = this.$refs.button;
                let ripple = button.querySelector(`.${prefixKagouCls}__item`);
                if (ripple) {
                    let d = Math.max(button.offsetHeight, button.offsetWidth);
                    let x = e.layerX - d / 2;
                    let y = e.layerY - d / 2;
                    ripple.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;');
                }
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.ripple_button.animate = false;
                        this.rippleShow = false;
                    }, 360);
                });
            }
        },
        mounted () {
            this.showSlot = this.$slots.default !== undefined;
        }
    };
</script>
