// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// openCart
cartIcon.onclick = () => {
    cart.classList.add('active');
}

// closeCart
closeCart.onclick= () => {
    cart.classList.remove('active');
}

// cartWorking JS
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready();
}

// makingFunction
function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName('remove-cart');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length;i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
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
}
// Buy Button
function buyButtonClicked() {
    // alert('Your Order is Placed')
    // var cartContent = document.getElementsByClassName('cart-content')[0]
    // while (cartContent.hasChildNodes()){
    //     cartContent.removeChild(cartContent.firstChild)
    // }
    // updatetotal();
        // Get the cart items
        const cartItems = document.querySelectorAll('.cart-item');
      
        // Get the order details
        let message = 'Order Details:\n\n';
        for (let i = 0; i < cartItems.length; i++) {
          const itemName = cartItems[i].querySelector('.cart-item-name').innerText;
          const itemQty = cartItems[i].querySelector('.cart-item-quantity').innerText;
          const itemPrice = cartItems[i].querySelector('.cart-item-price').innerText;
          message += `${itemName} x ${itemQty} - ${itemPrice}\n`;
        }
      
        // Send the message to WhatsApp
        const phone = '+919633316673';
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      
        // Clear the cart
        const cartContent = document.querySelector('.cart-content');
        while (cartContent.hasChildNodes()) {
          cartContent.removeChild(cartContent.firstChild);
        }
        updatetotal();
}


 // Remove Items From Cart 
 function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
 }
//  Quantity changes
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
// Add TO Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}


// function addProductToCart(_title, _price, _productImg){
//     var cartShopBox = document.createElement("div");
//     cartShopBox.classList.add("cart-box");
//     var cartItems = document.getElementsByClassName("cart-content")[0];
//     var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
//     for (var i = 0; i < cartItemsNames.length; i++) {
//         alert("You have already add this item to cart");
//         return ;
//     }
// }

//     var cartBoxContent = `<img src="img/product2.jpg" alt="" class="cart-img" />
//                             <div class="detail-box">
//                               <div class="cart-product-title">Earbuds</div>
//                               <div class="cart-price">$25.36</div>
//                               <input type="number" value="1" class="cart-quantity" />
//                             </div>
//                             <i class="bx bxs-trash-alt remove-cart"></i>`;
//     cartShopBox.innerHTML = cartBoxContent;
//     cartItems.append(cartShopBox);
//     cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
//     cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);




function addProductToCart(_title, _price, _productImg) {
    var cartContent = document.querySelector(".cart-content");
    var cartItems = cartContent.querySelectorAll(".cart-box");
    for (var i = 0; i < cartItems.length; i++) {
      var cartProductTitle = cartItems[i].querySelector(".cart-product-title");
      if (cartProductTitle.innerText === _title) {
        alert("This item is already in the cart");
        return;
      }
    }
  
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
  
    var cartBoxContent = `<img src="${_productImg}" alt="" class="cart-img" />
                          <div class="detail-box">
                            <div class="cart-product-title">${_title}</div>
                            <div class="cart-price">${_price}</div>
                            <input type="number" value="1" class="cart-quantity" />
                          </div>
                          <i class="bx bxs-trash-alt remove-cart"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartContent.append(cartShopBox);
  
    cartShopBox
      .querySelector(".remove-cart")
      .addEventListener("click", removeCartItem);
  
    cartShopBox
      .querySelector(".cart-quantity")
      .addEventListener("change", quantityChanged);
  }
  


//  Update Total 
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
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
    
}