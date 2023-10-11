/**
 * Object  
    * start/end - {}
    * value - { "name": value }
    * separators - ,
 * Array
    * start/end - []
    * value - [ value ]
    * separators - ,
 * Value
    * object - (recursion)
    * array - (recursion)
    * string - "text" 
    * number - Number(value)
    * boolean - true/false
    * null - null
*/

function myJSONParse(JSONString) {

    function value(str, startIdx = 0) {
        const regexVal = /\"(.*?)\"|(-?\d+(\.\d*)?)|true|false|null/g;
        regexVal.lastIndex = startIdx;
        const matchVal = regexVal.exec(str);
        let val;
        if (matchVal) {
            if (matchVal[1] !== undefined) val = matchVal[1];
            else 
                if (matchVal[2] !== undefined) val = parseFloat(matchVal[2]);
                else val = matchVal[0] === 'true' ? true 
                        : matchVal[0] === 'false' ? false : null;
        } else {
            throw new Error('Haven\'t found match');
        }
        return {"val" : val, "endIdx" : regexVal.lastIndex };
    }

    function cutNesting(str, startIdx, endIdx, open, close) {
        let countBraces = 1;
        while (countBraces > 0 && endIdx < str.length) {
            if (str[endIdx] === open) countBraces++;
            if (str[endIdx] === close) countBraces--;
            endIdx++;
        }
        return {"nestedStr": str.slice(startIdx, endIdx), "endIdx": endIdx };
    }

    function array(str, startIdx = 1) {
        let arr = [];
        let idx = startIdx; let v;

        do {
            switch (str[idx]) {
                case '{':
                    const obj = object(str);
                    arr.push(obj.obj); idx = obj.endIdx;
                    break;
                case '[':
                    const a = array(str, idx + 1);
                    arr.push(a.arr); idx = a.idx;
                    break;
                default:
                    v = value(str, idx);
                    arr.push(v.val);
                    idx = v.endIdx + 1;
            }
        } while (idx !== str.length - 1);
        return { "arr": arr, "idx": idx };
    }    

    function object(str) {
        let obj = {};
        str = str.replace(/\s/g, '');
        const regexName = /\"(\w+)\"\s*:\s*/g;
        let result = null, endIdx;
        while ((result = regexName.exec(str))) {
            const startIdx = regexName.lastIndex;
            const name = result[1];
            let val;
            endIdx = startIdx + 1;
            switch (str[startIdx]) {
                case '{':
                    const objSlice = cutNesting(str, startIdx, endIdx, '{', '}');
                    val = object(objSlice.nestedStr).obj; endIdx = objSlice.endIdx;
                    break;
                case '[':
                    const arrSlice = cutNesting(str, startIdx, endIdx, '[', ']');
                    val = array(arrSlice.nestedStr).arr; endIdx = arrSlice.endIdx;
                    break;
                default:   
                    const v = value(str, startIdx);
                    val = v.val; endIdx = v.endIdx;      
            }
            obj[name] = val;
            regexName.lastIndex = endIdx;
        }
        return {"obj": obj, "endIdx": endIdx };
    }

    return object(JSONString).obj;
}

const testJSON = 
'{"first": [ "1", 2, true, null , null, { "fsecond": "fsecond" }, [1, 2] ], "second": { "fthird": "fthird", "fsecond": "fsecond" }, "third": "third", "null": null}';
console.log(myJSONParse(testJSON));
