/**
 * myJSONParse
    * whitespaces - skips odd whitespaces from jsonString
    * keywords - detects special keywords
    * number - converts found substring to number
    * string - converts found substring to string value
    * value - converts found substring to value
    * object/array - wrapper function
    * evaluate - identifier for object/array
 */

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

function myJSONParse(jsonString) {
    let idx = 0;
    let result = null;
    
    function whitespaces() {
        while (idx < jsonString.length && /\s/.test(jsonString[idx])) idx++;
    }

    function keywords(length) {
        const keywordMap = { 4: { 'true': true, 'null': null }, 5: { 'false': false } };
        const keyword = jsonString.substring(idx, idx + length);
        if (keywordMap[length] && keywordMap[length][keyword]) return keyword; 
        else throw new Error('Wrong keyword');
    }

    function number() {
        const matchedNumber = jsonString.substring(idx)
            .match(/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);
        
        if (matchedNumber) {
            idx += matchedNumber[0].length;
            return Number(matchedNumber[0]);
        } else {
            throw new Error('Invalid number format');
        }
    }

    function string() {
        let name = '';
        while(!/\"/.test(jsonString[++idx])) name = name.concat(jsonString[idx]);
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

        while (!/\}/.test(jsonString[idx])) {
            whitespaces();
            switch(jsonString[idx]) {
                case "\"":
                    const name = string();
                    whitespaces();
                    if (!/:/.test(jsonString[idx++])) throw new Error('Wrong value definition');
                    whitespaces();
                    obj[name] = value();
                    break;
                case ',':
                    idx++;
                    whitespaces();
                    if (!/\"/.test(jsonString[idx])) throw new Error('Wrong value definition');
                    break;    
                default:
                    throw new Error('Wrong object wrapping');
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
            if (/,/.test(jsonString[idx++])) { whitespaces(); arr.push(value()); } 
            else { throw 'Wrong array wrapping'; }
        }
        idx++;
        return arr;
    }

    function evaluate() {
        switch (jsonString[idx++]) {
            case '{': return object();
            case '[': return array();
            default: throw new Error('First character is invalid');
        }
    }

    whitespaces(); result = evaluate(); whitespaces();
    return idx !== jsonString.length ? 'Extra characters in tail of a string' : result;
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

/** Review on using regex
 * can be avoided by iterating over the string character by character
 * becomes to complex to use regex for nested elements
 * can be very usefull on identifying some 'tiny' patterns (e.g ctrl+F in docs)
 * that task didn't unlock full potential of regex
*/