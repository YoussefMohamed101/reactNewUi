<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Freelancer;
use App\Models\Employee;
use App\Models\Project;
use App\Models\User;
use App\Models\Skill;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SearchController extends Controller
{


    public function searchByName($modelName, $keyword)
    {
        try {

            if ($modelName === 'Project') {
                // print("sadasdasdasdad");
                $projects = Project::where('project_title', 'LIKE', "%$keyword%")->get();

                if ($projects->count() > 0) {
                    return response()->json([
                        'data' => $projects,
                    ], 200);
                    // return Response::json($projects);
                } else {
                    return response()->json([
                        'error' => 'No projects found',
                    ], 404);
                }
            } else {
                $model = app("App\\Models\\$modelName");
                $results = $model->where('name', 'LIKE', "%$keyword%")->get();

                if ($results->count() > 0) {
                    return response()->json([
                        'data' => $results,
                    ], 200);
                } else {
                    return response()->json([
                        'error' => 'No results found',
                    ], 404);
                }
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'The specified model was not found',
            ], 404);
        }
    }


    function searchSkills($projectType,  $keyword)
    {
        $keywords = explode(' ', $keyword);

        $skills = Skill::whereIn('name', $keywords)->get();

        $freeEmployees = null;

        if ($projectType === 'mileStone') {

            $freeEmployees = Freelancer::where('task_id', null)->get();
            // $freeEmployees = Freelancer::findFreeEmployees();
        } else {
            $freeEmployees = Employee::where('task_id', null)->get();

            // $freeEmployees = $this->findFreeEmployees();
        }

        $users = User::whereHas('skills', function ($query) use ($skills) {
            $query->whereIn('skill_id', $skills->pluck('id'));
        })
            ->whereIn('id', $freeEmployees->pluck('user_id'))
            ->when($projectType === 'mileStone', function ($query) {
                return $query->where('role', 'Freelancer');
            })
            ->when($projectType === 'byProject', function ($query) {
                return $query->where('role', 'Employee');
            })
            ->get();

        if ($users->count() > 0) {
            return response()->json([
                'data' => $users,
            ], 200);
        } else {
            return response()->json([
                'error' => 'No users found with these skills',
            ], 404);
        }
    }
}
