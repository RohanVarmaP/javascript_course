import { cart } from "../../data/cart.js";

export const renderHeaderSummary=()=>{
    let itemsInCart=0;
    cart.forEach(cartItem => {
        console.log(cartItem.quantity);
        itemsInCart+=cartItem.quantity;
    });
    document.querySelector('.js-return-to-home-link').innerHTML=`${itemsInCart} items`;
    console.log("end headerrrrrrrrrrrrrrrrrrrrr");
}