// Modal Button section
let cartButton = document.getElementById("cartButton");
let closeButton = document.getElementsByClassName("close")[0];
// Modal components section
let cartModal = document.getElementById("cartModal");
let cartHeader = cartModal.getElementsByClassName("header-message")[0];
let cartBody = cartModal.getElementsByClassName("cart-body")[0];
let cartFooter = cartModal.getElementsByClassName("cart-footer")[0];
let cartCloseFooter = document.getElementsByClassName("close-footer")[0];
let orderButton = document.getElementsByClassName("order")[0];
// Cart Row components section
let cartTotalRow = document.getElementsByClassName("cart-total")[0];
let quantityPlus = "quantity-right-plus";
let quantityMinus = "quantity-left-minus";
let cartIsEmpty = false;

// Display & Hide the CartModal section
cartButton.addEventListener("click", function () {
	cartModal.style.display = "block";
	CheckCartIfEmpty();
	UpdateCartTotalPrice();
});

closeButton.onclick = function () {
	cartModal.style.display = "none";
};

cartCloseFooter.onclick = function () {
	cartModal.style.display = "none";
};

window.onclick = function (event) {
	// Fix cannot hide the cartModal
	if (
		event.target == cartModal ||
		event.target.classList.contains("no-gutters")
	) {
		cartModal.style.display = "none";
	}
};

const NotEmptyHeaderMessage = `Bạn có <span class="cart-quantity text-muted">4</span> <span class="text-muted">sản phẩm</span> trong Order`;
const EmptyHeaderMessage = `<span>Đơn hàng <span class="text-muted">đang trống</span></span>`;
// Cart main events & functions
function CheckCartIfEmpty() {
	let hiddenClass = "invisible";
	let cartItemList = cartBody.getElementsByClassName("cart-item");
	if (cartItemList.length > 0) {
		cartFooter.classList.remove(hiddenClass);
		cartIsEmpty = false;
		cartHeader.innerHTML = NotEmptyHeaderMessage;
	} else {
		cartFooter.classList.add(hiddenClass);
		//cartFooter.getElementsByClassName("d-flex")[0].style.display = "none!important";
		cartIsEmpty = true;
		cartHeader.innerHTML = EmptyHeaderMessage;
	}
}

orderButton.onclick = function () {
	alert("Cảm ơn bạn đã thanh toán đơn hàng");
};

let addToCartButtonList = document.getElementsByClassName("add-to-cart");
for (const element of addToCartButtonList) {
	let addToCartButton = element;

	//Add event to add new product
	addToCartButton.addEventListener("click", function (event) {
		let button = event.target;
		let product = button.parentElement.parentElement;
		let img =
			product.parentElement.getElementsByClassName("product-img")[0];
		let style = window.getComputedStyle(img);
		let backgroundImage = style.getPropertyValue("background-image");
		let imgUrl = backgroundImage.slice(4, -1).replace(/"/g, "");

		let title =
			product.getElementsByClassName("content-product-h3")[0].innerText;
		let price = product.getElementsByClassName("price")[0].innerText;
		AddItemToCart(title, price, imgUrl);
		UpdateCartTotalPrice();
	});
}

function AddItemToCart(productTitle, productPrice, productImgURL) {
	let cartClassList = [
		"d-flex",
		"justify-content-between",
		"align-items-center",
		"mt-3",
		"p-2",
		"cart-item",
		"rounded"
	];

	// Create new Cart Row for AddToCart product
	let newCartRow = document.createElement("div");
	cartClassList.forEach((element) => newCartRow.classList.add(element));
	// Get the Cart body to add Product
	let cartItemTitles = cartBody.getElementsByClassName("cart-item-title");
	for (const element of cartItemTitles) {
		if (element.innerText == productTitle) {
			alert("Sản Phẩm Đã Có Trong Giỏ Hàng");
			return;
		}
	}

	let cartRowContent = `
        <div class="d-flex flex-row cart-left-item">
            <img class="rounded cart-img" src="${productImgURL}" alt="1" />
            <div class="ml-3 d-flex flex-column align-self-center text-left font-weight-bold">
                <span class="cart-item-title d-block text-dark">${productTitle}</span>
                <span class="d-block font-weight-bold small">Price: <span class="item-price">${productPrice}</span> VND</span>
                <span class="d-block font-weight-bold small">Total: <span class="item-total-price">${productPrice}</span> VND</span>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center cart-right-item">
            <span class="quantity-input d-flex" onchange="ChangeInputQuantity(event);">
				<button type="button" class="quantity-left-minus btn btn-light d-flex align-self-center" onclick="ChangeQuantity(event);">
					<i class="icon-minus"></i>
				</button>
				<input class="cart-quantity-input text-muted bg-light text-center font-weight-bold rounded" type="number" value="1">
				<button type="button" class="quantity-right-plus btn btn-light d-flex align-self-center" onclick="ChangeQuantity(event);">
					<i class="icon-plus"></i>
				</button>
            </span>
            <span class="remove-item">
                <i class="icon-trash px-2 h5 text-black-50"></i>
            </span>
        </div>
    `;
	newCartRow.innerHTML = cartRowContent;
	cartBody.append(newCartRow);

	newCartRow
		.getElementsByClassName("cart-quantity-input")[0]
		.addEventListener("change", function (event) {
			let quantityInput = event.target;
			// Checking the quantity and update current item-total-price
			if (isNaN(quantityInput.value) || quantityInput.value <= 0) {
				quantityInput.value = 1;
			}
			UpdateCartTotalPrice();
		});
}

function RemoveCartItem(event) {
	let isRemoveItemButton = false;
	let removeItemButton = null;
	event.target.classList.forEach((element) => {
		switch (element) {
			case "remove-item":
				removeItemButton = event.target;
				isRemoveItemButton = true;
				break;
			case "icon-trash":
				removeItemButton = event.target.parentElement;
				isRemoveItemButton = true;
				break;
		}
	});

	if (isRemoveItemButton) {
		removeItemButton.parentElement.parentElement.remove();
		CheckCartIfEmpty();
		UpdateCartTotalPrice();
	}
}

function ChangeInputQuantity(event) {
	let quantityInput = event.target;
	let quantityInputSection = quantityInput.parentElement;
	let currentCartItem = quantityInputSection.parentElement.parentElement;

	let itemUnitPrice = currentCartItem.getElementsByClassName("item-price")[0];
	let currentItemTotalPrice =
		currentCartItem.getElementsByClassName("item-total-price")[0];
	// Checking the quantity and update current item-total-price
	if (isNaN(quantityInput.value) || quantityInput.value <= 0) {
		quantityInput.value = 1;
	}
	// Calculate and update item-total-price
	currentItemTotalPrice.innerText =
		itemUnitPrice.innerText * quantityInput.value;
}

function ChangeQuantity(event) {
	let changeButton = event.target;
	if (changeButton.nodeName != "BUTTON")
		changeButton = changeButton.parentElement;
	let isPlus = false;
	changeButton.classList.forEach((element) => {
		if (element == quantityPlus) {
			isPlus = true;
		}
	});

	let quantityInputSection = changeButton.parentElement;
	let quantityInput = quantityInputSection.getElementsByClassName(
		"cart-quantity-input"
	)[0];
	let inputValue = quantityInput.value;

	let currentCartItem = quantityInputSection.parentElement.parentElement;
	let itemUnitPrice = currentCartItem.getElementsByClassName("item-price")[0];
	let currentItemTotalPrice =
		currentCartItem.getElementsByClassName("item-total-price")[0];
	if (isPlus) {
		inputValue++;
		quantityInput.value = inputValue;
	} else {
		inputValue--;
		if (isNaN(inputValue) || inputValue <= 0) {
			quantityInput.value = 1;
		} else quantityInput.value = inputValue;
	}
	currentItemTotalPrice.innerText =
		itemUnitPrice.innerText * quantityInput.value;
	UpdateCartTotalPrice();
}

// Update cart if has any change from cart item quantity
let quantityInputs = document.getElementsByClassName("cart-quantity-input");
for (const element of quantityInputs) {
	let input = element;
	input.addEventListener("change", function (event) {
		let input = event.target;
		if (isNaN(input.value) || input.value <= 0) {
			input.value = 1;
		}
		UpdateCartTotalPrice();
	});
}

// Update cart function
function UpdateCartTotalPrice() {
	let cartItemList = cartBody.getElementsByClassName("cart-item");
	let cartQuantity = cartHeader.getElementsByClassName("cart-quantity")[0];
	if (!cartIsEmpty) cartQuantity.innerText = cartItemList.length;
	let total = 0;
	for (const element of cartItemList) {
		let cartItem = element;
		let priceItem = cartItem.getElementsByClassName("item-price")[0];
		let quantityItem = cartItem.getElementsByClassName(
			"cart-quantity-input"
		)[0];
		// Parse the string from input to number for calculating total price
		let price = parseFloat(priceItem.innerText);
		let quantity = quantityItem.value;
		total += price * quantity;
	}
	let cartTotalPrice = cartTotalRow.getElementsByClassName("total-price")[0];

	// Set total price to cartTotal
	if (total == 0) cartTotalPrice.innerText = 0 + " VNĐ";
	else cartTotalPrice.innerText = total + " VNĐ";
}
