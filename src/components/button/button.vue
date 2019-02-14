<template>
    <component :is="tagName" :class="classes" :disabled="disabled" @click="handleClickLink" v-bind="tagProps">
        <Icon class="ivu-load-loop" type="ios-loading" v-if="loading"></Icon>
        <Icon :type="icon" :custom="customIcon" v-if="(icon || customIcon) && !loading"></Icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </component>
</template>
<script>
    import Icon from '../icon';
    import { oneOf } from '../../utils/assist';
    import mixinsLink from '../../mixins/link';

    const prefixCls = 'ivu-btn';
    const prefixKagouCls = 'go-ripple';

    export default {
        name: 'Button',
        mixins: [ mixinsLink ],
        components: { Icon },
        props: {
            type: {
                validator(value) {
                    return oneOf(value, [ 'primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default', 'link', 'secondary' ]);
                },
                default: 'default'
            },
            shape: {
                validator (value) {
                    return oneOf(value, ['circle', 'circle-outline']);
                }
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
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
            icon: {
                type: String,
                default: ''
            },
            customIcon: {
                type: String,
                default: ''
            },
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
                    `${prefixCls}-${this.type}`,
                    {
                        [`${prefixCls}-${this.type}`]: !!this.type,
                        [`${prefixCls}-long`]: this.long,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-${this.size}`]: this.size !== 'default',
                        [`${prefixCls}-loading`]: this.loading != null && this.loading,
                        [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
                        [`${prefixCls}-ghost`]: this.ghost
                    }
                ];
            },
            rippleClass() {
                return [
                    `${prefixKagouCls}`
                ];
            },
            rippleItemClass() {
                return [
                    `${prefixKagouCls}__item`,
                    { 'animate': this.ripple_button.animate }
                ];
            },
            // Point out if it should render as <a> tag
            isHrefPattern() {
                const {to} = this;
                return !!to;
            },
            tagName() {
                const {isHrefPattern} = this;
                return isHrefPattern ? 'a' : 'button';
            },
            tagProps() {
                const {isHrefPattern} = this;
                if(isHrefPattern) {
                    const {linkUrl,target}=this;
                    return {href: linkUrl, target};
                } else {
                    const {htmlType} = this;
                    return {type: htmlType};
                }
            }
        },
        methods: {
            // Ctrl or CMD and click, open in new window when use `to`
            handleClickLink (event) {
                this.$emit('click', event);
                const openInNewWindow = event.ctrlKey || event.metaKey;

                this.handleCheckClick(event, openInNewWindow);
            },
            // 涟漪效果
            handlerRippleShow(e) {
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
