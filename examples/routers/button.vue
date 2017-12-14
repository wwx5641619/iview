<template>
    <div>
        <Panel title="基本" shadow size="large">
            <Button type="primary">primary</Button>
            <Button>primary</Button>
            <Button type="warning">warning</Button>
            <Button type="success">success</Button>
            <Button type="error">error</Button>
            <Button type="info">info</Button>
            <Button ghost>ghost</Button>
            <Button type="text">text</Button>
            <Button type="link">link</Button>
            <Button type="link" size="small">link</Button>
            <Split large dashed/>
            <Button type="primary">add</Button>
            <Button type="primary">remove</Button>
            <Button type="primary">delete</Button>
            <Split large dashed/>
            <Button size="small" type="primary">add</Button>
            <Button size="small" type="primary">remove</Button>
            <Button size="small" type="primary">delete</Button>
            <Button size="small" type="link">delete</Button>
            <Split large dashed/>
            <Button size="large" type="primary">save</Button>
            <Button size="large" type="primary">add</Button>
            <Button size="large" type="primary">cancel</Button>
        </Panel>

        <Panel title="ghost" transparent shadow size="large">
            <Button type="primary" ghost>primary</Button>
            <Button ghost>primary</Button>
            <Button type="warning" ghost>warning</Button>
            <Button type="success" ghost>success</Button>
            <Button type="error" ghost>error</Button>
            <Button type="info" ghost>info</Button>
        </Panel>
        <Panel shadow size="large">
            <Button-group>
                <Button>取消</Button>
                <Button type="primary">确定</Button>
            </Button-group>
            <Button-group>
                <Button disabled>昨日</Button>
                <Button disabled>今日</Button>
                <Button disabled>明日</Button>
            </Button-group>
            <Button-group>
                <Button type="primary">L</Button>
                <Button>M</Button>
                <Button type="ghost">M</Button>
                <Button type="dashed">R</Button>
            </Button-group>
            <br><br>
            <h4>配合图标</h4>
            <br><br>
            <Button-group>
                <Button type="primary">
                    <Icon type="chevron-left"></Icon>
                    前进
                </Button>
                <Button type="primary">
                    后退
                    <Icon type="chevron-right"></Icon>
                </Button>
            </Button-group>
            <Button-group>
                <Button type="primary" icon="ios-skipbackward"></Button>
                <Button type="primary" icon="ios-skipforward"></Button>
            </Button-group>
            <Button-group>
                <Button type="ghost" icon="ios-color-wand-outline"></Button>
                <Button type="ghost" icon="ios-sunny-outline"></Button>
                <Button type="ghost" icon="ios-crop"></Button>
                <Button type="ghost" icon="ios-color-filter-outline"></Button>
            </Button-group>
            <br><br>
            <h4>圆角</h4>
            <br><br>
            <Button-group shape="circle">
                <Button type="primary">
                    <Icon type="chevron-left"></Icon>
                    前进
                </Button>
                <Button type="primary">
                    后退
                    <Icon type="chevron-right"></Icon>
                </Button>
            </Button-group>
            <Button-group shape="circle">
                <Button type="primary" icon="ios-skipbackward"></Button>
                <Button type="primary" icon="ios-skipforward"></Button>
            </Button-group>
            <Button-group shape="circle">
                <Button type="ghost" icon="ios-color-wand-outline"></Button>
                <Button type="ghost" icon="ios-sunny-outline"></Button>
                <Button type="ghost" icon="ios-crop"></Button>
                <Button type="ghost" icon="ios-color-filter-outline"></Button>
            </Button-group>
            <br><br>
            <h4>尺寸</h4>
            <br><br>
            <Button-group size="large">
                <Button type="ghost">Large</Button>
                <Button type="ghost">Large</Button>
            </Button-group>
            <Button-group>
                <Button type="ghost">Default</Button>
                <Button type="ghost">Default</Button>
            </Button-group>
            <Button-group size="small">
                <Button type="ghost">Small</Button>
                <Button type="ghost">Small</Button>
            </Button-group>
            <br><br>
            <Button-group size="large" shape="circle">
                <Button type="ghost">Large</Button>
                <Button type="ghost">Large</Button>
            </Button-group>
            <Button-group shape="circle">
                <Button type="ghost">Default</Button>
                <Button type="ghost">Default</Button>
            </Button-group>
            <Button-group size="small" shape="circle">
                <Button type="ghost">Small</Button>
                <Button type="ghost">Small</Button>
            </Button-group>
        </Panel>
    </div>
</template>
<script>
    export default {

    }
</script>
