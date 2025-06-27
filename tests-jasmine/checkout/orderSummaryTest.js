import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage,cart } from '../../data/cart.js';

describe('Test Suite: renderOrderSummary',()=>{
    const productId1='54e0eccd-8f36-462b-b68a-8182611d9add';
    const productId2="83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
    const productId3="15b6fc6f-327a-4ec4-896f-486349e85a3d";
    const productId4="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId5="8c9c52b5-5a19-4bcb-a5d1-158a74287c53";
    const productId6="dd82ca78-a18b-4e2a-9250-31e67412f98d";
    const productId7="77919bbe-0e56-475b-adde-4f24dfed3a04";
    const productId8="3fdfe8d6-9a15-4979-b459-585b0d0545b9";
    const productId9="58b4fc92-e98c-42aa-8c55-b6b79996769a";
    beforeEach(()=>{
        spyOn(localStorage,'setItem');
        document.querySelector('.js-test-container').innerHTML=`
        <div class="js-header-summary"><div class="checkout-header-middle-section"> Checkout (<a class="return-to-home-link js-return-to-home-link" href="14-amazon.html"> items</a>) </div></div><div class="js-order-summary"></div><div class="js-payment-summary"></div>`;
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    "id": productId1,
                    "quantity": 1,
                    'deliveryOptionId':1
                },
                {
                    "id": productId2,
                    "quantity": 3,
                    'deliveryOptionId':2
                },
                {
                    "id": productId3,
                    "quantity": 4,
                    'deliveryOptionId':3
                },
                {
                    "id": productId4,
                    "quantity": 5,
                    'deliveryOptionId':2
                },
                {
                    "id": productId5,
                    "quantity": 1,
                    'deliveryOptionId':1
                },
                {
                    "id": productId6,
                    "quantity": 1,
                    'deliveryOptionId':2
                },
                {
                    "id": productId7,
                    "quantity": 1,
                    'deliveryOptionId':3
                },
                {
                    "id": productId8,
                    "quantity": 2,
                    'deliveryOptionId':1
                },
                {
                    "id": productId9,
                    "quantity": 3,
                    'deliveryOptionId':3
                }
            ]);
        });
        loadFromStorage();
        console.log(localStorage.getItem('cart'));
        renderOrderSummary();
    })
    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML='';
    })
    it('Displays the cart',()=>{
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(9);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 3');
        expect(document.querySelector(`.js-product-quantity-${productId3}`).innerText).toContain('Quantity: 4');
        expect(document.querySelector(`.js-product-quantity-${productId4}`).innerText).toContain('Quantity: 5');
        expect(document.querySelector(`.js-product-quantity-${productId5}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId6}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId7}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId8}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId9}`).innerText).toContain('Quantity: 3');
    });
    it('removes a product',()=>{
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(8);
        expect(document.querySelector(`.js-product-quantity-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-product-quantity-${productId2}`)).not.toEqual(null);
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 3');
        expect(document.querySelector(`.js-product-quantity-${productId3}`).innerText).toContain('Quantity: 4');
        expect(document.querySelector(`.js-product-quantity-${productId4}`).innerText).toContain('Quantity: 5');
        expect(document.querySelector(`.js-product-quantity-${productId5}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId6}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId7}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId8}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId9}`).innerText).toContain('Quantity: 3');
        expect(cart.length).toEqual(8);
        expect(cart[0].id).toEqual(productId2);
    });
});