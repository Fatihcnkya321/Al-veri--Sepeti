let productList = document.getElementById('product-list');
let shoppingCart = document.getElementById('shopping-cart');
let productForm = document.getElementById('product-form');

let products = JSON.parse(localStorage.getItem('products')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let productName = document.getElementById('productName').value;
    let category = document.getElementById('category').value;
    let color = document.getElementById('color').value;
    let price = document.getElementById('price').value;

    let newProduct = {
        name: productName,
        category: category,
        color: color,
        price: price
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
});

function displayProducts() {
    productList.innerHTML = '';
    products.forEach((product) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${product.name} - ${product.category} - ${product.color} - ${product.price} TL`;
        let button = document.createElement('button');
        button.textContent = 'Seç ya da Al';
        button.addEventListener('click', () => {
            let index = products.indexOf(product);
            if (index !== -1) {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCart();
            }
        });
        listItem.appendChild(button);
        productList.appendChild(listItem);
    });
}

function displayCart() {
    shoppingCart.innerHTML = '';
    cart.forEach((product) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${product.name} - ${product.price} TL`;
        shoppingCart.appendChild(listItem);
    });
    let total = cart.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('total').textContent = `Toplam Tutar: ${total} TL`;
}

displayProducts();
displayCart();