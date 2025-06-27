import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart',()=>{
    it('adds an existing product to cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
            "id": "54e0eccd-8f36-462b-b68a-8182611d9add",
            "quantity": 1,
            'deliveryOptionId':1
        }]);
        });
        loadFromStorage();
        console.log(localStorage.getItem('cart'));
        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart[0].quantity).toEqual(2);
    });
    it('adds an new product to cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        console.log(localStorage.getItem('cart'));
        addToCart('901eb2ca-386d-432e-82f0-6fb1ee7bf969');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('901eb2ca-386d-432e-82f0-6fb1ee7bf969');
        expect(cart[0].quantity).toEqual(1);
    });
})