<template>
    <div :class="classes" v-if="visible">
        <div class="panel__header clearfix" v-if="title || $slots.header">
            <slot name="header"></slot>
            <div class="panel__title" v-if="title">{{title}}</div>
            <div class="panel__fn" v-if="$slots.fn">
                <slot name="fn"></slot>
            </div>
        </div>
        <transition name="transition-drop"
        >
            <div class="panel__body" v-show="!hideBody">
                <slot></slot>
            </div>
        </transition>
        <div v-if="closable" class="panel__close" @click="handleClosePanel">
            <Icon type="ios-close"></Icon>
        </div>
        <div :class="panelIndexClass" v-if="indexNumber"><span class="panel__number">{{indexNumber}}</span></div>
    </div>
</template>


<script>
    const prefixCls = 'panel';
    export default {
        name: 'panel',
        data () {
            return {
                visible: true
            };
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            closable: {
                type: Boolean,
                default: false
            },
            shadow: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            },
            transparent: {
                type: Boolean,
                default: false
            },
            line: {
                type: Boolean,
                default: false
            },
            noHeaderBorder: {
                type: Boolean,
                default: false
            },
            gray: {
                type: Boolean,
                default: false
            },
            noPadding: {
                type: Boolean,
                default: false
            },
            noMargin: {
                type: Boolean,
                default: false
            },
            miniTitle: {
                type: Boolean,
                default: false
            },
            split: {
                type: Boolean,
                default: false
            },
            indexNumber: {
                type: Number,
                default: 0
            },
            closeBySelf: {
                type: Boolean,
                default: true
            },
            grayHeader: {
                type: Boolean,
                default: false
            },
            hideBody: {
                type: Boolean,
                default: false
            },
            actived: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            panelIndexClass () {
                return this.actived ? `${prefixCls}__index__actived` : `${prefixCls}__index`;
            },
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}--transparent`]: this.transparent,
                        [`${prefixCls}--no-header`]: !this.title || !this.$slots.header,
                        [`${prefixCls}--split`]: this.split,
                        [`${prefixCls}--no-header-bd`]: this.noHeaderBorder,
                        [`${prefixCls}--no-padding`]: this.noPadding,
                        [`${prefixCls}--no-margin`]: this.noMargin,
                        [`${prefixCls}--mini-title`]: this.miniTitle,
                        [`${prefixCls}--line`]: this.line,
                        [`${prefixCls}--gray`]: this.gray,
                        [`${prefixCls}--${this.size}`]: this.size,
                        [`${prefixCls}--shadow`]: this.shadow,
                        [`${prefixCls}--gray-header`]: this.grayHeader,
                        [`${prefixCls}--hide-body`]: this.hideBody,
                        [`${prefixCls}--actived`]: this.actived,
                    }
                ];
            }
        },
        methods: {
            handleClosePanel (e) {
                if (this.closeBySelf) this.visible = false;
                this.$emit('on-close', e);
            }
        }
    };

</script>
