const params = new URLSearchParams(window.location.search);
let category = params.get('category') || 'men';
let collection = params.get('collection') || 'tshirts';
collection = (category == 'best' || category == 'new') ? null : collection;
const container = document.getElementById("products");
const men = document.getElementById("men");
const women = document.getElementById("women");
const kids = document.getElementById("kids");
const best = document.getElementById("best");
const newCollection = document.getElementById("newCollection");
const tshirts = document.getElementById("tshirts");
const hoodies = document.getElementById("hoodies");
const pants = document.getElementById("pants");
const shirts = document.getElementById("shirts");
const collections = document.getElementById("collections");

const productsNumber = {
    'men': {
        'tshirts': 9,
        'shirts': 4,
        'pants': 8,
        'hoodies': 9
    },
    'women': {
        'tshirts': 9,
        'shirts': 7,
        'pants': 5,
        'hoodies': 10
    },
    'kids': {
        'tshirts': 8,
        'shirts': 5,
        'pants': 7,
        'hoodies': 7
    },
    'best': 8,
    'newCollection': 9
};

const productsPrices = {
    'men': {
        'tshirts': [450, 250, 300, 400, 500, 400, 600, 700, 550],
        'shirts': [400, 650, 300, 500],
        'pants': [500, 600, 700, 450, 550, 650, 750, 800],
        'hoodies': [700, 700, 700, 700, 700, 700, 700, 700, 700]
    },
    'women': {
        'tshirts': [400, 400, 400, 400, 400, 400, 400, 400, 400],
        'shirts': [300, 500, 600, 700, 250, 350, 450],
        'pants': [500, 600, 700, 450, 450],
        'hoodies': [600, 700, 450, 350, 450, 500, 400, 650, 450, 550]
    },
    'kids': {
        'tshirts': [400, 650, 300, 500, 600, 700, 250, 350],
        'shirts': [400, 650, 300, 500, 600],
        'pants': [500, 600, 700, 450, 350, 450, 600],
        'hoodies': [600, 700, 450, 350, 450, 500, 400]
    },
    'best': [500, 500, 600, 700, 250, 350, 450, 400],
    'newCollection': [500, 600, 700, 450, 350, 450, 600, 400, 550]
};

const links = {
    men,
    women,
    kids,
    best,
    newCollection,
    tshirts,
    hoodies,
    pants,
    shirts
}

function createProduct(image, price) {
    let mainDiv = document.createElement('div');
    mainDiv.className = 'col-md-6 col-xl-4 mb-4';

    let cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    let img = document.createElement('img');
    img.src = `images/products/${image}`;
    img.className = 'img-fluid card-img-top';

    let cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    let dFlexDiv = document.createElement('div');
    dFlexDiv.className = 'd-flex justify-content-between align-items-center';

    let priceDiv = document.createElement('div');
    priceDiv.className = 'price';
    priceDiv.textContent = `EGP ${price}`;

    let button = document.createElement('button');
    button.className = 'btn addBtn';
    button.textContent = 'Add to cart';
    button.onclick = addToCart.bind(this, button);

    dFlexDiv.appendChild(priceDiv);
    dFlexDiv.appendChild(button);
    cardBodyDiv.appendChild(dFlexDiv);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
    mainDiv.appendChild(cardDiv);

    container.appendChild(mainDiv);
}

if(category != "best" && category != "newCollection") {
    for(let i = 0; i < productsNumber[category][collection]; i++) {
        createProduct(`${category}/${collection}/${i+1}.jpg`, productsPrices[category][collection][i]);
    }
}
else {
    collections.style.display = "none";
    for(let i = 0; i < productsNumber[category]; i++) {
        createProduct(`${category}/${i+1}.jpg`, productsPrices[category][i]);
    }
}

links[category].classList.add("active");
if(collection != null) {
    links[collection].classList.add("active");
}

function changeProducts(target, c = false) {
    if(c) category = target;
    else collection = target;
    if(category != "best" && category != "newCollection") {
        if(collection == null) collection = 'tshirts';
        window.location.href = `shop.html?category=${category}&collection=${collection}`;
    }
    else window.location.href = `shop.html?category=${category}`;
}

function addToCart(btn) {
    console.log("Clicked");
    btn.textContent = "Added to cart";
    btn.disabled = true;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = btn.parentElement.parentElement.parentElement.parentElement.querySelector('img').src;
    product = (category == 'best' || category == 'newCollection') ? product.split('/').slice(-2).join('/') : product.split('/').slice(-3).join('/');
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product === product) {
            cart[i].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            return;
        }
    }
    let price = btn.parentElement.querySelector('.price').textContent;
    cart.push({product, price, quantity: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    // updateCart();
}