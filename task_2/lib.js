function addValues(val1, val2) {
    if (typeof val1 === 'object') {
        if (Object.keys(val1).length === 0) {
            val1 = 0;
        } else {
            throw new Error('Addition is not possible.');
        }
    } 
    if (typeof val2 === 'object') {
        if (Object.keys(val2).length === 0) {
            val2 = 0;
        } else {
            throw new Error('Addition is not possible.');
        }
    }
    if (typeof val2 === 'string' &&
        (typeof val1 === 'number' || typeof val1 === 'boolean')) {
        val2 = Number(val2);
    }
    if (typeof val1 === 'string' &&
        (typeof val2 === 'number' || typeof val2 === 'boolean')) {
        val1 = Number(val1);
    }
    if (typeof val1 === 'symbol' || typeof val1 === 'undefined') {
        throw new Error('Addition is not possible.');
    }
    if (typeof val2 === 'symbol' || typeof val2 === 'undefined') {
        throw new Error('Addition is not possible.');
    }
    if (typeof val1 === 'boolean' && typeof val2 === 'boolean') {
        return val1 + val2 ? true : false;
    }
    if (typeof val1 === 'boolean' || typeof val2 === 'boolean') {
        throw new Error('Addition is not possible.');
    }
    return val1 + val2;
}

function stringifyValue(val) {
    switch (typeof val) {
        case 'object':
            return JSON.stringify(val);
        case 'symbol':
            return val.toString();
        default:
            return String(val);
    }
}

function invertBoolean(val) {
    if (typeof val === 'boolean') {
        return !val;
    }
    throw new Error('Conversion is not possible. Invalid input type.');
}

function convertToNumber(val) {
    switch (typeof val) {
        case 'string':
            return parseInt(val, 10);
        case 'boolean':
            return val ? 1 : 0;
        case 'number':
            return val;
        case 'object':
            if (Object.keys(val).length === 0) {
                return 0;
            }
        default:
            throw new Error('Conversion is not possible. Invalid input type');
    }
}

function coerceToType(value, type) {
    switch(type) {
        case 'string':
            return String(val);
        case 'number':
            convertToNumber(value);
        case 'boolean':
            if (typeof value === 'boolean') {
                return value;
            }
            if (typeof value === 'string') {
                return value.toLowerCase() === true;
            }
        default:
            throw new Error('Coercion is not possible. Invalid arguments');
    }
}

module.exports = {
    addValues,
    stringifyValue,
    invertBoolean,
    convertToNumber,
    coerceToType
};