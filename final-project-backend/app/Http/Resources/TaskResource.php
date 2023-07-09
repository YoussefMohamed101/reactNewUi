<?php

namespace App\Http\Resources;

use App\Models\Employee;
use App\Models\Freelancer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\managers;
use App\Models\User;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $employee = Employee::where('task_id', $this->id)->first();
        $freelancer = Freelancer::where('task_id', $this->id)->first();
        $assigned_to = $employee ? $employee : ($freelancer ? $freelancer : null);
        $assignedToData = $assigned_to ? [
            'id' => $assigned_to->user->id,
            'hisID'=>$assigned_to->id,
            'name' => $assigned_to->user->name,
            'email' => $assigned_to->user->email,
            'userName' => $assigned_to->user->userName,
        ] : null;
        return [
            'id' => $this->id,
            'name' => $this->task_title,
            'description' => $this->task_description,
            'start' => $this->task_start,
            'end' => $this->task_end,
            'price'=>$this->price,
            'status' => $this->task_status,
            'project' => [
                'id' => $this->project->id,
                'name' => $this->project->project_title,
                'type' => $this->project->project_type,
            ],
            'productManager' => [
                'id' => $this->ProductManager->id,
                'name' => $this->ProductManager->user->name,
                'email' => $this->ProductManager->user->email,
                'userName' => $this->ProductManager->user->userName,
            ],
            'assigned_to' => $assignedToData
        ];
    }
}