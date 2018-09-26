<template>
    <div :class="classes" :style="styles"></div>
</template>

<script>
    const prefixCls = 'go-hr';
    const size = {
        small: 4,
        default: 8,
        big: 16,
        large: 24
    };

    const getType = function (props) {
        const types = ['small', 'big', 'large'];
        let type = 'default';
        types.forEach(item => {
            if (props[item] === true) {
                type = item;
            }
        });
        return type;
    };

    const getNumber = function (props) {
        const isLoss = props.loss;
        const margin = size[getType(props)];
        return isLoss ? -margin : margin;
    };

    export default {
        name: 'KSplit',
        props: {
            small: {
                type: Boolean,
                default: false
            },
            large: {
                type: Boolean,
                default: false
            },
            big: {
                type: Boolean,
                default: false
            },
            dashed: {
                type: Boolean,
                default: false
            },
            transparent: {
                type: Boolean,
                default: false
            },
            vertical: {
                type: Boolean,
                default: false
            },
            loss: {
                type: Boolean,
                default: false
            }
        },
        created () {
            getNumber(this._props);
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}--dashed`]: this.dashed,
                        [`${prefixCls}--transparent`]: this.transparent,
                        [`${prefixCls}--vertical`]: this.vertical,
                    }
                ];
            },
            styles () {
                return {
                    margin: this.vertical ? `auto ${getNumber(this._props)}px` : `${getNumber(this._props)}px auto`
                };
            }
        }
    };

</script>
