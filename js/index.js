// Cart
const cartIcon = document.querySelector('.cart-icon');
// const cartIcon1 = document.querySelector('#cart-icon1');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');


function toggleActive(){
  if(cart.classList.contains('active')){
    cart.classList.remove('active');
  } else {
    cart.classList.add('active');
  }
};


cartIcon.addEventListener('click', toggleActive);
closeCart.addEventListener('click', toggleActive);

// But old is better 

// // openCart
// cartIcon.onclick = () => {
//     cart.classList.add('active');
// }
// // closeCart
// closeCart.onclick= () => {
//     cart.classList.remove('active');
// }

// cartWorking JS

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready();
}

// ready();

// makingFunction
function ready() {
    // Remove Items From Cart
    // var removeCartButtons = document.getElementsByClassName('remove-cart');
    var i = 1;
    console.log(`\n ${i} `+"heet ");
    // for (var i = 0; i < removeCartButtons.length;i++) {
    //   console.log('\n '+i);
    //   var button = removeCartButtons[i];
    //     button.addEventListener('click', removeCartItem);
    // }
    // Quantity Changes 
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add To Cart 
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length;i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    // Buy Button Work
    document
      .getElementsByClassName('btn-buy')[0]
      .addEventListener('click', buyButtonClicked);
};

// Buy Button
function buyButtonClicked() {
    const cartItems = document.getElementsByClassName('cart-box');
    let message = 'Order Details:\n\n';
    let totalAmount = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const itemName = cartItems[i].querySelector('.cart-product-title').innerText;
      const itemQty = cartItems[i].querySelector('.cart-quantity').value;
      const itemPrice = cartItems[i].querySelector('.cart-price').innerText;
      const itemTotal = parseFloat(itemPrice.replace('$', '')) * itemQty;
      totalAmount += itemTotal;
      message += `${itemName} x ${itemQty} - ${itemPrice} = ${itemTotal}\n`;
    }
    totalAmount = Math.round(totalAmount * 100) / 100;
    message += `\nTotal Amount: ${totalAmount}`;
    const phone = '+919633316673';
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    const cartContent = document.querySelector('.cart-contents');
    while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
  };
   
 // Remove Items From Cart 
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    console.log();
    // NearCart.getElementsByClassName('cartBox')[0].remove();
    console.log("Success!...");
    updatetotal();
};

//  Quantity changes
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
};
// Add To Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement.parentElement.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
};

// carts item  here from 6-8

function addProductToCart(_title, _price, _productImg) {
  var cartContent = document.querySelector(".cart-contents");
var cartItems = cartContent.querySelectorAll(".cartBox");
    for (var i = 0; i < cartItems.length; i++) {
      var cartProductTitle = cartItems[i].querySelector(".cart-product-title");
      if (cartProductTitle.innerText === _title) {
        alert("This item is already in the cart");
        return;
      }
    }
  
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cartBox");
  
    var cartBoxContent = `<div class="cart-box flex flex-col md:flex-row md:gap-4">
    <div class="w-full bg-white px-5 py-3">
      <div class="flex mt-5 mb-3 space-x-4">
        <div class="w-3/5 flex flex-col">
          <img src="${_productImg}" alt="Product image" class="w-full h-30 object-cover object-center mb-3 rounded-lg">
        </div>
        <div class="w-4/5 flex flex-col justify-between">
          <div class="w-full flex-col">
            <h3 class="font-semi text-lg cart-product-title">${_title}</h3>
            <p class="text-gray-500 text-sm">Large • XL </p>
            <p class="text-gray-500 text-sm"><span class="font-semi text-black cart-price">${_price}</span></p>
            <select class="cart-quantity border rounded-md p-1 pr-4 text-gray-600 focus:outline-none">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <p class="flex items-center text-gray-500 text-sm">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" class="text-green-400" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4l7-7"></path>
              </svg>
              In stock
            </p>
          </div>
        </div>
      <div class="remove-cart">
        <button class=" hidden md:inline bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-md p-2 mt-3">
          <span class="hidden md:inline">Remove</span>
        </button>
        <div>
          <button class="md:hidden text-white font-medium text-sm rounded-md p-2 mt-2">
            <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>`;



    // var cartBoxContent = `<img src="${_productImg}" alt="" class="cart-img" />
    //                       <div class="detail-box">
    //                         <div class="cart-product-title">${_title}</div>
    //                         <div class="cart-price">${_price}</div>
    //                         <input type="number" value="1" class="cart-quantity" />
    //                       </div>
    //                       <i class="bx bxs-trash-alt remove-cart"></i>`;


    cartShopBox.innerHTML = cartBoxContent;
    cartContent.append(cartShopBox);

    cartShopBox
      .querySelector(".remove-cart")
      .addEventListener("click", removeCartItem);
  
    cartShopBox
      .querySelector(".cart-quantity")
      .addEventListener("change", quantityChanged);
  };


//  Update Total 
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-contents')[0];
    var cartBoxes = cartContent.getElementsByClassName('cartBox');
    var total = 0;
    for (var i =0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$',''));
        var quantity = quantityElement.value;
        total = total + ( price * quantity );
    }
        // if price Contain some Cents Value
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
};
