const productContainer = document.getElementById("product-container");
const categoriesContainer = document.getElementById("category-list");

let allProducts = [];
const renderProducts = (products) => {
productContainer.innerHTML = products.map(product => `
    <div class="card shadow rounded-md border border-gray-50">
                <!-- Product Image -->
                <figure class="px-6 pt-6 bg-gray-100">
                    <img src=${product.image}
                        alt=${product.title} class="rounded-lg p-5 object-cover h-56" />
                </figure>
                <!-- Card Body -->
                <div class="card-body border-0 pt-4">
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
                        <button class="btn border border-gray-300 flex items-center py-2 gap-2">
                            <i class="fa-solid fa-eye"></i> Details
                        </button>

                        <button class="btn btn-primary border-0 flex items-center py-2 gap-2">
                            <i class="fa-solid fa-cart-shopping"></i> Add
                        </button>
                    </div>

                </div>
            </div>
    `).join("");
}
const removeActiveClass = () => {
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

}
async function fetchProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();
        allProducts = products;

        if (categoriesContainer) {
            renderProducts(allProducts);
        }
        else {
            renderProducts(allProducts.slice(0, 3));
        }

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function fetchCategories() {
    if (!categoriesContainer) return;
    try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const categories = await res.json();

        categoriesContainer.innerHTML = `
            <a role="button" data-category="all" class="btn rounded-full hover:bg-indigo-600 border-indigo-600 hover:text-white text-indigo-600 hover:border-none category-btn active">
                All
            </a>
            ${categories.map(category => `
                <a role="button" id="${category}" data-category="${category}"
                   class="btn rounded-full hover:bg-indigo-600 border-indigo-600 hover:text-white text-indigo-600 hover:border-none category-btn">
                   ${category}
                </a>
            `).join("")}
        `;
        categoriesContainer.addEventListener("click", (event) => {
            const btn = event.target.closest("[data-category]");
            removeActiveClass();
            btn.classList.add("active");
            const category = btn.dataset.category;

            if (!btn) return;
            if (category === "all") {
                renderProducts(allProducts);
            }
            else {
                const filteredProducts = allProducts.filter(product => product.category === category);
                renderProducts(filteredProducts);
            }
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
fetchProducts();

fetchCategories();
