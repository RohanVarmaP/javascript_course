export let cart;
export const loadFromStorage=()=>{
    cart=JSON.parse(localStorage.getItem('cart')) || [
        {
            "productId": "54e0eccd-8f36-462b-b68a-8182611d9add",
            "quantity": 1,
            'deliveryOptionId':1
        },
        {
            "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            "quantity": 3,
            'deliveryOptionId':2
        },
        {
            "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            "quantity": 4,
            'deliveryOptionId':3
        },
        {
            "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            "quantity": 5,
            'deliveryOptionId':2
        },
        {
            "productId": "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
            "quantity": 1,
            'deliveryOptionId':1
        },
        {
            "productId": "dd82ca78-a18b-4e2a-9250-31e67412f98d",
            "quantity": 1,
            'deliveryOptionId':2
        },
        {
            "productId": "77919bbe-0e56-475b-adde-4f24dfed3a04",
            "quantity": 1,
            'deliveryOptionId':3
        },
        {
            "productId": "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
            "quantity": 2,
            'deliveryOptionId':1
        },
        {
            "productId": "58b4fc92-e98c-42aa-8c55-b6b79996769a",
            "quantity": 3,
            'deliveryOptionId':3
        }
    ];
};
loadFromStorage();
export const addToCart=productId=>{
    const quantityInput = document.querySelector(`.js-product-quantity-${productId}`);
    let addQuantity;
    if (!quantityInput) {
        console.warn(`Quantity input not found for product ID: ${productId}`);
        addQuantity = 1;
    }else{
        addQuantity = Number(quantityInput.value) || 1;
    }
  let matchingItem;
  cart.forEach((cartItem)=>{
      if(cartItem.productId===productId){
          matchingItem=cartItem;
      }
  });
  if(matchingItem){
      matchingItem.quantity+=addQuantity;
  }else{
      cart.push({
          productId:productId,
          quantity:addQuantity,
          deliveryOptionId:2
      });
  }
  saveToLocal();
}

export const removeFromCart=productId=>{
  const newCart=[];
  cart.forEach(cartItem=>{
    if(cartItem.productId!==productId){
        newCart.push(cartItem);
    }
  })
  cart=newCart;
  saveToLocal();
}

const saveToLocal=()=>{
    localStorage.setItem('cart',JSON.stringify(cart));
    console.log(cart);
}

export const updateDeliveryOption=(productId,deliveryOptionId)=>{
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(cartItem.productId===productId){
            matchingItem=cartItem;
        }
    });
    // console.log(`before update: ${matchingItem}`);
    console.log(`before update matchingItem.deliveryOptionId: ${typeof matchingItem.deliveryOptionId}`);
    console.log(`before update deliveryOptionId: ${typeof matchingItem.deliveryOptionId}`);
    matchingItem.deliveryOptionId=deliveryOptionId;
    saveToLocal();
    console.log(`after update matchingItem.deliveryOptionId: ${typeof matchingItem.deliveryOptionId}`);
    console.log(`after update deliveryOptionId: ${typeof matchingItem.deliveryOptionId}`);
    // console.log(`after update: ${matchingItem}`);
}

export function loadCart(fun){
    const xhr=new XMLHttpRequest();

    xhr.addEventListener('load',()=>{
        console.log(xhr.response);
        console.log('cart loaded');
        fun();
    });
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
}

export function loadCartFetch(){
    console.log("started fetch cart");
    const promise=fetch('https://supersimplebackend.dev/cart').then((response)=>{
        console.log(response);
        return response.text();
    }).then((cartData)=>{
        console.log('cart loaded fetch');
        console.log(cartData);
    })
    return promise;
}
