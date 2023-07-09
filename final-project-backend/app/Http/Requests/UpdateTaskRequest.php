<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Rules\ProductManagerValidationRule;

class UpdateTaskRequest extends FormRequest
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
            'project_id' => 'exists:projects,id',
            'product_manager_id' => ['exists:managers,id', new ProductManagerValidationRule],
            'task_title' => 'sometimes|required|string|max:255',
            'task_description' => 'sometimes|required|string|max:255',
            'task_start' => 'sometimes|required|date',
            'task_end' => 'required|date|after:task_start',
            'task_status' => 'sometimes|required|in:notStarted,inProgress,completed',
            'price' => 'numeric|min:0',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ValidationException($validator, response()->json([
            'success' => false,
            'message' => 'Error in Task Update validation',
            'data' => $validator->errors()
        ], 404));
    }
}
