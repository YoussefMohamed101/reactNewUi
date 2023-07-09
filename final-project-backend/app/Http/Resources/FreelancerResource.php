<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;

class FreelancerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $Task = $this->task ? new TaskResource($this->task) : null;
        // $staff_level = $this->staff_level ? new StaffLevelResource($this->staff_level) : null;
        return [
            'id' => $this->id,
            'rate' => $this->rate,
            'status' => $this->Status,
            'balance' => $this->balance,
            'user' => new UserResource($this->user),
            'task' => $Task
        ];
    }
}
