let user = {
  name: "",
  age: "",
  profession: "",
};

document.getElementById("saveUserInfo").addEventListener("click", function () {
  user.name = document.getElementById("name").value;
  user.age = document.getElementById("age").value;
  user.profession = document.getElementById("profession").value;

  console.log("Kullanıcı Bilgileri:");
  console.log("Ad: " + user.name);
  console.log("Yaş: " + user.age);
  console.log("Meslek: " + user.profession);
});

let cart = [];

function addProductToCart(name, price) {
  cart.push({ name, price });
  console.log(`${name} ürünü sepete eklendi. Fiyat: ${price} TL`);
  updateCartUI();
  logCartToConsole();
}

function calculateTotalPrice() {
  return cart.reduce((total, product) => total + product.price, 0);
}

function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ${product.price} TL`;
    cartList.appendChild(li);
  });

  const totalPrice = calculateTotalPrice();
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

function logCartToConsole() {
  console.log("Sepetiniz:");
  cart.forEach((product) => {
    console.log(`Ürün: ${product.name}, Fiyat: ${product.price} TL`);
  });
  const totalPrice = calculateTotalPrice();
  console.log("Toplam Fiyat: " + totalPrice.toFixed(2) + " TL");
}

function removeProductFromCart(name) {
  let index = cart.findIndex((product) => product.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
    console.log(name + " ürünü sepetteki listeden çıkarıldı.");
  } else {
    console.log(name + " ürünü sepette bulunamadı.");
  }
  updateCartUI();
  logCartToConsole();
}

document.getElementById("add-product").addEventListener("click", function () {
  let productName = document.getElementById("product-name").value;
  let productPrice = parseFloat(document.getElementById("product-price").value);
  addProductToCart(productName, productPrice);
});

document
  .getElementById("remove-product-btn")
  .addEventListener("click", function () {
    let productToRemove = document.getElementById("remove-product").value;
    removeProductFromCart(productToRemove);
  });
