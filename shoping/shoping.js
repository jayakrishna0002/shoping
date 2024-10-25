let list = document.getElementById("list");
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let productDetails = document.getElementById("productDetails");
let detailsContent = document.getElementById("detailsContent");
let backButton = document.getElementById("backButton");

async function fetchData() {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();
    renderProducts(data.products);
}

function renderProducts(products) {
    let li = "";
    products.forEach(item => {
        li += `
            <li onclick="showProductDetails(${item.id})">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="product-info">
                    <h2>${item.title}</h2>
                    <p>$${item.price}</p>
                </div>
            </li>
        `;
    });
    list.innerHTML = li;
}

async function showProductDetails(productId) {
    // Hide product list and show product details
    list.classList.add("hidden");
    productDetails.classList.remove("hidden");

    // Fetch product details
    let res = await fetch(`https://dummyjson.com/products/${productId}`);
    let product = await res.json();

    // Render product details
    detailsContent.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Brand: ${product.brand}</p>
        <p>Category: ${product.category}</p>
    `;
}

// Go back to the product list
backButton.addEventListener('click', () => {
    productDetails.classList.add("hidden");
    list.classList.remove("hidden");
});

// Search functionality
searchButton.addEventListener('click', () => {
    let query = searchInput.value.toLowerCase();
    searchProducts(query);
});

async function searchProducts(query) {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();
    
    let filteredProducts = data.products.filter(product => 
        product.title.toLowerCase().includes(query)
    );
    
    renderProducts(filteredProducts);
}

// Initial data fetch
fetchData();