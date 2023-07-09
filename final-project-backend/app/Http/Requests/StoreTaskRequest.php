<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use App\Rules\ProductManagerValidationRule;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'project_id' => ['required', 'exists:projects,id'],
            // 'product_manager_id' => ['exists:managers,id', new ProductManagerValidationRule],
            'task_title' => 'required|string|max:255',
            'task_description' => 'required|string|max:255',
            'task_start' => 'required|date',
            'task_end' => 'required|date|after:task_start',
            'task_status' => 'required|in:notStarted,inProgress,completed',
            'price' => 'numeric|min:0',
        ];
    }

    public  function  failedValidation(Validator $validator)
    {
        throw  new HttpResponseException(
            response()->json(
                [
                    'success' => false,
                    "message" => "Error in Task validation",
                    "data" => $validator->errors()
                ],
                400

            )
        );
    }
}
