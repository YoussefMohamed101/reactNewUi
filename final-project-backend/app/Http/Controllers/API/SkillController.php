<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Skill;
use App\Http\Requests\StoreSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use Illuminate\Http\Response;

class SkillController extends Controller
{
    public function __construct()
    {
        // $this->middleware(['auth:sanctum', 'checkUser:Admin'])->only('store', 'update', 'destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return SkillResource::collection(Skill::all());
            // return Skill::all();
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found Skills'
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSkillRequest $request)
    {
        // dd($request);

        $skill = Skill::create($request->all());
        return new SkillResource($skill);
    }

    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        try {
            return new SkillResource($skill);
            // return Skill::where(['id' => $skill->id])->get()->users();
        } catch (ModelNotFoundException $exception) {
            return response()->json(['error' => 'Skills not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSkillRequest $request, Skill $skill)
    {
        try {
            $skill->update($request->all());
            return new SkillResource($skill);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if Skills is exist and check it is validation'
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
            $project = Skill::findOrFail($id);
            $project->delete();
            return response()->json([
                'success' => "Skill deleted"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if Skill is exist '
            ], 404);
        }
    }
}
