const productContainer = document.getElementById("product-container");

async function fetchProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();
        console.log(products);
        
        productContainer.innerHTML = products.map(product => `
            <div  class="card shadow rounded-md border border-gray-50">
                        <!-- Product Image -->
                        <figure class="px-6 pt-6 bg-gray-100">
                            <img src=${product.image}
                                alt=${product.title} class="rounded-lg p-5 object-cover h-40" />
                        </figure>
                        <!-- Card Body -->
                        <div class="card-body pt-4">
                            <div class="flex items-center justify-between">
                                <span class="badge badge-soft badge-primary text-xs px-3 py-2">
                                    ${product.category}
                                </span>

                                <div class="flex items-center gap-1 text-sm text-gray-500">
                                    <i class="fa-solid fa-star text-yellow-300"></i> <span class="font-medium text-gray-700">${product.rating.rate}</span>
                                    <span>${product.rating.count}</span>
                                </div>
                            </div>
                            <h2 class="text-lg font-medium leading-snug">
                                ${product.title}
                            </h2>
                            <p class="text-xl font-bold text-gray-900">$${product.price}</p>
                            <div class="grid grid-cols-2 gap-4 mt-2">
                                <button class="btn btn-outline flex items-center py-2 gap-2">
                                    <i class="fa-solid fa-eye"></i> Details
                                </button>

                                <button class="btn btn-primary flex items-center py-2 gap-2">
                                    <i class="fa-solid fa-cart-shopping"></i> Add
                                </button>
                            </div>

                        </div>
                    </div>
            `).join("");
              
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
fetchProducts();