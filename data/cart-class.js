class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(localStorageKey){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
            {
                "id": "54e0eccd-8f36-462b-b68a-8182611d9add",
                "quantity": 1,
                'deliveryOptionId':1
            },
            {
                "id": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                "quantity": 3,
                'deliveryOptionId':2
            },
            {
                "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                "quantity": 4,
                'deliveryOptionId':3
            },
            {
                "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                "quantity": 5,
                'deliveryOptionId':2
            },
            {
                "id": "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
                "quantity": 1,
                'deliveryOptionId':1
            },
            {
                "id": "dd82ca78-a18b-4e2a-9250-31e67412f98d",
                "quantity": 1,
                'deliveryOptionId':2
            },
            {
                "id": "77919bbe-0e56-475b-adde-4f24dfed3a04",
                "quantity": 1,
                'deliveryOptionId':3
            },
            {
                "id": "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
                "quantity": 2,
                'deliveryOptionId':1
            },
            {
                "id": "58b4fc92-e98c-42aa-8c55-b6b79996769a",
                "quantity": 3,
                'deliveryOptionId':3
            }
        ];
    }

    saveToLocal(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
        console.log(this.cartItems);
    }

    addToCart(productId){
        const quantityInput = document.querySelector(`.js-product-quantity-${productId}`);
        let addQuantity;
        if (!quantityInput) {
            console.warn(`Quantity input not found for product ID: ${productId}`);
            addQuantity = 1;
        }else{
            addQuantity = Number(quantityInput.value) || 1;
        }
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.id===productId){
                matchingItem=cartItem;
            }
        });
        if(matchingItem){
            matchingItem.quantity+=addQuantity;
        }else{
            this.cartItems.push({
                id:productId,
                quantity:addQuantity,
                deliveryOptionId:2
            });
        }
        this.saveToLocal();
    }

    removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach(cartItem=>{
            if(cartItem.id!==productId){
                newCart.push(cartItem);
            }
        })
        this.cartItems=newCart;
        this.saveToLocal();
    }

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.id===productId){
                matchingItem=cartItem;
            }
        });
        // console.log(`before update: ${matchingItem}`);
        // console.log(`before update matchingItem.deliveryOptionId: ${typeof matchingItem.deliveryOptionId}`);
        // console.log(`before update deliveryOptionId: ${typeof deliveryOptionId}`);
        matchingItem.deliveryOptionId=deliveryOptionId;
        this.saveToLocal();
        // console.log(`after update matchingItem.deliveryOptionId: ${typeof matchingItem.deliveryOptionId}`);
        // console.log(`after update deliveryOptionId: ${typeof deliveryOptionId}`);
        // console.log(`after update: ${matchingItem}`);
    }
}
const cart=new Cart('simple-cart');
const businessCart=new Cart('business-cart');
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);