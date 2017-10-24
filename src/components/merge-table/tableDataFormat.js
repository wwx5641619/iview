const compileData = function (data, format = '') {
    // 行合并的具体思路为, 先设置每个key下对应的有多少个 children length 的叠加，然后这是 rowSpan 值
    // 再把每个
    const fromData = data || [];

    function normalizeData (data) {
        const ret = [];
        let obj = {};
        const getObj = data => {
            const arr = Array.isArray(data) ? data : [data];
            arr.forEach(item => {
                for (let key in item) {
                    if (key === 'children') {
                        getObj(item[key], obj);
                    } else if (key !== 'rowSpan') {
                        obj[key] = {
                            content: item[key],
                            rowSpan: item.rowSpan ? item.rowSpan : 0
                        };
                    }
                }
                if (!item.children) {
                    ret.push(obj);
                    obj = {};
                }
            });
        };

        getObj(data);
        return ret;
    }

    // 获取当前 children 下会有多少行
    function getRowSpan (obj) {
        let len = 0;

        function getChildrenLength (obj) {
            if (obj.children) {
                const l = obj.children.length;
                len += l - 1;
                obj.children.forEach(item => {
                    getChildrenLength(item);
                });
            }
        }

        getChildrenLength(obj);

        return len + 1;
    }

    function setRowSpan (arr) {
        arr.forEach(item => {
            item.rowSpan = getRowSpan(item);
            if (item.children) {
                setRowSpan(item.children);
            }
        });
    }

    function parserData (arr) {
        const ret = [];
        arr.forEach(item => {
            ret.push({row: normalizeData(item)});
        });
        return ret;
    }

    setRowSpan(fromData);
    if (format === 'multi') {
        return parserData(fromData);
    }
    return normalizeData(fromData);
};

/**
 * 处理table的数据，用于表格的合并展示
 * @param [Array] data
 * @param [String] 'multi' 输出给多个 table 循环用
 */
export default compileData;

