import {formatCurrency} from '../scripts/utils/money.js';
console.log("Test Suite: formatCurrency");
console.log("converts cents into dollars");
console.log("works with 2095");
if (formatCurrency(2095)==='20.95'){
    console.log("test passed.");
}else{
    console.log('failed');
}
console.log("works with 0");
if (formatCurrency(0)==='0.00'){
    console.log("test passed.");
}else{
    console.log('failed');
}
console.log("rounding 2095 to 20.01");
if (formatCurrency(2000.5)==='20.01'){
    console.log("test passed.");
}else{
    console.log('failed');
}
console.log("rounding 2000.4 to 20.00");
if (formatCurrency(2000.4)==='20.00'){
    console.log("test passed.");
}else{
    console.log('failed');
}