<template>
    <div v-transfer-dom :data-transfer="transfer" :style="{zIndex:zIndex,position:'relative'}">
        <transition name="fade" v-if="noMask">
            <div :class="maskClasses" v-show="visible" @click="mask"></div>
        </transition>
        <div :class="classes" :style="[mainStyles, visibleStyles]" v-show="!hidden">
            <div :class="[prefixCls + '-header']">
                <slot name="header">
                    <a :class="[prefixCls + '-close']" @click="close">
                        <Icon type="ios-close-empty"></Icon>
                    </a>
                    <slot name="headerLeft">
                        <h2 :class="[prefixCls + '-title']">
                            {{ title }}
                        </h2>
                    </slot>
                    <div :class="[prefixCls + '-header-fn']" v-if="defaultActions || $slots.headerRight">
                        <slot name="headerRight">
                            <i-button type="primary" :loading="buttonLoading" @click.native="ok">
                                {{ localeOkText }}
                            </i-button>
                            <iDropDown class="ml8" trigger="click" v-if="moreMenu">
                                <i-button size="small" type="text" title="more">
                                    <Icon type="android-more-vertical" size="24"></Icon>
                                </i-button>
                                <iDropDownMenu slot="list">
                                    <iDropDownItem v-for="menu in moreMenu" @on-click="menu.handler" :key="menu.label">
                                        {{menu.label}}
                                    </iDropDownItem>
                                </iDropDownMenu>
                            </iDropDown>
                        </slot>
                    </div>
                </slot>
            </div>
            <div :class="[prefixCls + '-body']">
                <slot v-if="showContent"></slot>
                <iSpin size="large" fix v-if="!showContent"></iSpin>
            </div>
            <div :class="[prefixCls + '-footer']" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import iButton from '../button/button.vue';
    import iDropDown from '../dropdown';
    import iSpin from '../spin';
    import TransferDom from '../../directives/transfer-dom';
    import Locale from '../../mixins/locale';
    import Emitter from '../../mixins/emitter';
    import {findComponentUpward} from '../../utils/assist';

    const iDropDownMenu = iDropDown.Menu;
    const iDropDownItem = iDropDown.Item;

    const prefixCls = 'go-side-view';

    export default {
        name: 'SideView',
        mixins: [Locale, Emitter],
        components: {iButton, iDropDown, iDropDownMenu, iDropDownItem, iSpin},
        directives: {TransferDom},
        props: {
            value: {
                type: Boolean,
                default: false
            },
            maskClosable: {
                type: Boolean,
                default: true
            },
            noMask: {
                type: Boolean,
                default: true
            },
            title: {
                type: String
            },
            width: {
                type: [Number, String],
                default: 1200
            },
            top: {
                type: [Number, String],
                default: 0
            },
            okText: {
                type: String
            },
            cancelText: {
                type: String
            },
            loading: {
                type: Boolean,
                default: false
            },
            styles: {
                type: Object
            },
            className: {
                type: String
            },
            transfer: {
                type: Boolean,
                default: true
            },
            closable: {
                type: Boolean,
                default: true
            },
            moreMenu: {
                type: Array,
                default: null
            },
            beforeClose: {
                type: Function,
                default: function (next) {
                    next();
                }
            },
            afterClose: {
                type: Function,
                default: function () {
                }
            },
            beforeVisible: {
                type: Function,
                default: function (next) {
                    next();
                }
            },
            afterVisible: {
                type: Function,
                default: function () {
                }
            },
            afterRender: {
                type: Function,
                default: function () {
                }
            },
            defaultActions: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                buttonLoading: false,
                visible: this.value,
                visibleStyles: {},
                hidden: true,
                parentSideView: null,
                showContent: false
            };
        },
        computed: {
            maskClasses () {
                return `${prefixCls}-mask`;
            },
            classes () {
                return [`${prefixCls}`, {
                    [`${prefixCls}--actived`]: this.visible
                }];
            },
            zIndex () {
                if (this.parentSideView) {
                    return this.parentSideView.zIndex + 1;
                }
                return 900;
            },
            mainStyles () {

                const width = parseInt(this.width);
                const top = parseInt(this.top);
                const style = {
                    maxWidth: `${width}px`,
                    top: `${top}px`,
                };

                return style;
            },
            localeOkText () {
                if (this.okText === undefined) {
                    return this.t('i.modal.okText');
                } else {
                    return this.okText;
                }
            },
            localeCancelText () {
                if (this.cancelText === undefined) {
                    return this.t('i.modal.cancelText');
                } else {
                    return this.cancelText;
                }
            }
        },
        methods: {
            close () {
                const next = () => {
                    this.visible = false;
                    this.$emit('input', false);
                    this.$emit('on-close');
                    setTimeout(() => {
                        this.afterClose();
                    }, 400);
                };
                this.beforeClose(next);
            },
            mask () {
                if (this.maskClosable) {
                    this.close();
                }
            },
            cancel () {
                this.close();
            },
            ok () {
                if (this.loading) {
                    this.buttonLoading = true;
                } else {
                    this.close();
                    this.$emit('input', false);
                }
                this.$emit('on-ok');
            },
            EscClose (e) {
                if (this.visible && this.closable) {
                    if (e.keyCode === 27) {
                        this.close();
                    }
                }
            },
            /**
             * 设置组件的 translate style
             * @param type {string<x|y>}
             * @param distance {number|string}
             */
            setTranslate (distance, type = 'x') {
                if (type === 'x') {
                    this.visibleStyles = {transform: `translate(${distance}px,0)`};
                }
                if (type === 'y') {
                    this.visibleStyles = {transform: `translate(0,${distance}px)`};
                }
            },
            setVisible () {
                const _parent = this.parentSideView;
                if (this.visible) {
                    if (_parent && !_parent.frozen) {
                        _parent.setTranslate(0);
                        _parent.frozen = true;
                        document.removeEventListener('keydown', _parent.EscClose);
                    }
                    !this.frozen && this.setTranslate(window.innerWidth - parseInt(this.width));
                } else {
                    if (_parent) {
                        _parent.setTranslate(window.innerWidth - parseInt(_parent.width));
                        _parent.frozen = false;
                        document.addEventListener('keydown', _parent.EscClose);
                    }
                    this.setTranslate(window.innerWidth);
                }
            },
            resize () {
                this.setVisible();
            },
            setParent () {
                this.parentSideView = findComponentUpward(this, 'SideView');
            }
        },
        created () {
            this.setParent();
        },
        mounted () {
            this.setVisible();
            // ESC close
            this.hidden = false;
            document.addEventListener('keydown', this.EscClose);
            window.addEventListener('resize', this.resize);
        },
        beforeDestroy () {
            document.removeEventListener('keydown', this.EscClose);
            window.removeEventListener('resize', this.resize);
        },
        watch: {
            value (val) {
                this.visible = val;
            },
            visible (val) {

                if (val) {
                    const next = () => {
                        this.setVisible();
                        this.timer = setTimeout(() => {
                            this.showContent = true;
                            this.afterVisible();
                            this.$nextTick(this.afterRender);
                        }, 300);
                    };
                    this.beforeVisible(next);
                } else {
                    this.setVisible();
                    clearTimeout(this.timer);
                    this.showContent = false;
                    this.buttonLoading = false;
                }

                this.broadcast('Table', 'on-visible-change', val);
                this.broadcast('Slider', 'on-visible-change', val);  // #2852
                this.$emit('on-visible-change', val);
            },
            loading (val) {
                if (!val) {
                    this.buttonLoading = false;
                }
            }
        }
    };
</script>
