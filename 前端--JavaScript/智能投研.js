let setArr = [
    {
        groupLabel: "",
        groupName: "",
        groupSeq: "0",
        groupType: "",
        hasInnerGroup: "0",
    },
    {
        groupLabel: "",
        groupName: "viewList",
        groupSeq: "1",
        groupType: "",
        hasInnerGroup: "1",
        blocks: [
            {
                blockTitle: "回顾",
                blockType: "",
                rows: [
                    {
                        feildName: "111",
                        feildLabel: "",
                        keyType: "WHOLE-VIEW",
                        initValue: "",
                        required: "",
                        enums: "",
                    },
                    {
                        feildName: "111",
                        feildLabel: "",
                        keyType: "inner-VIEW",
                        initValue: "",
                        required: "",
                        enums: "",
                    },
                    {
                        feildName: "111",
                        feildLabel: "",
                        keyType: "outter-VIEW",
                        initValue: "",
                        required: "",
                        enums: "",
                    },
                ],
            },
        ],
    },
    {
        groupLabel: "",
        groupName: "expectationList",
        groupSeq: "1",
        groupType: "",
        hasInnerGroup: "1",
        blocks: [
            {
                blockTitle: "回顾",
                blockType: "",
                rows: [
                    {
                        feildName: "111",
                        feildLabel: "",
                        keyType: "WHOLE-expectation",
                        initValue: "",
                        required: "",
                        enums: "",
                    },
                    {
                        feildName: "111",
                        feildLabel: "",
                        keyType: "inner-expectation",
                        initValue: "",
                        required: "",
                        enums: "",
                    },
                    {
                        feildName: "111",
                        feildLabel: "",
                        keyType: "outter-expectation",
                        initValue: "",
                        required: "",
                        enums: "",
                    },
                ],
            },
        ],
    },
];

let resultMap = {};
/**
 * 找到复杂数组的键值对；
 * @param {*} setArr 
 * @param {*} keyType 
 */
function findIndex(setArr, keyType) {
    for (const [index, element] of setArr.entries()) {
        for (const [indexKey, elementKey] of Object.keys(element).entries()) {
            if (Array.isArray(element[elementKey + ""])) {
                // 递归自己
                findIndex(element[elementKey + ""], keyType);
            } else {
                if ((elementKey + "")  === keyType) {
                    resultMap[element[elementKey]] = index;
                }
            }

        }
    }
}
findIndex(setArr, "keyType");
console.log(8888);

