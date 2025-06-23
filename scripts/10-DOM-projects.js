function subscribe(){
    buttonElement=document.querySelector('.js-subscribe-button');
    if (buttonElement.innerHTML==='Subscribe'){
        buttonElement.innerHTML='Subscribed';
        buttonElement.classList.add('isSubscribed')
    }else{
        buttonElement.innerHTML='Subscribe';
        buttonElement.classList.remove('isSubscribed')
    }
}
function calculateTotal(){
    const inputElement=document.querySelector('.js-cost-input');
    if (inputElement.value<40){
        document.querySelector('.js-total').innerHTML=`Total(with-Shipping): ${Number(inputElement.value)+10}.`;
        inputElement.value='';
    }else{
        document.querySelector('.js-total').innerHTML=`Total(with-Shipping): ${Number(inputElement.value)}.`;
        inputElement.value='';
    }
}
function handleKeyDown(key){
    if (key==='Enter'){
        calculateTotal();
    }
}