// https://github.com/ElemeFE/element/blob/dev/src/locale/index.js

import defaultLang from './lang/zh-CN';
import Vue from 'vue';
import deepmerge from 'deepmerge';
import Format from './format';

const format = Format(Vue);
let lang = defaultLang;
// let merged = false;
let i18nHandler = function() {
    const vuei18n = Object.getPrototypeOf(this || Vue).$t;
    if (typeof vuei18n === 'function') {
        // by FEN 为了兼容最新的 vue-i18n
        // if (!merged) {
        //     merged = true;
        //     Vue.locale(
        //         Vue.config.lang,
        //         deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
        //     );
        // }
        return vuei18n.apply(this, arguments);
    }
};

export const t = function(path, options) {
    let value = i18nHandler.apply(this, arguments);
    if (value !== null && value !== undefined) return value;

    const array = path.split('.');
    // by FEN 为了兼容最新的 vue-i18n , 语言设置有原先的 local 调整为直接设置在 Vue.config.lang 中
    let current = Vue.config.lang || lang;

    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (i === j - 1) return format(value, options);
        if (!value) return '';
        current = value;
    }
    return '';
};

export const use = function(l) {
    lang = l || lang;
};

export const i18n = function(fn) {
    i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };