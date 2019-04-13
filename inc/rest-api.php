<?php
    if (!function_exists("payment_gateway")) {
        function payment_gateway(WP_REST_Request $req) {
            if (!isset($_SERVER['HTTP_REFERER'])) {
                return ['type' => 'ERROR', 'message' => 'Http referer is undefined!'];
            }
            $server_origin = rtrim($_SERVER['HTTP_REFERER'], "/");
            if ($server_origin !== get_site_url()) {
                return ['type' => 'ERROR', 'message' => 'Referer isn\' correct'];
            }
            $store_id = '8CCF79E7266E426C965D';
            $store_pass = '5cdc686cc9c041c191aa529aeb2338f9';
            $name = filter_var($req->get_param('name'), FILTER_SANITIZE_STRING);
            $price = filter_var($req->get_param('price'), FILTER_SANITIZE_NUMBER_FLOAT);
            $token = true;
            if (!$name || !$price || !$token) {
                return ['type' => 'ERROR', 'message' => "One of params isn't filled"];
            }
            $order_id = time();
            $parts_count = 5;
            $response_url = 'https://oplata-academy.pro';
            $redirect_url = 'https://oplata-academy.pro';
            $amount = str_replace('.', '', strval($price));
            $sign = base64_encode(hex2bin(hash('SHA1',
                $store_pass . $store_id . $order_id . $amount . '00' . $parts_count . 'PP' . $response_url . $redirect_url . ($name . '1' . $amount . '00') . $store_pass
            )));
            $body = wp_remote_post('https://payparts2.privatbank.ua/ipp/v2/payment/create', [
                'headers' => [
                    'Content-Type' => 'application/json;charset=utf-8',
                    'Accept' => 'application/json'
                ],
                'body' => '{
                    "storeId": "8CCF79E7266E426C965D",
                    "orderId": "'.$order_id.'",
                    "amount": "'.$amount.'",
                    "partsCount": "5",
                    "merchantType": "PP",
                    "products": [
                      {
                        "name": "'.$name.'",
                        "count": "1",
                        "price": "'.$amount.'"
                      }
                    ],
                    "responseUrl": "https://oplata-academy.pro",
                    "redirectUrl": "https://oplata-academy.pro",
                    "signature": "'.$sign.'"
                  }',
            ]);
            if ($body['response']['code'] === 200 || $body['response']['message'] === 'OK') {
                $response = json_decode($body['body'], true);
                return ['type' => 'SUCCESS', 'message' => 'https://payparts2.privatbank.ua/ipp/v2/payment?token=' . $response['token']];
            } else {
                return ['type' => 'ERROR', 'message' => 'Remote api sent an error!'];
            }
            return $body;
        }

        add_action( "rest_api_init", function () {
			register_rest_route( "brainworks", "payment", array(
				"methods" => "GET",
				"callback" => "payment_gateway",
			) );
		} );
    }
?>