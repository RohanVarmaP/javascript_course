import {formatCurrency} from '../../scripts/utils/money.js';
describe('test suite: formatCurrency',()=>{
    it('converts cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounding 2000.5 to 20.01',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
    it('rounding 2000.4 to 20.00',()=>{
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });
})