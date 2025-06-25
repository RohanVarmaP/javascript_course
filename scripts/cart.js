export const cart=[];

export const addToCart=buttonElement=>{
  const addQuantity=Number(document.querySelector(`.js-product-quantity-${buttonElement.dataset.productId}`).value);
  let matchingItem;
  cart.forEach((cartItem)=>{
      if(cartItem.id===buttonElement.dataset.productId){
          matchingItem=cartItem;
      }
  });
  if(matchingItem){
      matchingItem.quantity+=addQuantity;
  }else{
      cart.push({
          name:buttonElement.dataset.productName,
          id:buttonElement.dataset.productId,
          quantity:addQuantity
      });
  }
}