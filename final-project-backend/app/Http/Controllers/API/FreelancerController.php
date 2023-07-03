<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFreelancerRequest;
use App\Http\Requests\UpdateFreelancerRequest;
use App\Http\Resources\FreelancerResource;
use App\Models\Freelancer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\User;

use Illuminate\Http\Response;

class FreelancerController extends Controller
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
            $freelancer = Freelancer::all();
            // return $freelancer;
            return FreelancerResource::collection($freelancer);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found freelancer collection',
            ], 404);
        }
    }

    public function findFreeFreelancer()
    {
        // print('================');
        try {
            $freelancer = Freelancer::where('Status', 1)->get();
            // return $freelancer;
            return FreelancerResource::collection($freelancer);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found free freelancers',
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFreelancerRequest $request)
    {
        // $salary = Freelancer::create($request->all());
        // return new FreelancerResource($salary);
    }

    /**
     * Display the specified resource.
     */
    public function show(Freelancer $freelancer)
    {
        if ($freelancer) {
            return  new FreelancerResource($freelancer);
        }
        return  new Response('', 205);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(UpdateFreelancerRequest $request, Freelancer $freelancer)
    {
        try {
            $freelancer->update($request->all());
            return new FreelancerResource($freelancer);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if freelancer is exist and check it is validation'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Freelancer $freelancer)
    {
        User::find($freelancer->user->id)->delete();

        return new Response('user deleted', 204);
    }
}
