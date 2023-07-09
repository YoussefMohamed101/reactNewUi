<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatGPTController extends Controller
{
    public function ask(Request $request)
    {

        $prompt = $request->input('prompt');

        $response = $this->askToChatGPT($prompt);
       

        return response()->json(['response' => $response]);
    }

    private function askToChatGPT($prompt)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/engines/text-davinci-003/completions', [
            "prompt" => $prompt,
            "max_tokens" => 1000,
            "temperature" => 0.5
        ]);

        return $response->json()['choices'][0]['text'];
    }
}
