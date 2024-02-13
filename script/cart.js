const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const container = document.getElementById('cart_container');
const checkoutBtn = document.getElementById('checkout');
const addressError = document.getElementById('address_error');
const phoneError = document.getElementById('phone_error');
const emailError = document.getElementById('email_error');
const address = document.getElementById('address');
const phone = document.getElementById('phone');
const email = document.getElementById('email');

if (cart.length > 0) {
    cart.forEach(product => {
        let mainDiv = document.createElement('div');
        mainDiv.className = 'col-md-6 item d-flex align-items-center mb-5';

        let imgDiv = document.createElement('div');
        imgDiv.className = 'item_img';

        let img = document.createElement('img');
        img.src = `images/products/${product.product}`;
        img.className = 'img-fluid card-img-top';

        let msDiv = document.createElement('div');
        msDiv.className = 'ms-3';

        let priceP = document.createElement('p');
        priceP.textContent = `Price: ${product.price}`;

        let quantityP = document.createElement('p');
        quantityP.textContent = `Quantity: ${product.quantity}`;

        let removeButton = document.createElement('button');
        removeButton.className = 'btn remove_btn';
        removeButton.textContent = 'Remove';
        removeButton.onclick = removeItem.bind(this, product, removeButton);

        imgDiv.appendChild(img);
        msDiv.appendChild(priceP);
        msDiv.appendChild(quantityP);
        msDiv.appendChild(removeButton);
        mainDiv.appendChild(imgDiv);
        mainDiv.appendChild(msDiv);

        container.appendChild(mainDiv);
    });
}
else {
    container.innerHTML = "<h2>Your cart is empty</h2>";
    checkoutBtn.disabled = true;

}


function order(e) {
    console.log("Checkout");
    e.preventDefault();
    let valid = true;
    addressError.style.display = "none";
    phoneError.style.display = "none";
    emailError.style.display = "none";
    if (address.value == "") {
        addressError.style.display = "block";
        valid = false;
    }
    if (phone.value == "") {
        phoneError.style.display = "block";
        valid = false;
    }
    if (email.value == "") {
        emailError.style.display = "block";
        valid = false;
    }
    if (valid) {
        container.innerHTML = "<h2>Thank you for shopping with us, your order has been placed!</h2>";
        checkoutBtn.disabled = true;
        localStorage.removeItem('cart');
        address.value = "";
        phone.value = "";
        email.value = "";
    }
}

function removeItem(product, btn) {
    const item = btn.parentElement.parentElement;
    cart.splice(cart.indexOf(product), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    container.removeChild(item);
    if (cart.length == 0) {
        container.innerHTML = "<h2>Your cart is empty</h2>";
        checkoutBtn.disabled = true;
    }
}