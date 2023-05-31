// Modal
let cartModal = document.getElementById("myModal");
let cartButton = document.getElementById("cart");
let closeButton = document.getElementsByClassName("close")[0];
let close_footer = document.getElementsByClassName("close-footer")[0];
let orderButton = document.getElementsByClassName("order")[0];
let cartQuantity = document.getElementsByClassName("cart-quantity")[0];
let cartTotalPrice = document.getElementsByClassName("total-price")[0];
let  quantityPlus = "quantity-right-plus";
let quantityMinus = "quantity-left-minus";

// Display & Hide the CartModal section
cartButton.addEventListener("click", function () {
	cartModal.style.display = "block";
	UpdateCart();
});

closeButton.onclick = function () {
	cartModal.style.display = "none";
};

close_footer.onclick = function () {
	cartModal.style.display = "none";
};

window.onclick = function (event) {
	// Fix cannot hide the cartModal
	if (event.target == cartModal || event.target.classList.contains("no-gutters"))
    {
		cartModal.style.display = "none";
	}
};

// Cart main events & functions
orderButton.onclick = function () {
	alert("Cảm ơn bạn đã thanh toán đơn hàng");
};

let addToCartButtonList = document.getElementsByClassName("add-to-cart");
for (let i = 0; i < addToCartButtonList.length; i++) {
	let addToCartButton = addToCartButtonList[i];

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
		// modal.style.display = "block";
		UpdateCart();
	});
}

function AddItemToCart(productTitle, productPrice, productImgURL) {
	let cartClassList =
    [
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
	let cartItemList = document.getElementsByClassName("cart-body")[0];
	let cartItemTitles = cartItemList.getElementsByClassName("cart-item-title");
	for (let i = 0; i < cartItemTitles.length; i++) {
		if (cartItemTitles[i].innerText == productTitle) {
			alert("Sản Phẩm Đã Có Trong Giỏ Hàng");
			return;
		}
	}

	let cartRowContent = `
        <div class="d-flex flex-row">
            <img class="rounded cart-img" src="${productImgURL}" alt="1" />
            <div class="ml-2">
                <span class="cart-item-title text-left font-weight-bold d-block text-dark">${productTitle}</span>
                <span class="text-left spec font-weight-bold">256GB, Navy Blue</span>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center">
            <span class="quantity-input">
                <button type="button" class="quantity-left-minus btn btn-light" onclick="ChangeQuantity(event);">
                    <i class="icon-minus"></i>
                </button>
                <input class="cart-quantity-input text-muted font-weight-bold rounded" type="number" value="2">
                <button type="button" class="quantity-right-plus btn btn-light" onclick="ChangeQuantity(event);">
                    <i class="icon-plus"></i>
                </button>
            </span>
            <span class="d-block px-4 font-weight-bold">$<span class="item-price">${productPrice}</span></span>
            <span class="remove-item">
                <i class="icon-trash mr-2 h5 text-black-50"></i>
            </span>
        </div>
    `;
	newCartRow.innerHTML = cartRowContent;
	cartItemList.append(newCartRow);

	newCartRow
		.getElementsByClassName("cart-quantity-input")[0]
		.addEventListener("change", function (event) {
			let input = event.target;
			if (isNaN(input.value) || input.value <= 0) {
				input.value = 1;
			}
			UpdateCart();
		});
}

cartModal.addEventListener("click", function (event) {
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
		UpdateCart();
	}
});


function ChangeQuantity(event) {
    let changeButton = event.target;
    if(changeButton.nodeName != 'BUTTON') changeButton = changeButton.parentElement;
    let isPlus = false;
    changeButton.classList.forEach(element => {
        if(element == quantityPlus) {
            isPlus = true;
        }
    });

    let quantityInputSection = changeButton.parentElement;
    let quantityInput = quantityInputSection.getElementsByClassName("cart-quantity-input")[0];
    let inputValue = quantityInput.value;
    if(isPlus) {
        inputValue++;
        quantityInput.value = inputValue;
    }
    else {
        inputValue--;
        if (isNaN(inputValue) || inputValue <= 0) {
			quantityInput.value = 1;
		}
        else quantityInput.value = inputValue;
    }
    UpdateCart();
}

// update cart
function UpdateCart() {
	let cartBody = document.getElementsByClassName("cart-body")[0];
	let cartItemList = cartBody.getElementsByClassName("cart-item");
	let total = 0;
	for (let i = 0; i < cartItemList.length; i++) {
		let cartItem = cartItemList[i];
		let itemPrice = cartItem.getElementsByClassName("item-price")[0];
		let quantity_item = cartItem.getElementsByClassName("cart-quantity-input")[0];
		let price = parseFloat(itemPrice.innerText); // chuyển một chuổi string sang number để tính tổng tiền.
		let quantity = quantity_item.value; // lấy giá trị trong thẻ input
		total += price * quantity;
	}
    cartTotalPrice.innerText = total + " VNĐ";
	// Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].
}
// thay đổi số lượng sản phẩm
let quantity_input = document.getElementsByClassName("cart-quantity-input");
for (let i = 0; i < quantity_input.length; i++) {
	let input = quantity_input[i];
	input.addEventListener("change", function (event) {
		let input = event.target;
		if (isNaN(input.value) || input.value <= 0) {
			input.value = 1;
		}
		UpdateCart();
	});
}
