
import data from './data.js';


const itemsContainer = document.querySelector('#items');


const cart = [];


const getCartTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        total += item.qty * item.price;
    }
    return total.toFixed(2);
};


const displayCart = () => {
    let cartStr = '';
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        cartStr += `<li>
            <span>${item.id}</span>
            <input type="number" value="${item.qty}" class="input-qty" data-id="${item.id}">
            <span>$${item.price.toFixed(2)}</span>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
            <button class="button-add" data-id="${item.id}">+</button>
            <button class="button-sub" data-id="${item.id}">-</button>
        </li>`;
    }
    

    const cartTotal = getCartTotal();

    cartStr += `<li>Total: $${cartTotal}</li>`;


    const cartItems = document.querySelector('#cart-items');
    cartItems.innerHTML = cartStr;
};


const addItemToCart = (id, price) => {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].id === id) {
            cart[i].qty += 1;
            return;
        }
    }
    cart.push({ id, price, qty: 1 });
};


for (let i = 0; i < data.length; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.className = 'item';

    const img = document.createElement('img');
    img.src = data[i].image;
    img.width = 300;
    img.height = 300;
    newDiv.appendChild(img);

    const desc = document.createElement('p');
    desc.innerText = data[i].desc;
    newDiv.appendChild(desc);

    const price = document.createElement('p');
    price.innerText = `$${data[i].price.toFixed(2)}`;
    newDiv.appendChild(price);

    const button = document.createElement('button');
    button.className = 'add-to-cart';
    button.dataset.id = data[i].id;
    button.dataset.price = data[i].price;
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);

    itemsContainer.appendChild(newDiv);
}


const updateCart = (id, val) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        if (id === item.id) {
            item.qty = val;
            if (item.qty < 1) {
                cart.splice(i, 1);
            }
            return;
        }
    }
};


document.body.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
        addItemToCart(e.target.dataset.id, parseFloat(e.target.dataset.price));
        displayCart();
    } else if (e.target.matches('.button-add')) {
        const id = e.target.dataset.id;
        addToCart(id);
        displayCart();
    } else if (e.target.matches('.button-sub')) {
        const id = e.target.dataset.id;
        removeFromCart(id);
        displayCart();
    }
});


document.body.addEventListener('change', (e) => {
    if (e.target.matches('.input-qty')) {
        const id = e.target.dataset.id;
        const value = parseInt(e.target.value);
        updateCart(id, value);
        displayCart();
    }
});


document.body.addEventListener('keydown', (e) => {
    if (e.target.matches('.input-qty') && e.key === "Enter") {
        const id = e.target.dataset.id;
        const value = parseInt(e.target.value);
        updateCart(id, value);
        displayCart();
    }
});


const addToCart = (id) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        if (id === item.id) {
            item.qty += 1;
            return;
        }
    }
};


const removeFromCart = (id) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        if (id === item.id) {
            item.qty -= 1;
            if (item.qty === 0) {
                cart.splice(i, 1);
            }
            return;
        }
    }
};