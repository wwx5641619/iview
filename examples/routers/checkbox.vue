<template>
    <div>
        <Checkbox
            :indeterminate="true"
            :value="false"
            size="large">全选</Checkbox>
        <Checkbox
                :indeterminate="true"
                :value="false"
                size="default">全选</Checkbox>
        <Checkbox
                :indeterminate="true"
                :value="false"
                size="small">全选</Checkbox>
        <div>
            <Checkbox size="large" true-value="true" false-value="false" v-model="testValue1">Apple</Checkbox>
            <Checkbox true-value="true" false-value="false" v-model="testValue1" disabled>Apple</Checkbox>
            <Checkbox size="small" true-value="true" false-value="false" v-model="testValue1">Apple</Checkbox>
            {{ testValue1 }}
        </div>
        <div>
            <Checkbox :true-value="0" :false-value="1" v-model="testValue2">test number</Checkbox>
            {{ testValue2 }}
        </div>
        <Checkbox-group v-model="fruit" size="large">
            <Checkbox v-for="item in tags" :label="item.value" :key="item.label" true-value="String">{{item.label}}</Checkbox>
        </Checkbox-group>
        <div>{{ fruit }}</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                social: ['facebook', 'github'],
                fruit: [],
                tags: [],
                testValue1: null,
                testValue2: null
            };
        },
        mounted () {
            setTimeout(() => {
                this.tags = [
                    {
                        label: '香蕉',value:'1'
                    },
                    {
                        label: '苹果',value:'2'
                    },
                    {
                        label: '西瓜',value:'3'
                    }
                ];
            }, 1000);
        }
    };
</script>
