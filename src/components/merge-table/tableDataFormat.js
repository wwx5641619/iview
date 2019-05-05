const compileData = function (fromData = [], format = '') {
    // 行合并的具体思路为：
    // 把每个数据分成 content 和  rowSpan 两个key，rowSpan是多少个 children length 的叠加
    // const fromData = data;

    function normalizeData(data, rowIndex) {
        const ret = [];
        let obj = {};
        const getObj = data => {
            const arr = Array.isArray(data) ? data : [ data ];
            arr.forEach((item, index, parent) => {
                for (let key in item) {
                    if (key === 'children') {
                        getObj(item[ key ], obj);
                    } else if (key !== 'rowSpan') {
                        obj[ key ] = {
                            content: item[ key ],
                            rowSpan: item.rowSpan ? item.rowSpan : 0,
                            index: index,
                            parent: parent
                        };
                        obj.rowIndex = rowIndex;
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
    function getRowSpan(obj) {
        let len = 0;

        function getChildrenLength(obj) {
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

    function setRowSpan(arr) {
        arr.forEach(item => {
            item.rowSpan = getRowSpan(item);
            if (item.children) {
                setRowSpan(item.children);
            }
        });
    }

    function parserData(arr) {
        const ret = [];
        arr.forEach((item, index) => {
            ret.push({
                row: normalizeData(item, index)
            });
        });
        return ret;
    }

    setRowSpan(fromData);
    // 整个 table 循环的数据
    const multiData = parserData(fromData);
    if (format === 'multi') {
        return multiData;
    }
    // 单个 table tr 循环的数据
    const getSingleData = data => {
        const ret = [];
        data.forEach(item => {
            item.row.forEach(item => {
                ret.push(item);
            });
        });
        return ret;
    };
    const singleData = getSingleData(multiData);

    return singleData;
};


/**
 * 处理table的数据，用于表格的合并展示
 * @param [Array] data
 * @param [String] 'multi' 输出给多个 table 循环用
 */
export default compileData;

