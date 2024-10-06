// Import data from the data.js file
import data from './data.js'; // Ensure this path is correct

// Select the container where items will be displayed
const itemsContainer = document.querySelector('#items');

// Initialize an empty cart
const cart = [];

// Function to add items to the cart
const addItemToCart = (id, price) => {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].id === id) {
            cart[i].qty += 1; // Increase quantity if item already in cart
            return; // Exit the function early
        }
    }
    // If item is not in the cart, add it
    cart.push({ id, price, qty: 1 });
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
    // Get the cart element and set its inner HTML
    const cartItems = document.querySelector('#cart-items');
    cartItems.innerHTML = cartStr;
};

// Loop through the data to create item elements
for (let i = 0; i < data.length; i += 1) {
    // Create a new div element for each item
    const newDiv = document.createElement('div');
    newDiv.className = 'item';

    // Create and append the image element
    const img = document.createElement('img');
    img.src = data[i].image;
    img.width = 300;
    img.height = 300;
    newDiv.appendChild(img);

    // Create and append the description element
    const desc = document.createElement('p');
    desc.innerText = data[i].desc;
    newDiv.appendChild(desc);

    // Create and append the price element
    const price = document.createElement('p');
    price.innerText = `$${data[i].price.toFixed(2)}`; // Format price
    newDiv.appendChild(price);

    // Create and append the "Add to Cart" button
    const button = document.createElement('button');
    button.className = 'add-to-cart'; // Ensure the button has the correct class
    button.dataset.id = data[i].id; // Set data-id attribute to the item's id
    button.dataset.price = data[i].price; // Set data-price attribute
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);

    // Append the new div to the items container
    itemsContainer.appendChild(newDiv);
}

// Function to update the cart
const updateCart = (id, val) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        if (id === item.id) {
            item.qty = val;
            // If the value is less than 1, remove the item
            if (item.qty < 1) {
                cart.splice(i, 1);
            }
            return; // Exit function
        }
    }
};

// Event listener for click events
document.body.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
        addItemToCart(e.target.dataset.id, parseFloat(e.target.dataset.price)); // Ensure price is a number
        displayCart();
    } else if (e.target.matches('.button-add')) {
        const id = e.target.dataset.id; // Get item id
        addToCart(id); // Add to cart
        displayCart(); // Update display
    } else if (e.target.matches('.button-sub')) {
        const id = e.target.dataset.id; // Get item id
        removeFromCart(id); // Call remove from cart
        displayCart(); // Display the cart
    }
});

// Event listener for change events on input fields
document.body.addEventListener('change', (e) => {
    if (e.target.matches('.input-qty')) {
        const id = e.target.dataset.id; // Get the id
        const value = parseInt(e.target.value); // Convert value to integer
        updateCart(id, value); // Update cart
        displayCart(); // Display the cart
    }
});

// Event listener for keydown events on input fields
document.body.addEventListener('keydown', (e) => {
    if (e.target.matches('.input-qty')) {
        if (e.key === "Enter") {
            const id = e.target.dataset.id; // Get the id
            const value = parseInt(e.target.value); // Convert value to integer
            updateCart(id, value); // Update cart
            displayCart(); // Display the cart
        }
    }
});

// Function to add to cart (for button-add)
const addToCart = (id) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        if (id === item.id) {
            item.qty += 1; // Increase quantity
            return; // Exit function
        }
    }
};

// Function to remove from cart (for button-sub)
const removeFromCart = (id) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        if (id === item.id) {
            item.qty -= 1; // Decrease quantity
            if (item.qty === 0) {
                cart.splice(i, 1); // Remove item if qty is 0
            }
            return; // Exit function
        }
    }
};
