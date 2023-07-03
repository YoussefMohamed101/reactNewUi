<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Models\managers;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->project_title,
            'description' => $this->project_description,
            'type' => $this->project_type,
            'start' => $this->project_start,
            'end' => $this->project_end,
            'status' => $this->project_status,
            'budget' => $this->budget,
            'productOnwer' => [
                'id' => $this->ProductOwner->id,
                'name' => $this->ProductOwner->user->name,
                'email' => $this->ProductOwner->user->email,
                'userName' => $this->ProductOwner->user->userName,
            ],
            'ProductManager' => [
                'id' => $this->ProductManager->id,
                'name' => $this->ProductManager->user->name,
                'email' => $this->ProductManager->user->email,
                'userName' => $this->ProductManager->user->userName,

            ],
            'client' => [
                'id' => $this->client->id,
                'name' => $this->client->user->name,
                'email' => $this->client->user->email,
                'userName' => $this->client->user->userName,

            ]
        ];
    }
}
