<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
            'nationalID' => $this->nationalID,
            'phone' => $this->phone,
            'address' => $this->address,
            'joinedDate' => $this->joinedDate,
            'endDate' => $this->endDate,
            'profilePic' => $this->profilePic,
            'country' => $this->country,
            'skills' => $this->skills,
            'userName'=>$this->userName,
            'gender'=>$this->gender
        ];
    }
}
