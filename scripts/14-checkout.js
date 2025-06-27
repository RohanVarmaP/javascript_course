import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { renderHeaderSummary } from './checkout/headerSummary.js';
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
loadProducts(()=>{
    renderHeaderSummary();
    renderOrderSummary();
    renderPaymentSummary();
});
