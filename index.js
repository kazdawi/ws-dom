// Function to update the total price
function updateTotal() {
    let total = 0;
    
    // Get all cart items
    const items = document.querySelectorAll('.cart-item');
    
    items.forEach(item => {
        // Get the price from the data-price attribute
        const price = parseFloat(item.dataset.price); 
        
        // Get the quantity from the corresponding input field
        const quantity = parseInt(item.querySelector('.qty').value);
        
        // Add the price * quantity to the total
        total += price * quantity; 
    });

    // Update the total in the DOM
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Event listeners for quantity changes (both plus and minus buttons)
const plusButtons = document.querySelectorAll('.qty-plus');
const minusButtons = document.querySelectorAll('.qty-minus');

plusButtons.forEach(plusButton => {
    // Find the parent cart-item
    const cartItem = plusButton.closest('.cart-item');
    const quantityInput = cartItem.querySelector('.qty');  // Get the corresponding quantity input for this cart item

    plusButton.addEventListener("click", function () {
        // Increase the quantity by 1
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateTotal();  // Update the total whenever quantity changes
    });
});

minusButtons.forEach(minusButton => {
    // Find the parent cart-item
    const cartItem = minusButton.closest('.cart-item');
    const quantityInput = cartItem.querySelector('.qty');  // Get the corresponding quantity input for this cart item

    minusButton.addEventListener("click", function () {
        // Decrease the quantity by 1, but not below 1
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateTotal();  // Update the total whenever quantity changes
        }
    });
});

// Event listener for removing an item
const trashIcons = document.querySelectorAll('.fa-trash-can');

trashIcons.forEach(trashIcon => {
    trashIcon.addEventListener('click', function() {
        // Find the parent <li> element and remove it
        const cartItem = trashIcon.closest('.cart-item');
        cartItem.remove();  // Remove the item from the DOM
        updateTotal();  // Recalculate the total after removal
    });
});

// Event listener for heart icon toggle
const heartIcons = document.querySelectorAll('.heart-icon');

heartIcons.forEach(heart => {
    heart.addEventListener('click', function() {
        // Toggle the 'text-red-500' class (which makes the heart red)
        heart.classList.toggle('text-red-500');
    });
});

// Initialize the total on page load
document.addEventListener('DOMContentLoaded', updateTotal);
