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
    button.dataset.id = data[i].name; // Set data-id attribute
    button.dataset.price = data[i].price; // Set data-price attribute
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);

    // Append the new div to the items container
    itemsContainer.appendChild(newDiv);
}

// Event listener for adding items to the cart
document.body.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
        const itemId = e.target.dataset.id; // Get item ID from button
        const itemPrice = parseFloat(e.target.dataset.price); // Get item price
        addItemToCart(itemId, itemPrice); // Call function to add item to cart
        displayCart(); // Display the cart!
        console.log(cart); // Log the cart to see the current items
    }
});
