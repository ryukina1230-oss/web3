document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 商品データ
    // =========================
    const products = {

        illust1: {
            name: "イラスト1",
            image: "images/illust1.png",
            price: 1500
        },

        illust2: {
            name: "イラスト2",
            image: "images/illust2.png",
            price: 1500
        },

        illust3: {
            name: "イラスト3",
            image: "images/illust3.png",
            price: 1500
        },

        illust4: {
            name: "イラスト4",
            image: "images/illust4.png",
            price: 1500
        },

        illust5: {
            name: "イラスト5",
            image: "images/illust5.png",
            price: 1500
        },

        illust6: {
            name: "イラスト6",
            image: "images/illust6.png",
            price: 1500
        },

        illust7: {
            name: "イラスト7",
            image: "images/illust7.png",
            price: 1500
        },

        illust8: {
            name: "イラスト8",
            image: "images/illust8.png",
            price: 1500
        },

        illust9: {
            name: "イラスト9",
            image: "images/illust9.png",
            price: 1500
        },

        illust10: {
            name: "イラスト10",
            image: "images/illust10.png",
            price: 1500
        },

        illust11: {
            name: "イラスト11",
            image: "images/illust11.png",
            price: 1500
        },


        sutep1: {
            name: "裁縫1",
            image: "images2/sutep1.png",
            price: 3000
        },

        sutep2: {
            name: "裁縫2",
            image: "images2/sutep2.png",
            price: 3000
        },

        sutep3: {
            name: "裁縫3",
            image: "images2/sutep3.png",
            price: 3000
        },

        sutep4: {
            name: "裁縫4",
            image: "images2/sutep4.png",
            price: 3000
        },

        sutep5: {
            name: "裁縫5",
            image: "images2/sutep5.png",
            price: 3000
        },

        sutep6: {
            name: "裁縫6",
            image: "images2/sutep6.png",
            price: 3000
        },

        sutep7: {
            name: "裁縫7",
            image: "images2/sutep7.png",
            price: 3000
        },

        sutep8: {
            name: "裁縫8",
            image: "images2/sutep8.png",
            price: 3000
        },

        sutep9: {
            name: "裁縫9",
            image: "images2/sutep9.png",
            price: 3000
        },

        sutep10: {
            name: "裁縫10",
            image: "images2/sutep10.png",
            price: 3000
        },

        sutep11: {
            name: "裁縫11",
            image: "images2/sutep11.png",
            price: 3000
        },

        sutep12: {
            name: "裁縫12",
            image: "images2/sutep12.png",
            price: 3000
        },

        sutep13: {
            name: "裁縫13",
            image: "images2/sutep13.png",
            price: 3000
        },
        sutep14: {
            name: "裁縫14",
            image: "images2/sutep14.png",
            price: 3000
        },
    };


    // =========================
    // カートを保存
    // =========================
    function getCart() {
        return JSON.parse(localStorage.getItem("siteCart")) || [];
    }


    // =========================
    // カートを保存する
    // =========================
    function saveCart(cart) {
        localStorage.setItem("siteCart", JSON.stringify(cart));
    }


    // =========================
    // カートに商品を追加
    // =========================
    function addToCart(productId) {

        const cart = getCart();

        const existingItem = cart.find(function (item) {
            return item.id === productId;
        });

        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({
                id: productId,
                quantity: 1
            });

        }

        saveCart(cart);

        alert("カートに追加しました♡");

    }


    // =========================
    // カートを表示
    // =========================
    function renderCart() {

        const cart = getCart();

        const cartItems = document.getElementById("purchase-cart-items");
        const emptyMessage = document.getElementById("purchase-cart-empty");
        const totalElement = document.getElementById("purchase-cart-total");

        if (!cartItems || !emptyMessage || !totalElement) {
            return;
        }

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            emptyMessage.style.display = "block";
            totalElement.textContent = "¥0";

            return;

        }

        emptyMessage.style.display = "none";

        let total = 0;

        cart.forEach(function (cartItem) {

            const product = products[cartItem.id];

            if (!product) {
                return;
            }

            const subtotal = product.price * cartItem.quantity;

            total += subtotal;

            const item = document.createElement("div");

            item.className = "purchase-cart-item";

            item.innerHTML = `
        <div class="purchase-cart-item-image">
          <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="purchase-cart-item-name">
          ${product.name}
        </div>

        <div class="purchase-cart-item-price">
          ¥${product.price.toLocaleString()}
        </div>

        <div class="purchase-quantity">

          <button type="button"
                  class="quantity-minus"
                  data-id="${cartItem.id}">
            −
          </button>

          <span>${cartItem.quantity}</span>

          <button type="button"
                  class="quantity-plus"
                  data-id="${cartItem.id}">
            ＋
          </button>

        </div>

        <div class="purchase-cart-item-subtotal">
          ¥${subtotal.toLocaleString()}
        </div>

        <button type="button"
                class="purchase-remove"
                data-id="${cartItem.id}">
          削除
        </button>
      `;

            cartItems.appendChild(item);

        });

        totalElement.textContent = "¥" + total.toLocaleString();

    }


    // =========================
    // ＋ − 削除ボタン
    // =========================
    document.addEventListener("click", function (event) {

        const cart = getCart();

        // ＋
        if (event.target.classList.contains("quantity-plus")) {

            const id = event.target.dataset.id;

            const item = cart.find(function (item) {
                return item.id === id;
            });

            if (item) {
                item.quantity += 1;
            }

            saveCart(cart);
            renderCart();

        }


        // −
        if (event.target.classList.contains("quantity-minus")) {

            const id = event.target.dataset.id;

            const item = cart.find(function (item) {
                return item.id === id;
            });

            if (item) {

                item.quantity -= 1;

                if (item.quantity <= 0) {

                    const index = cart.findIndex(function (item) {
                        return item.id === id;
                    });

                    cart.splice(index, 1);

                }

            }

            saveCart(cart);
            renderCart();

        }


        // 削除
        if (event.target.classList.contains("purchase-remove")) {

            const id = event.target.dataset.id;

            const newCart = cart.filter(function (item) {
                return item.id !== id;
            });

            saveCart(newCart);
            renderCart();

        }

    });


    // =========================
    // 購入手続きへ
    // =========================
    const goCustomer = document.getElementById("go-customer");

    if (goCustomer) {

        goCustomer.addEventListener("click", function () {

            const cart = getCart();

            if (cart.length === 0) {

                alert("カートに商品を入れてください。");
                return;

            }

            showStep(2);

        });

    }


    // =========================
    // ページ切り替え
    // =========================
    function showStep(stepNumber) {

        document.querySelectorAll(".purchase-step").forEach(function (step) {
            step.classList.add("purchase-step-hidden");
        });

        const target = document.getElementById(
            "purchase-step-" +
            ["cart", "customer", "confirm", "complete"][stepNumber - 1]
        );

        if (target) {
            target.classList.remove("purchase-step-hidden");
        }

    }


    // =========================
    // カートへ戻る
    // =========================
    const backCart = document.getElementById("back-cart");

    if (backCart) {

        backCart.addEventListener("click", function () {
            showStep(1);
        });

    }


    // =========================
    // お客様情報 → 確認画面
    // =========================
    const purchaseForm = document.getElementById("purchase-form");

    if (purchaseForm) {

        purchaseForm.addEventListener("submit", function (event) {

            event.preventDefault();

            document.getElementById("confirm-name").textContent =
                document.getElementById("purchase-name").value;

            document.getElementById("confirm-email").textContent =
                document.getElementById("purchase-email").value;

            document.getElementById("confirm-postal").textContent =
                document.getElementById("purchase-postal").value;

            document.getElementById("confirm-address").textContent =
                document.getElementById("purchase-address").value;

            document.getElementById("confirm-phone").textContent =
                document.getElementById("purchase-phone").value;


            // 確認画面の商品
            const cart = getCart();

            const confirmItems =
                document.getElementById("purchase-confirm-items");

            const confirmTotal =
                document.getElementById("purchase-confirm-total");

            confirmItems.innerHTML = "";

            let total = 0;

            cart.forEach(function (cartItem) {

                const product = products[cartItem.id];

                if (!product) {
                    return;
                }

                const subtotal =
                    product.price * cartItem.quantity;

                total += subtotal;

                const item = document.createElement("div");

                item.className = "purchase-confirm-item";

                item.innerHTML = `
          <span class="purchase-confirm-item-name">
            ${product.name}
          </span>

          <span class="purchase-confirm-item-quantity">
            × ${cartItem.quantity}
          </span>

          <span class="purchase-confirm-item-subtotal">
            ¥${subtotal.toLocaleString()}
          </span>
        `;

                confirmItems.appendChild(item);

            });

            confirmTotal.textContent =
                "¥" + total.toLocaleString();

            showStep(3);

        });

    }


    // =========================
    // お客様情報へ戻る
    // =========================
    const backCustomer =
        document.getElementById("back-customer");

    if (backCustomer) {

        backCustomer.addEventListener("click", function () {
            showStep(2);
        });

    }


    // ============================
    // 購入確定・Stripe決済
    // ============================

    const purchaseComplete =
        document.getElementById("purchase-complete");

    if (purchaseComplete) {

        purchaseComplete.addEventListener("click", async function () {

            // カートを取得
            const cart = getCart();

            // カートが空なら処理しない
            if (cart.length === 0) {

                alert("カートに商品がありません。");
                return;
            }

            // ボタンを一時的に変更
            purchaseComplete.disabled = true;
            purchaseComplete.textContent = "決済画面へ移動しています…";

            try {

                // Stripe Checkoutを作成
                const response = await fetch(
                    "create-checkout-session.php",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            items: cart
                        })
                    }
                );

                // PHPから返ってきたデータ
                const data = await response.json();

                // エラーの場合
                if (!response.ok || !data.url) {

                    throw new Error(
                        data.error || "Stripe Checkoutを作成できませんでした。"
                    );
                }

                // Stripe Checkoutへ移動
                window.location.href = data.url;

            } catch (error) {

                console.error(error);

                alert(
                    "決済画面への移動に失敗しました。\n\n" +
                    error.message
                );

                // ボタンを元に戻す
                purchaseComplete.disabled = false;
                purchaseComplete.textContent = "購入を確定する";
            }
        });

    }




    // =========================
    // 詳細ページの
    // 「カートに入れる」ボタン  
    // =========================
    document.addEventListener("click", function (event) {

        if (event.target.classList.contains("add-cart-button")) {

            const productId =
                event.target.dataset.productId;

            if (productId) {
                addToCart(productId);

            }

        }
    })






    // =========================
    // purchase.htmlを開いたとき
    // カートを表示
    // =========================


    renderCart();




    // ============================
    // Stripe決済後の処理
    // ============================




    const paymentParams =
        new URLSearchParams(window.location.search);

    const paymentStatus =
        paymentParams.get("payment");

    if (paymentStatus === "success") {

        // カートを空にする
        localStorage.removeItem("siteCart");

        // 購入完了画面へ
        showStep(4);
    }

    if (paymentStatus === "cancel") {

        alert("決済がキャンセルされました。");

        // カート画面を表示
        showStep(1);
    }





});



