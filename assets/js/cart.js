// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart(productId, productName, productPrice, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
    const productIndex = cart.findIndex(product => product.id === productId);
    if (productIndex === -1) {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
    } else {
        cart[productIndex].quantity += quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng");
    updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
}

// Hàm để hiển thị giỏ hàng
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.getElementById('cart-content'); // Thẻ HTML để hiển thị giỏ hàng
    const totalAmountDisplay = document.getElementById('total-amount'); // Thẻ hiển thị tổng tiền ở phần thanh toán
    let totalAmount = 0; // Tổng tiền
    let totalQuantity = 0; // Tổng số lượng sản phẩm

    // Xóa nội dung cũ
    cartContent.innerHTML = '';

    // Nếu giỏ hàng rỗng
    if (cart.length === 0) {
        cartContent.innerHTML = "<tr><td colspan='5'>Giỏ hàng của bạn đang trống.</td></tr>";
        updateCartDisplay();
        totalAmountDisplay.innerHTML = '$0.00'; // Hiển thị tổng tiền là $0.00 khi giỏ hàng trống
        return;
    }

    // Duyệt qua từng sản phẩm trong giỏ hàng
    cart.forEach((product, index) => {
        const totalPrice = product.price * product.quantity; // Tính thành tiền cho sản phẩm
        totalAmount += totalPrice; // Cộng dồn vào tổng tiền
        totalQuantity += product.quantity; // Cộng dồn vào tổng số lượng

        cartContent.innerHTML += `
            <tr>
                <td class="product__cart__item">
                    <div class="product__cart__item__pic">
                        <img src="img/product/${product.id}.jpg" alt="">
                    </div>
                    <div class="product__cart__item__text">
                        <h6>${product.name}</h6>
                        <h5>$${product.price.toFixed(2)}</h5>
                    </div>
                </td>
                <td class="quantity__item">
                    <div class="quantity">
                        <div class="pro-qty-2">
                            <input type="number" value="${product.quantity}" onchange="updateCart(${index}, this.value)">
                        </div>
                    </div>
                </td>
                <td class="cart__price">$${totalPrice.toFixed(2)}</td>
                <td class="cart__close">
                    <i class="fa fa-close" onclick="removeFromCart(${index})"></i>
                </td>
            </tr>
        `;
    });

    // Hiển thị tổng tiền và số lượng trên header và phần thanh toán
    updateCartDisplay(); // Cập nhật hiển thị tổng tiền và số lượng
    totalAmountDisplay.innerHTML = `$${totalAmount.toFixed(2)}`; // Cập nhật tổng tiền ở phần thanh toán
}
// Hàm để cập nhật số lượng sản phẩm trong giỏ hàng
function updateCart(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (newQuantity <= 0) {
        alert("Số lượng phải lớn hơn 0");
        return;
    }

    if (cart.length > index) {
        cart[index].quantity = parseInt(newQuantity); // Cập nhật số lượng mới
        localStorage.setItem('cart', JSON.stringify(cart)); // Lưu lại vào localStorage
        displayCart(); // Cập nhật lại giỏ hàng sau khi thay đổi
    }
}

// Hàm để xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > index) {
        cart.splice(index, 1); // Xóa sản phẩm theo chỉ mục
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Sản phẩm đã được xóa khỏi giỏ hàng");
        displayCart(); // Cập nhật lại giỏ hàng
    }
}

// Hàm để đặt hàng
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart || cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống");
        return;
    }

    // Giả lập gọi API để đặt hàng
    console.log("Đang xử lý đơn hàng...");

    // Xóa giỏ hàng sau khi đặt thành công
    localStorage.removeItem('cart');
    alert("Đặt hàng thành công!");
    displayCart(); // Cập nhật lại giỏ hàng
}

// Hàm để tính tổng số lượng và tổng tiền giỏ hàng
function updateCartDisplay() {
    const totalQuantity = calculateTotalCartQuantity();
    const totalPrice = calculateTotalCartPrice();

    document.getElementById('cart-count').textContent = totalQuantity; // Cập nhật thẻ hiển thị số lượng
    document.getElementById('cart-total').textContent = `$${totalPrice}`; // Cập nhật thẻ hiển thị tổng tiền
}

// Hàm để tính tổng số lượng sản phẩm trong giỏ hàng
function calculateTotalCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, product) => total + product.quantity, 0);
}

// Hàm để tính tổng tiền trong giỏ hàng
function calculateTotalCartPrice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
}

// Gọi hàm hiển thị giỏ hàng và cập nhật khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    displayCart(); // Hiển thị giỏ hàng khi tải trang
    updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
});
