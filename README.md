# 改自 iView 组件，并新增一部分自身业务需求的组件
- 新增 Panel / Split / List / Editor 富文本编辑器 等组件
- 修复部分 bug 及实现逻辑使之更符合我们的业务
- 修改 locale 中的方法使之兼容最新的 vue-i18n 模块, [教程查看](http://www.jianshu.com/p/e226ca92f099)

# 组件调整说明
### datepick 
组件新增 timestamp 接口，默认是 true ，使组件采用时间戳的格式来绑定
``` javascript
// 原来的模式，返回的是 date 类型
<Date-picker :timestamp="false"></Date-picker>
```

### input-number
新增 showHandler, placeholder 属性，默认是 false， [false, true, 'hover]

@param false  始终不显示

@param true  始终显示

@param 'hover' 鼠标移上去显示

``` javascript
<InputNumber :min="0" placeholder="我是 placehover" :show-handler="true"/>
<InputNumber show-handler="hover" />
<InputNumber />
```


## Links

- [TalkingData](https://github.com/TalkingData)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)
- [Ionicons](https://github.com/driftyco/ionicons)
- [Ant Design](https://github.com/ant-design/ant-design)

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, iView
