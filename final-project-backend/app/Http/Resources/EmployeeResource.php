<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\StaffLevelResource;
use App\Models\User;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $Task = $this->task ? new TaskResource($this->task) : null;
        $staff_level = $this->staff_level ? new StaffLevelResource($this->staff_level) : null;
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            // 'user'=>[
            //     'id' => $this->user->id,
            //     'name' => $this->user->name,
            //     'email' => $this->user->email,
            //     'password' => $this->user->password,
            //     'phone' => $this->user->phone,
            //     'address' => $this->user->address,
            //     'joinedDate' => $this->user->joinedDate,
            //     'endDate' => $this->user->endDate,
            //     'profilePic' => $this->user->profilePic,
            // ],
            'task' => $Task,
            'staff_level' => $staff_level

            // 'salayre' => [
            //     'salary-class' => $this->staff_levels->name,
            //     'salary' => $this->staff_levels->salary
            // ],
            // 'task' => [
            //     'title' => $this->task_id->task_title,
            //     'description' => $this->task_id->task_description,
            //     'status' => $this->task_id->task_status,
            // ]
        ];
    }
}
