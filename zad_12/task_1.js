function myJSONParse(jsonString) {
    let idx = 0;
    let result = null;
    
    function whitespaces() {
        while (idx < jsonString.length && /\s/.test(jsonString[idx])) idx++;
    }

    function keywords(length) {
        const substring = jsonString.substring(idx, idx + length);
        if (substring.includes(
            length === 4 
            ? (jsonString[idx] === 't' ? 'true' : 'null') 
            : 'false'
        )) return substring;
        else return new Error('Wrong keyword');
    }

    function number() {
        let num = '';
        while (![',', ']', '}'].includes(jsonString[idx]))
            num = num.concat(jsonString[idx++]);
        return Number(num);
    }

    function string() {
        let name = '';
        while(jsonString[++idx] !== '\"') name = name.concat(jsonString[idx]);
        idx++;
        return name;
    }

    function value() {
        switch (jsonString[idx]) {
            case '\"':
                return string();
            case 't':
            case 'n':
                return keywords(4);
            case 'f':
                return keywords(5);
            default:
                return /\d/.test(jsonString[idx]) ? number() : evaluate();    
        }
    }

    function object() {
        let obj = {};
        while (jsonString[idx] !== '}') {
            whitespaces();
            switch(jsonString[idx]) {
                case "\"":
                    const name = string();
                    whitespaces();
                    if (jsonString[idx] !== ':') return new Error('Wrong value definition');
                    idx++;
                    whitespaces();
                    obj[name] = value();
                    break;
                case ',':
                    idx++;
                    whitespaces();
                    if (jsonString[idx] != '\"') return new Error('Wrong value definition');
                    break;    
                default:
                    return new Error('Wrong object wrapping');
            }
        }
        idx++;
        return obj;
    }

    function array() {
        let arr = [];   
        whitespaces();
        arr.push(value());

        while (jsonString[idx] !== ']') {
            whitespaces();
            if (jsonString[idx] === ',') {
                idx++;
                whitespaces();
                arr.push(value());
            } else {
                return 'Wrong array wrapping';
            }
        }
        idx++;
        return arr;
    }

    function evaluate() {
        switch (jsonString[idx++]) {
            case '{': return object();
            case '[': return array();
            default: return new Error('First character is invalid');
        }
    }

    whitespaces();
    result = evaluate();
    whitespaces();
    //console.log(idx, jsonString.length);
    return idx !== jsonString.length 
        ? 'Extra characters in tail of a string' 
        : result;
}
  
const jsonString = '{"name": "John", "age": 30, "city": "New York", "nestObj" : {"name" : "Tom", "age" : 19}, "arr": [13, "four", 4]}';
const object = JSON.parse(jsonString);
const myobject = myJSONParse(jsonString);
console.log(myobject);
console.log(
    JSON.stringify(object) === JSON.stringify(myobject)
        ? 'matches original JSONParse'
        : 'Doesn\'t match original JSONParse'
); 

/**
 * Object  
    * start/end - {}
    * value - "name": value
    * separators - ,
 * Array
    * start/end - []
    * value - value
    * separators - ,
 * Value
    * object - (recursion)
    * array - (recursion)
    * string - "text" 
    * number - Number(value)
    * boolean - true/false
    * null - null
*/