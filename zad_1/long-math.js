// Author : Tsimafei Lukashevich

String.prototype.plus = function (num) {
    let result = '';
    let carry = 0;
    let maxLength = Math.max(this.length, num.length);

    let thisPadded = this.padStart(maxLength, '0');
    let numPadded = num.padStart(maxLength, '0');

    for (let i = 0; i < maxLength; i++) {
        let digit1 = parseInt(thisPadded[thisPadded.length - 1 - i] || 0, 10);
        let digit2 = parseInt(numPadded[numPadded.length - 1 - i] || 0, 10);
        let sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10);
        result = (sum % 10) + result;
    }

    while (carry > 0) {
        result = (carry % 10) + result;
        carry = Math.floor(carry / 10);
    }

    return result;
};

String.prototype.minus = function (num) {
    if (this == num) {
        return '0';
    }

    let result = '';
    let borrow = 0;
    let maxLength = Math.max(this.length, num.length);
    let isNegative = false;

    if (this.length < num.length || (this.length === num.length && this < num)) {
        isNegative = true;
    }

    let thisPadded = this.padStart(maxLength, '0');
    let numPadded = num.padStart(maxLength, '0');

    for (let i = 0; i < maxLength; i++) {
        let digit1 = parseInt(thisPadded[thisPadded.length - 1 - i], 10);
        let digit2 = parseInt(numPadded[numPadded.length - 1 - i], 10);
        let diff = digit1 - digit2 - borrow;

        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }

        result = diff + result;
    }

    return isNegative ?
        '-' + (Math.pow(10, maxLength).toLocaleString('fullwide', { useGrouping: false }).minus(result.replace(/^0+/, '')))
        : result.replace(/^0+/, '');
};

String.prototype.multiply = function (num) {
    if (this == '0' || num == '0') {
        return '0';
    }

    let thisLength = this.length - 1;
    let numLength = num.length - 1;
    let carry = 0;
    let result = '';

    for (let i = 0; i <= thisLength + numLength; i++) {
        for (let j = Math.max(0, i - numLength); j <= Math.min(i, thisLength); j++) {
            carry += (this[thisLength - j].charCodeAt(0) - 48) * (num[numLength - i + j].charCodeAt(0) - 48);
        }
        result = (carry % 10) + result;
        carry = Math.floor(carry / 10);
    }

    return carry > 0 ? carry + result : result;
};

String.prototype.divide = function (num) {
    if (num === '0') {
        return 'Division by zero is not allowed';
    }
    if (parseInt(this, 10) === 0) {
        return '0';
    }

    let result = '';
    let remainder = '';

    for (let idx = 0; idx < this.length; idx++) {
        let digit = parseInt(remainder + this[idx], 10);

        if (digit < num) {
            result += '0';
        } else {
            let count = 0;
            while (digit >= num) {
                digit -= num;
                count++;
            }
            result += count;
        }

        remainder = digit;
    }

    return result.replace(/^0+/, '');
};

console.log('TEST PLUS FUNCTION');
console.log('123123123123123123123123123'.plus('123123123123123123123123123'));
// expected result : 246246246246246246246246246
console.log('789789789789789789789789789'.plus('789789789789789789789789789'));
// expected result : 1579579579579579579579579578

console.log('TEST MINUS FUNCTION');
const num1 = '10000000000000000000000000000000000000000000000000000000000000000';
const num2 = '9999999999999999999999999999999999999999999999999999999999999999';
console.log(num1.minus(num2)); // expected result : 1
const num3 = '3000000000000000000000000000000';
const num4 = '3000000000000000000000000000001';
console.log(num3.minus(num4)); // expected result : -1
const num5 = '123123123123123123123123123123123';
const num6 = '123123123123123123123123123123123';
console.log(num5.minus(num6)); // expected result : 0

console.log('TEST MULTIPLY FUNCTION');
console.log('0'.multiply('111111111111111111111111111111111111'));
// expected result : 0
console.log('123456789012345678901234567890'.multiply('987654321098765432109876543210'));
// expected result : 121932631137021795226185032733622923332237463801111263526900
console.log('111111111111111111111111111111111111'.multiply('111111111111111111111111111111111111'));
// expected result : 12345679012345679012345679012345678987654320987654320987654320987654321

console.log('TEST DIVIDE FUNCTION');
console.log('0'.divide('202222')); // expected output: '0'
console.log('500910'.divide('0')); // expected output: 'not allowed'
console.log('123456789'.divide('93')); // expected output: '1327492'
console.log('100000000000000000000000'.divide('1000000000000000000000')); // expected output: '100'