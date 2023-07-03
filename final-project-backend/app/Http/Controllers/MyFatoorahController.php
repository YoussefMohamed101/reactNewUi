<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use AymanElmalah\MyFatoorah\Facades\MyFatoorah;


class MyFatoorahController extends Controller
{

public function index() {
     $data = [
       'CustomerName' => 'New user',
       'NotificationOption' => 'all',
       'MobileCountryCode' => '+966',
       'CustomerMobile' => '0000000000',
       'DisplayCurrencyIso' => 'SAR',
       'CustomerEmail' => 'test@test.test',
       'InvoiceValue' => '100',
       'Language' => 'en',
       'CallBackUrl' => 'http://127.0.0.1:8000/api/payment/callback',
       'ErrorUrl' => env('fatoorah_error'),
   ];

// If you want to set the credentials and the mode manually.
//    $myfatoorah = MyFatoorah::setAccessToken($token)->setMode('test')->createInvoice($data);

// And this one if you need to access token from config
   $myfatoorah = MyFatoorah::createInvoice($data);

 // when you got a response from myFatoorah API, you can redirect the user to the myfatoorah portal
 return response()->json($myfatoorah);
}

public function callback(Request $request) {
    $myfatoorah = MyFatoorah::payment($request->paymentId);

    // It will check that payment is success or not
    // return response()->json($myfatoorah->isSuccess());

    // It will return payment response with all data
    return response()->json($myfatoorah->get());
 }

 public function error(Request $request) {
    // Show error actions
    return response()->json(['status' => 'fail']);
 }

}