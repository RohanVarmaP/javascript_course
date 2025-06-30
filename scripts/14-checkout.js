import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { renderHeaderSummary } from './checkout/headerSummary.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        console.log('start promise');
        loadCart(()=>{
            resolve('cart loading completed');
        });
    }),
]).then((value)=>{
    console.log(value);
    console.log('second then');
    console.log('rendering page');
    renderHeaderSummary();
    renderOrderSummary();
    renderPaymentSummary();
});


/*
new Promise((resolve)=>{
    console.log('start promise');
    loadProducts(()=>{
        resolve('products loading completed');
    });
}).then((value)=>{
    console.log(value);
    console.log('first then');
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve('cart loading complated');
        });
    });
}).then((value)=>{
    console.log(value);
    console.log('second then');
    console.log('rendering page');
    renderHeaderSummary();
    renderOrderSummary();
    renderPaymentSummary();
    console.log('completed rendering page');
});
console.log('starting project');

*/

/*
loadProducts(()=>{
    loadCart(()=>{
        renderHeaderSummary();
        renderOrderSummary();
        renderPaymentSummary();
    });
});
console.log("completed rendering");
*/