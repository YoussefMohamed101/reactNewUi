<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStaffLevelRequest;
use App\Http\Requests\UpdateStaffLevelRequest;
use App\Http\Resources\StaffLevelResource;
use App\Models\StaffLevel;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Illuminate\Http\Response;

class StaffLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'checkUser:Admin']);
    }
    public function index()
    {
        // return StaffLevel::all();
        try {
            $manager = StaffLevel::all();
            return StaffLevelResource::collection($manager);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found mangers collection',
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreStaffLevelRequest $request)
    {
        $salary = StaffLevel::create($request->all());
        return new StaffLevelResource($salary);
    }

    /**
     * Display the specified resource.
     */

    public function show(string $id)
    {
        try {
            $staffLevel = StaffLevel::findOrFail($id);
            return new StaffLevelResource($staffLevel);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['error' => 'staffLevel not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStaffLevelRequest $request, string $id)
    {
        //
        try {
            $project = StaffLevel::findOrFail($id);
            $project->update($request->all());

            return new StaffLevelResource($project);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if project is exist and check it is validation'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        try {
            $project = StaffLevel::findOrFail($id);
            $project->delete();
            return response()->json([
                'success' => "staffLevel deleted"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if staffLevel is exist '
            ], 404);
        }
    }
}
