<?php

namespace App\Http\Controllers\API;

use App\Models\Project;
use App\Models\Client;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Omnipay\Omnipay;
use App\Models\PaymentPaypal;

class PayPalController extends Controller
{
    private $gateway;

    public function __construct()
    {
        // $this->middleware(['auth:sanctum', 'checkUser:Client, Admin']);


        $this->gateway = Omnipay::create('PayPal_Rest');
        $this->gateway->setClientId(env('PAYPAL_CLIENT_ID'));
        $this->gateway->setSecret(env('PAYPAL_SECRET'));
        $this->gateway->setTestMode(true);
    }

    public function pay(Request $request)
    {


        try {

            $amount = $request->amount;
            $project_id = $request->project_id;
            $user_id = $request->user_id;


            $response = $this->gateway->purchase([
                'amount' => $request->amount,
                'currency' => env('PAYPAL_CURRENCY'),
                'returnUrl' => url('/api/paypal/success') . '?amount=' . $amount . '&project_id=' . $project_id . '&user_id=' . $user_id,
                'cancelUrl' => route('paypal.error')
            ])->send();

            if ($response->isRedirect()) {

                return response()->json([
                    'redirectUrl' => $response->getRedirectUrl(),
                    // 'paymentId' => $response->getTransactionReference(),
                ]);
            } else {
                return response()->json([
                    'error' => $response->getMessage()
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }
    }

    public function success(Request $request)
    {

        // $client_id = Client::where
        // $client = Client::where('user_id', $request->user_id)->first();

        $paymentId = $request->input('paymentId');

        $payment = PaymentPaypal::where('transaction_reference', $paymentId)->first();

        if ($payment) {
            return response()->json([
                'success' => true,
                'message' => 'Payment is already processed.',
            ]);
        }

        if ($request->input('paymentId') && $request->input('PayerID')) {
            $transaction = $this->gateway->completePurchase(array(
                'payerId' => $request->input('PayerID'),
                'transactionReference' => $request->input('paymentId')
            ));


            $response = $transaction->send();

            // dd($response->isSuccessful());
            if ($response->isSuccessful()) {
                $arr = $response->getData();
                $payment = new PaymentPaypal();

                $payment->project_id = $request->project_id;
                $payment->user_id = $request->user_id;
                $payment->amount = $request->amount;
                $payment->transaction_reference = $request->paymentId;
                $payment->save();

                $project = Project::findOrFail($payment->project_id);
                $project->is_payed = true;
                $project->update();
                return redirect('http://localhost:3000/client/payment/success');
            } else {

                return $response->getMessage();
            }
        } else {
            return redirect('http://localhost:3000/client/payment/failed');
        }
    }





    public function error(Request $request)
    {
        return redirect('http://localhost:3000/error');
    }
}
