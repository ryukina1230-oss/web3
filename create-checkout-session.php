<?php

require '/home/users/2/gloomy.jp-rizalene/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

try {

    // Stripeの設定を読み込む
    $config = require '/home/users/2/gloomy.jp-rizalene/stripe-config.php';


    // Stripe PHP SDKが読み込まれているか確認
    if (!class_exists('\Stripe\StripeClient')) {

        throw new Exception(
            'Stripe PHP SDKが読み込まれていません。'
        );
    }


    // Stripeを初期化
    $stripe = new \Stripe\StripeClient(
        $config['stripe_secret_key']
    );


    // JavaScriptから送られてきたカート情報を取得
    $input = json_decode(
        file_get_contents('php://input'),
        true
    );


    // カートが空の場合
    if (!$input || empty($input['items'])) {

        http_response_code(400);

        echo json_encode([
            'error' => 'カート情報がありません。'
        ]);

        exit;
    }

    /*
         * ここは後でリーの商品の
         * 商品名・価格・画像などに合わせて設定する
         */

    $products = [

        // =========================
        // イラスト
        // =========================

        'illust1' => [
            'name' => 'イラスト1',
            'price' => 1500
        ],

        'illust2' => [
            'name' => 'イラスト2',
            'price' => 1500
        ],

        'illust3' => [
            'name' => 'イラスト3',
            'price' => 1500
        ],

        'illust4' => [
            'name' => 'イラスト4',
            'price' => 1500
        ],

        'illust5' => [
            'name' => 'イラスト5',
            'price' => 1500
        ],

        'illust6' => [
            'name' => 'イラスト6',
            'price' => 1500
        ],

        'illust7' => [
            'name' => 'イラスト7',
            'price' => 1500
        ],

        'illust8' => [
            'name' => 'イラスト8',
            'price' => 1500
        ],

        'illust9' => [
            'name' => 'イラスト9',
            'price' => 1500
        ],

        'illust10' => [
            'name' => 'イラスト10',
            'price' => 1500
        ],

        'illust11' => [
            'name' => 'イラスト11',
            'price' => 1500
        ],

        // =========================
        // 裁縫
        // =========================

        'sutep1' => [
            'name' => '裁縫1',
            'price' => 3000
        ],

        'sutep2' => [
            'name' => '裁縫2',
            'price' => 3000
        ],

        'sutep3' => [
            'name' => '裁縫3',
            'price' => 3000
        ],

        'sutep4' => [
            'name' => '裁縫4',
            'price' => 3000
        ],

        'sutep5' => [
            'name' => '裁縫5',
            'price' => 3000
        ],

        'sutep6' => [
            'name' => '裁縫6',
            'price' => 3000
        ],

        'sutep7' => [
            'name' => '裁縫7',
            'price' => 3000
        ],

        'sutep8' => [
            'name' => '裁縫8',
            'price' => 3000
        ],

        'sutep9' => [
            'name' => '裁縫9',
            'price' => 3000
        ],

        'sutep10' => [
            'name' => '裁縫10',
            'price' => 3000
        ],

        'sutep11' => [
            'name' => '裁縫11',
            'price' => 3000
        ],

        'sutep12' => [
            'name' => '裁縫12',
            'price' => 3000
        ],

        'sutep13' => [
            'name' => '裁縫13',
            'price' => 3000
        ],

        'sutep14' => [
            'name' => '裁縫14',
            'price' => 3000
        ],
    ];

    $lineItems = [];

    foreach ($input['items'] as $item) {

        $id = $item['id'] ?? '';
        $quantity = (int)($item['quantity'] ?? 1);

        if ($quantity < 1) {
            $quantity = 1;
        }



        if (!isset($products[$id])) {
            http_response_code(400);
            echo json_encode([
                'error' => '商品が見つかりません: ' . $id
            ]);
            exit;
        }

        $product = $products[$id];

        $lineItems[] = [
            'price_data' => [
                'currency' => 'jpy',
                'product_data' => [
                    'name' => $product['name']
                ],
                'unit_amount' => $product['price']
            ],
            'quantity' => $quantity
        ];
    }

    // Stripe Checkoutを作成
    $checkoutSession = $stripe->checkout->sessions->create([
        'mode' => 'payment',
        'line_items' => $lineItems,

        'success_url' =>
        'https://rizalene.gloomy.jp/purchase.html?payment=success&session_id={CHECKOUT_SESSION_ID}',

        'cancel_url' =>
        'https://rizalene.gloomy.jp/purchase.html?payment=cancel'
    ]);

    echo json_encode([
        'url' => $checkoutSession->url
    ]);
} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
