$(function () {
    /*-----------ハンバーガ―メニュー-----------------*/

    // ハンバーガーメニューをクリックした時
    $(".menu-btn").on("click", function () {
        // toggleClassを使用することで、hamburgerクラスにactiveクラスが存在する場合は消去、
        // 存在しない場合を追加する処理を自動で行ってくれる
        $("header").toggleClass("open");
    });

    // #maskのエリアをクリックした時にメニューを閉じる
    $(".mask").on("click", function () {
        // #maskをクリックした時に実行する
        $("header").removeClass("open");

    });


    // メニューのリンクをクリックした時
    $(".nav-menu").on("click", function () {
        $("header").removeClass("open");
    });

    /*-----------------------------------------------
    トップに戻る
    -----------------------------------------------*/
    let pagetop = $(".to-top");
    // 最初に画面が表示された時は、トップに戻るボタンを非表示に設定
    pagetop.hide();

    // スクロールイベント（スクロールされた際に実行）
    $(window).scroll(function () {
        // スクロール位置が700pxを超えた場合
        if ($(this).scrollTop() > 600) {
            // トップに戻るボタンを表示する
            pagetop.fadeIn();

            // スクロール位置が700px未満の場合
        } else {
            // トップに戻るボタンを非表示にする
            pagetop.fadeOut();
        }
    });

    // クリックイベント（ボタンがクリックされた際に実行）
    pagetop.click(function () {
        // 0.5秒かけてページトップへ移動
        $("body,html").animate({ scrollTop: 0 }, 500);

        // イベントが親要素へ伝播しないための記述
        // ※詳しく知りたい方は「イベント　バブリング」または「jQuery バブリング」で調べてみてください
        return false;
    });


    /*------------------------contct------------------------------*/
    const form = document.getElementById("contactForm");
    const button = document.getElementById("sendButton");
    const message = document.getElementById("formMessage");

    form.addEventListener("submit", async function (e) {

        // 普通のページ移動を止める
        e.preventDefault();

        // ボタンを変更
        button.value = "送信中...";
        button.disabled = true;

        const formData = new FormData(form);

        try {

            const response = await fetch(
                "https://formsubmit.co/Rizalene-huyuka-@outlook.jp",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                message.textContent = "送信しました！ありがとうございます。";

                form.reset();

                button.value = "送信";

            } else {

                throw new Error("送信に失敗しました");

            }

        } catch (error) {

            message.textContent =
                "送信できませんでした。もう一度お試しください。";

            button.value = "送信";

            console.error(error);

        } finally {

            button.disabled = false;

        }

    });

});

$(window).scroll(function () {
    $(".sub-coment").each(function () {

        var scroll = $(window).scrollTop();

        var target = $(this).offset().top;

        var windowHeight = $(window).height();

        if (scroll > target - windowHeight + $(this).outerHeight()) {
            // outerHeight()はpaddingを含めた高さを取得する
            $(this).addClass("slide-right");
        }
    });
});



/*----------------------------------アイテム------------------------------------*/

const items = {

    1: {
        title: "イラスト1",
        image: "images/illust1.png",
        description: `
            実際にパソコンを使った当初に作ってみたものです。<br>
            使い方もいまいちだった時のものですが、思いついて描いてみました！！<br>
            でも、描いていてすごい楽しかったです！
        `
    },

    2: {
        title: "イラスト2",
        image: "images/illust2.png",
        description: "イラスト2の説明文をここに入れます。"
    },

    3: {
        title: "イラスト3",
        image: "images/illust3.png",
        description: "イラスト3の説明文をここに入れます。"
    },

    4: {
        title: "イラスト4",
        image: "images/illust4.png",
        description: "イラスト4の説明文をここに入れます。"
    },

    5: {
        title: "イラスト5",
        image: "images/illust5.png",
        description: "イラスト5の説明文をここに入れます。"
    },

    6: {
        title: "イラスト6",
        image: "images/illust6.png",
        description: "イラスト6の説明文をここに入れます。"
    },

    7: {
        title: "イラスト7",
        image: "images/illust7.png",
        description: "イラスト7の説明文をここに入れます。"
    },

    8: {
        title: "イラスト8",
        image: "images/illust8.png",
        description: "イラスト8の説明文をここに入れます。"
    },

    9: {
        title: "イラスト9",
        image: "images/illust9.png",
        description: "イラスト9の説明文をここに入れます。"
    },

    10: {
        title: "イラスト10",
        image: "images/illust10.png",
        description: "イラスト10の説明文をここに入れます。"
    },

    11: {
        title: "イラスト10",
        image: "images/illust11.png",
        description: "イラスト11の説明文をここに入れます。"
    },

};


// URLの「?id=1」の数字を取得
const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// 該当する作品を取得
const item = items[id];


// 作品が存在する場合
if (item) {

    document.getElementById("item-title").textContent = item.title;

    const image = document.getElementById("item-image");

    image.setAttribute("src", item.image);
    image.setAttribute("alt", item.title);

    document.getElementById("item-description").innerHTML =
        item.description;

}



// =========================
// カートボタン
// =========================

const cartButton = document.getElementById("add-cart-button");

if (cartButton && item) {

    cartButton.addEventListener("click", function () {

        // 今表示しているイラストのID
        const productId = "illust" + id;

        // 現在のカートを取得
        let cart =
            JSON.parse(localStorage.getItem("siteCart")) || [];


        // すでにカートに入っているか確認
        const existingItem = cart.find(function (cartItem) {
            return cartItem.id === productId;
        });


        // すでに入っていたら数量を1つ増やす
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