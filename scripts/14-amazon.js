import {cart as myCart} from './cart.js';
import { products } from './products.js';

const divProductElement=document.querySelector('.js-product-grid');
console.log(divProductElement);
products.forEach((product)=>{
    divProductElement.innerHTML+=`
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${product.name}"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
})
let addedToCartTimeOutId;
document.querySelectorAll('.js-add-to-cart').forEach((buttonElement)=>{
    buttonElement.addEventListener('click',()=>{
        document.querySelector(`.js-added-to-cart-${buttonElement.dataset.productId}`).classList.add('justAdded');
        if (addedToCartTimeOutId){clearTimeout(addedToCartTimeOutId);}
        addedToCartTimeOutId=setTimeout(()=>{
            document.querySelector(`.js-added-to-cart-${buttonElement.dataset.productId}`).classList.remove('justAdded');
        },2000)
        const addQuantity=Number(document.querySelector(`.js-product-quantity-${buttonElement.dataset.productId}`).value);
        let matchingItem;
        myCart.forEach((item)=>{
            if(item.id===buttonElement.dataset.productId){
                matchingItem=item;
            }
        });
        if(matchingItem){
            matchingItem.quantity+=addQuantity;
        }else{
            myCart.push({
                name:buttonElement.dataset.productName,
                id:buttonElement.dataset.productId,
                quantity:addQuantity
            });
        }
        let cartQuantity=0;
        myCart.forEach((item)=>{
            cartQuantity+=item.quantity;
        });
        document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
        console.log(cartQuantity);
        console.log(myCart);
    })
})