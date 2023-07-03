<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\FatoorahServices;

class FatoorahController extends Controller
{

    private $fatoorahServices;

public function __construct(FatoorahServices $fatoorahServices)
{
    // return "hhhhhh";
    $this->fatoorahServices = $fatoorahServices;
}


    public function payOrder()
    {

        $data = [
            'CustomerName' => 'New user',
            'NotificationOption' => 'LNK',
            'MobileCountryCode' => '+966',
            'CustomerMobile' => '0000000000',
            'DisplayCurrencyIso' => 'SAR',
            'CustomerEmail' => 'arabiccreative80@gmail.com',
            'InvoiceValue' => '100',
            'Language' => 'en',
            'CallBackUrl' => env('fatoorah_callback'),
            'ErrorUrl' => env('fatoorah_error'),
        ];
        //table transaction
        //invoice id , user id  
        //add middle ware auth for this function
      return  $this->fatoorahServices->sendPayment($data);

   }
   public function paymentCallBack(request $request){
        $data=[];
        $data['key']=$request->paymentId;
        $data['keyType']='paymentId';
         
        return $data= $this->fatoorahServices->getPaymentStatus($data);
        //search for $data['Data']['InvoiceId']; in table transaction and get user id 
        // do order table store user id and data and mount ...
   }
   public function error(Request $request) {
    // Show error actions
    return response()->json(['status' => 'fail']);
 }
}