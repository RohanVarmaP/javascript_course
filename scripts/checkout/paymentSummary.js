import { cart } from "../../data/cart.js";
import { matchProduct } from "../../data/products.js";
import { deliveryOptions, matchDeliveryOption } from "../../data/deliveryOptions.js";
import {formatCurrency} from '../utils/money.js'

export const renderPaymentSummary=()=>{
    let itemsInCart=0;
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.forEach(cartItem => {
        const product=matchProduct(cartItem.id);
        const deliveryOption=matchDeliveryOption(cartItem.deliveryOptionId)
        console.log(`product:
            price: ${product.priceCents}
            quantity: ${cartItem.quantity}`);
        productPriceCents+=product.priceCents*cartItem.quantity;
        itemsInCart+=cartItem.quantity;
        shippingPriceCents+=deliveryOption.priceCents;
    });
    console.log(productPriceCents);
    console.log(shippingPriceCents);
    const totalBeforeTax=productPriceCents+shippingPriceCents;
    console.log(totalBeforeTax);
    const taxCents=totalBeforeTax*0.1;
    console.log(taxCents);
    const totalCents=totalBeforeTax+taxCents;
    console.log(totalCents);
    document.querySelector('.js-payment-summary').innerHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${itemsInCart}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
}