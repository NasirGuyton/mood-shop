import data from './data.js'; // Ensure this is correct

const itemsContainer = document.querySelector('#items');

// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
    // create a new div element and give it a class name
    const newDiv = document.createElement('div');
    newDiv.className = 'item';

    // create an image element
    const img = document.createElement('img');
    img.src = data[i].image;
    img.width = 300;
    img.height = 300;

    // Add the image to the div
    newDiv.appendChild(img);
    console.log(img); // Check the console!

    // create a paragraph element for a description
    const desc = document.createElement('P');
    desc.innerText = data[i].desc;
    newDiv.appendChild(desc);

    // do the same thing for price
    const price = document.createElement('P');
    price.innerText = data[i].price;
    newDiv.appendChild(price);

    // Create the button inside the loop
    const button = document.createElement('button');
    
    // add a data-id name to the button
    button.dataset.id = data[i].name;
    
    // creates a custom attribute called data-price. That will hold price for each element in the button
    button.dataset.price = data[i].price;
    button.innerHTML = "Add to Cart";
    
    // append the button to the div
    newDiv.appendChild(button);
    
    // Append the new div to the items container
    itemsContainer.appendChild(newDiv);
}
