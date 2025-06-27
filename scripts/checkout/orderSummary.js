import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products, matchProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, matchDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderHeaderSummary } from './headerSummary.js';

export const renderOrderSummary=()=>{
  const deliveryOptionsHtml=(product,cartItem)=>{
    let html='';
    deliveryOptions.forEach(deliveryOption=>{
      const today=dayjs();
      const dateOption=today.add(deliveryOption.deliveryDays,'days');
      const dateString=dateOption.format('dddd, MMMM, D');
      const priceString= deliveryOption.priceCents===0 ? 'FREE':`$${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked=deliveryOption.id===cartItem.deliveryOptionId;
      console.log(`productname: ${product.name}, 
        deliveryidfromcart: ${cartItem.deliveryOptionId}, 
        deliveryOption.id: ${deliveryOption.id}, 
        so is checked is ${isChecked}`);
      html+=`
                      <div class="delivery-option js-delivery-option" data-product-id="${product.id}" data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio" ${isChecked? 'Checked' : ''} class="delivery-option-input" name="delivery-option-${product.id}">
                        <div>
                          <div class="delivery-option-date">
                            ${dateString}
                          </div>
                          <div class="delivery-option-price">
                            ${priceString} Shipping
                          </div>
                        </div>
                      </div>
      `;
    })
    return html;
  }

  const ordersummaryDivElement=document.querySelector('.js-order-summary');
  ordersummaryDivElement.innerHTML='';
  cart.forEach(cartItem=>{
      const product=matchProduct(cartItem.id);
      const deliveryOption=matchDeliveryOption(cartItem.deliveryOptionId);
      console.log(deliveryOption);
      const today=dayjs();
      const dateOption=today.add(deliveryOption.deliveryDays,'days');
      const dateString=dateOption.format('dddd, MMMM, D');
      ordersummaryDivElement.innerHTML+=`<div class="cart-item-container js-cart-item-container js-cart-container-${product.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image" src="${product.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                  </div>
                  <div class="product-quantity js-product-quantity-${product.id}">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link js-delete-quantity-link-${product.id} link-primary js-delete-link" data-product-id="${product.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHtml(product,cartItem)}
                  </div>
                </div>
              </div>
            </div>`;
  })
  document.querySelectorAll('.js-delete-link').forEach(spanElement=>{
      spanElement.addEventListener('click',()=>{
          console.log(spanElement.dataset.productId);
          removeFromCart(spanElement.dataset.productId);
          console.log(cart);
          renderOrderSummary();
          renderPaymentSummary();
          renderHeaderSummary();
      })
  })

  document.querySelectorAll('.js-delivery-option').forEach(radioElement=>{
    radioElement.addEventListener('click',()=>{
      updateDeliveryOption(radioElement.dataset.productId,Number(radioElement.dataset.deliveryOptionId));
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}