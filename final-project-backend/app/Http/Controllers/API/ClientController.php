<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Models\User;


class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'checkUser:Admin'])->only('store', 'update', 'destroy');
    }
    public function index()
    {
        try {
            $client = Client::all();
            return ClientResource::collection($client);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found client collection',
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $salary = Client::create($request->all());
        return new ClientResource($salary);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $project = Client::findOrFail($id);
            return new ClientResource($project);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['error' => 'client not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreClientRequest $request, string $id)
    {
        try {
            $client = Client::findOrFail($id);
            $client->update($request->all());

            return new ClientResource($client);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if client is exist and check it is validation'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $client = Client::findOrFail($id);
            User::find($client->user->id)->delete();
            // $client->delete();
            return response()->json([
                'success' => "user deleted"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if client is exist '
            ], 404);
        }
    }
}
