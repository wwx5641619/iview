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
                <template v-if="showContent">
                    <slot v-if="!src"></slot>
                    <iframe :class="[prefixCls + '-iframe']" v-if="src" :src="src" frameborder="0" allowtransparency="true"></iframe>
                </template>
            </div>
            <div :class="[prefixCls + '-footer']" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
            <iSpin size="large" fix v-if="showSpin"></iSpin>
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
            viewLoading: {
                type: Boolean,
                default: null
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
            },
            src: {
                type: String,
                default: null
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
                showContent: false,
                showSpin: false
            };
        },
        computed: {
            maskClasses () {
                return `${prefixCls}-mask`;
            },
            classes () {
                return [`${prefixCls}`, {
                    [`${prefixCls}--actived`]: this.visible,
                    [`${prefixCls}--has-iframe`]: this.src
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
                    this.setVisible();
                    clearTimeout(this.timer);
                    this.showContent = false;
                    this.showSpin = false;
                    this.buttonLoading = false;
                    this.$emit('input', false);
                    this.$emit('on-close');
                    setTimeout(() => {
                        this.afterClose();
                    }, 400);
                };
                /**
                 * 对外部提供 beforeClose 接口
                 * 第一个参数用于继续关闭操作
                 * 第二财参数用于弹出是否关闭的确认窗口
                 */
                this.beforeClose(next, () => this.closeConfirm(next));
            },
            closeConfirm (ok) {
                this.$Modal.confirm({
                    title: this.t('i.sideView.confirm.title'),
                    content: `<p>${this.t('i.sideView.confirm.content')}</p>`,
                    okText: this.t('i.sideView.confirm.buttonLeave'),
                    cancelText: this.t('i.sideView.confirm.buttonStay'),
                    onOk: function () {
                        ok();
                    }
                });
            },
            show () {
                const next = () => {
                    this.setVisible();
                    this.showSpin = true;
                    this.timer = setTimeout(() => {
                        if (this.viewLoading === null) {
                            this.showSpin = false;
                            this.showContent = true;
                        }
                        this.afterVisible();
                        this.$nextTick(this.afterRender);
                    }, 300);
                };
                this.beforeVisible(next);
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
            /**
             * 设置组左右移动至显示或者隐藏，根据 this.visible 来判断
             */
            setVisible () {
                const _parent = this.parentSideView;
                const _w = window.innerWidth;
                if (this.visible) {
                    if (_parent && !_parent.frozen) {
                        _parent.setTranslate(0);
                        _parent.frozen = true;
                        document.removeEventListener('keydown', _parent.EscClose);
                    }
                    if (!this.frozen) {
                        const thisWidth = parseInt(this.width);
                        _w >= thisWidth ? this.setTranslate(_w - thisWidth) : this.setTranslate(0);
                    }
                } else {
                    if (_parent) {
                        const parentWith = parseInt(_parent.width);
                        _w >= parentWith ? _parent.setTranslate(_w - parentWith) : _parent.setTranslate(0);
                        _parent.frozen = false;
                        document.addEventListener('keydown', _parent.EscClose);
                    }
                    this.setTranslate(_w);
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
                    this.show();
                } else {
                    this.close();
                }

                this.broadcast('Table', 'on-visible-change', val);
                this.broadcast('Slider', 'on-visible-change', val);  // #2852
                this.$emit('on-visible-change', val);
            },
            loading (val) {
                if (!val) {
                    this.buttonLoading = false;
                }
            },
            viewLoading (val) {
                if (val || val === false) {
                    this.showSpin = val;
                    this.showContent = !val;
                    this.$emit('on-spin-change');
                }
            }
        }
    };
</script>
