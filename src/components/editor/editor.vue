<template>
    <div ref="container" :style="{height:`${height}px`}"></div>
</template>

<script>
    //    const Editor = require('wangeditor')
    //    import Editor from 'wangeditor';
    import Quill from 'quill';
//    import 'quill/dist/quill.core.css';
//    import 'quill/dist/quill.snow.css';

    export default {
        name: 'Editor',
        props: {
            value: String,
            placeholder: String,
            disabled: {
                type: Boolean,
                default: false
            },
            height: {
                type: [String, Number],
                default: 300
            },
            toolbar: {
                type: Array,
                default: function () {
                    return [
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
//                    [{'font': []}],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{'color': []}, {'background': []}],
//                    [{'header': 1}, {'header': 2}],
//                    ['blockquote'],
//                    [{'script': 'sub'}, {'script': 'super'}],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
//                    [{'direction': 'rtl'}],
                        [{'indent': '-1'}, {'indent': '+1'}],

//                    [{'size': ['small', false, 'large', 'huge']}],
                        [{'align': []}],
                        ['clean'],
                        ['link', 'image']
                    ];
                }
            },
        },
        mounted () {
            this.init();
            this.handleUpdatedEditor();
        },
        methods: {
            init () {
                this.setEditor();
                this.setQuill();
            },
            setQuill () {
                this.quill = new Quill(this.editorElement, {
                    modules: {
                        toolbar: this.toolbar
                    },
                    placeholder: this.placeholder || '',
                    theme: 'snow',
                    readOnly: this.disabled ? this.disabled : false,
                });
            },
            setEditor () {
                this.editorElement = this.$refs.container;
                this.$nextTick(() => {
                    this.contentElement = this.editorElement.getElementsByClassName('ql-editor')[0];
                    this.contentElement.innerHTML = this.value;
                });
            },
            handleUpdatedEditor () {
                this.quill.on('text-change', () => {
                    this.$emit('input', this.contentElement.innerHTML);
                });
            },
        },
        watch: {
            value (val) {
                if (val != this.contentElement.innerHTML && !this.quill.hasFocus()) {
                    this.contentElement.innerHTML = val;
                }
            },
            disabled (status) {
                this.quill.enable(!status);
            }
        },
    };
</script>
