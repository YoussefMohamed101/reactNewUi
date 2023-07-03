<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\StaffLevelResource;

class ManagersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $staff_level = $this->staff_level ? new StaffLevelResource($this->staff_level) : null;
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'staff_level' => $staff_level
        ];
    }
}
