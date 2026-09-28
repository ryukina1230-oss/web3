document.addEventListener("DOMContentLoaded", function () {
    const setupItems = {

        1: {
            title: "裁縫1",
            image: "images2/sutep1.png",
            description: "裁縫作品1の説明文をここに入れます。"
        },

        2: {
            title: "裁縫2",
            image: "images2/sutep2.png",
            description: "裁縫作品2の説明文をここに入れます。"
        },

        3: {
            title: "裁縫3",
            image: "images2/sutep3.png",
            description: "裁縫作品3の説明文をここに入れます。"
        },

        4: {
            title: "裁縫4",
            image: "images2/sutep4.png",
            description: "裁縫作品4の説明文をここに入れます。"
        },

        5: {
            title: "裁縫5",
            image: "images2/sutep5.png",
            description: "裁縫作品5の説明文をここに入れます。"
        },

        6: {
            title: "裁縫6",
            image: "images2/sutep6.png",
            description: "裁縫作品6の説明文をここに入れます。"
        },

        7: {
            title: "裁縫7",
            image: "images2/sutep7.png",
            description: "裁縫作品7の説明文をここに入れます。"
        },

        8: {
            title: "裁縫8",
            image: "images2/sutep8.png",
            description: "裁縫作品8の説明文をここに入れます。"
        },

        9: {
            title: "裁縫9",
            image: "images2/sutep9.png",
            description: "裁縫作品9の説明文をここに入れます。"
        },

        10: {
            title: "裁縫10",
            image: "images2/sutep10.png",
            description: "裁縫作品10の説明文をここに入れます。"
        },

        11: {
            title: "裁縫11",
            image: "images2/sutep11.png",
            description: "裁縫作品11の説明文をここに入れます。"
        },

        12: {
            title: "裁縫12",
            image: "images2/sutep12.png",
            description: "裁縫作品12の説明文をここに入れます。"
        },

        13: {
            title: "裁縫13",
            image: "images2/sutep13.png",
            description: "裁縫作品13の説明文をここに入れます。"
        },

        14: {
            title: "裁縫14",
            image: "images2/sutep14.png",
            description: "裁縫作品14の説明文をここに入れます。"
        }

    };


    // URLの ?id=1 などを取得
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // 該当する裁縫データ
    const item = setupItems[id];

    // HTMLを取得
    const title = document.getElementById("item-title");
    const image = document.getElementById("item-image");
    const description = document.getElementById("item-description");

    // 表示
    if (item) {

        title.textContent = item.title;

        image.src = item.image;
        image.alt = item.title;

        description.textContent = item.description;
    }


    // =========================
    // カートボタン
    // =========================

    const cartButton = document.getElementById("add-cart-button");

    if (cartButton && item) {

        cartButton.addEventListener("click", function () {

            // 今表示している作品のID
            const productId = "sutep" + id;

            // カートを取得
            let cart =
                JSON.parse(localStorage.getItem("siteCart")) || [];


            // すでにカートに入っているか確認
            const existingItem = cart.find(function (cartItem) {
                return cartItem.id === productId;
            });


            // すでに入っている場合
            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                // 新しく追加
                cart.push({
                    id: productId,
                    quantity: 1
                });

            }


            // カートを保存
            localStorage.setItem(
                "siteCart",
                JSON.stringify(cart)
            );


            // purchase.htmlへ移動
            window.location.href = "purchase.html";

        });

    }
});