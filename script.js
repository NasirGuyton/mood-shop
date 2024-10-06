// Import data from the data.js file
import data from './data.js';

// Select the container where items will be displayed
const itemsContainer = document.querySelector('#items');

// Initialize an empty cart
const cart = [];

// Function to get the total cost of the cart
const getCartTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        total += item.qty * item.price;
    }
    return total.toFixed(2);
};

// Function to display the cart
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
    
    // Get the total cost in the cart
    const cartTotal = getCartTotal();
    // Append a li tag at the end of the cartStr with the total
    cartStr += `<li>Total: $${cartTotal}</li>`;

    // Get the cart element and set its inner HTML
    const cartItems = document.querySelector('#cart-items');
    cartItems.innerHTML = cartStr;
};

// Function to add items to the cart
const addItemToCart = (id, price) => {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].id === id) {
            cart[i].qty += 1;
            return;
        }
    }
    cart.push({ id, price, qty: 1 });
};

// Loop through the data to create item elements
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

// Function to update the cart
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

// Event listener for click events
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

// Event listener for change events on input fields
document.body.addEventListener('change', (e) => {
    if (e.target.matches('.input-qty')) {
        const id = e.target.dataset.id;
        const value = parseInt(e.target.value);
        updateCart(id, value);
        displayCart();
    }
});

// Event listener for keydown events on input fields
document.body.addEventListener('keydown', (e) => {
    if (e.target.matches('.input-qty') && e.key === "Enter") {
        const id = e.target.dataset.id;
        const value = parseInt(e.target.value);
        updateCart(id, value);
        displayCart();
    }
});

// Function to add to cart (for button-add)
const addToCart = (id) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        if (id === item.id) {
            item.qty += 1;
            return;
        }
    }
};

// Function to remove from cart (for button-sub)
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