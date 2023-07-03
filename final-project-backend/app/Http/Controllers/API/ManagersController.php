<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\StoreManagersRequest;
use App\Http\Requests\UpdateManagersRequest;
use App\Http\Resources\ManagersResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Models\Manager;
use App\Models\User;


class ManagersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'checkUser:Admin'])->only('store', 'update', 'destroy');
    }
    public function index(string $type)
    {
        $managers = [];
        // return Managers::all();
        try {
            $users = User::where('role', $type)->get();
            foreach ($users as $user) {
                $manager = Manager::where('user_id', $user->id)->first();
                array_push($managers, $manager);
            }
            // return $managers;
            return ManagersResource::collection($managers);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found mangers collection',
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreManagersRequest $request)
    {

        $manager = Manager::create($request->all());

        return $manager;
    }

    /**
     * Display the specified resource.
     */
    public function show(Manager $manager)
    {
        if ($manager) {

            return  new ManagersResource($manager);
        }
        return  new Response('', 205);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateManagersRequest $request, Manager $manager)
    {
        // $manager = Managers::update($request->all());
        try {
            $manager->update($request->all());
            return new ManagersResource($manager);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if manager is exist and check it is validation'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Manager $manager)
    {
        try {
            User::find($manager->user->id)->delete();
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
