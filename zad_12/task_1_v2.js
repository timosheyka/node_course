const jsonString = '{"name": "John", "age": 30, "city": "New York", "bool": false, "nullValue" : null}';

function object() {
    const obj = {};
    const regexName = /\"\w+\"\s*:/g;
    let result = null;
    while ((result = regexName.exec(jsonString)) !== null) {
        const idx = regexName.lastIndex;
        const name = result[0].replace(/[^a-zA-Z]+/g, '');
        let val;

        const regexVal = /\"(.*?)\"|(\d+)|true|false|null/g;
        regexVal.lastIndex = idx;
        const matchVal = regexVal.exec(jsonString);
        
        if (matchVal) {
            if (matchVal[1] !== undefined) { val = matchVal[1]; }
            else {
                if (matchVal[2] !== undefined) { val = parseInt(matchVal[2]); }
                else { val = matchVal[0] === 'true' ? true : matchVal[0] === 'false' ? false : null; }
            }
        } else { throw new Error('Haven\'t found match'); }
        obj[name] = val;
        //console.log('idx:' + idx + ' name - ' + name + ': value - ' + val);
    }
    return obj;
}

const jsonStringArray = '["John", 30, "New York", true, null]';

function array() {
    const arr = [];
    const regexVal = /\"(.*?)\"|(\d+)|true|false|null/g;
    let result = null;
    while((result = regexVal.exec(jsonStringArray)) !== null) {
        if (result) {
            if (result[1]) val = result[1];
            else
                if (result[2]) val = parseInt(result[2])
                else { val = result[0] === 'true' ? true : result[0] === 'false' ? false : null; }
        } else { throw new Error('Haven\'t found match'); }
        arr.push(val);
    }
    return arr;
}

function distributor(str) {
    switch (str[0]) {
        case '{': return object();
        case '[': return array();
        default: throw new Error('First character is invalid');
    }
}

let result = distributor(jsonStringArray);
console.log('array', result);

result = distributor(jsonString);
console.log('object', result);
