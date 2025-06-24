let products = [
  {
    id: 1,
    name: "Airpods",
    price: 150,
    image: "images/Airpods.jpg",
    description: "Great Listening",
    review: "Loved it!"
  },
  {
    id: 2,
    name: "Apple Watch",
    price: 100,
    image: "images/applewatch.jpg",
    description: "Measure Heartbeat",
    review: "Very affordable."
  },
  {
    id: 3,
    name: "MacBook",
    price: 80,
    image: "images/macbook.jpg",
    description: "Advanced features",
    review: "Super Laptop"
  },
{
    id: 4,
    name: "IPHONE 16",
    price: 80,
    image: "images/iphone16.jpg",
    description: "More Security",
    review: "Camera Quality Awesome!!!."
  }
];

let cart = [];

function displayProducts(prodList = products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  prodList.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: ₹${product.price}</p>
      <p><strong>Review:</strong> ${product.review}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productCard);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("total");
  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
    sum += item.price;
  });

  total.textContent = sum;
}

function sortProducts() {
  const sortOption = document.getElementById("sort").value;
  let sorted = [...products];

  if (sortOption === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
}

function trackOrder() {
  const id = document.getElementById("track-id").value.trim();
  const status = document.getElementById("order-status");

  if (id === "") {
    status.textContent = "Please enter an order ID.";
  } else {
    status.textContent = `Order #${id} is out for delivery 🚚`;
  }
}

function sendSupport(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const response = document.getElementById("support-response");

  if (name && email && message) {
    response.textContent = `Thanks ${name}, our support team will contact you shortly.`;
  } else {
    response.textContent = "Please fill in all fields.";
  }
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty! Add some products first.");
    return;
  }

  const orderId = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("order-confirmation").textContent =
    `✅ Order placed successfully! Your Order ID is #${orderId}`;

  console.log("Order placed:", cart);

  cart = [];
  updateCart();
}

displayProducts();
