import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { renderHeaderSummary } from './checkout/headerSummary.js';
import '../data/cart-oop.js';
renderHeaderSummary();
renderOrderSummary();
renderPaymentSummary();