<template>
    <div :class="classes" :style="styles">
        <slot></slot>
    </div>
</template>
<script>
    import { oneOf, findComponentsDownward } from '../../utils/assist';

    const prefixCls = 'ivu-row';

    export default {
        name: 'Row',
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['flex']);
                }
            },
            align: {
                validator (value) {
                    return oneOf(value, ['top', 'middle', 'bottom']);
                }
            },
            justify: {
                validator (value) {
                    return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between']);
                }
            },
            gutter: {
                type: Number,
                default: 0
            },
            className: String,
            wrap: {
                validator (value) {
                    return oneOf(value, ['nowrap']);
                }
            }
        },
        computed: {
            classes () {
                return [
                    {
                        [`${prefixCls}`]: !this.type,
                        [`${prefixCls}-${this.type}`]: !!this.type,
                        [`${prefixCls}-${this.type}-${this.align}`]: !!this.align,
                        [`${prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
                        [`${this.className}`]: !!this.className,
                        [`${prefixCls}-${this.type}-${this.wrap}`]: this.wrap,
                    }
                ];
            },
            styles () {
                let style = {};
                if (this.gutter !== 0) {
                    style = {
                        marginLeft: this.gutter / -2 + 'px',
                        marginRight: this.gutter / -2 + 'px'
                    };
                }

                return style;
            }
        },
        methods: {
            updateGutter (val) {
//                const Cols = findComponentsDownward(this, 'iCol');
                // by FEN 只需要管理到自身的 children 就可以了
                const Cols = this.$children.map(child => child.$options.name === 'iCol' && child);
                if (Cols.length) {
                    Cols.forEach((child) => {
                        if (val !== 0) {
                            child.gutter = val;
                        }
                    });
                }
            }
        },
        watch: {
            gutter (val) {
                this.updateGutter(val);
            }
        }
    };
</script>
