<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Employee;
use App\Models\Manager;
use App\Models\Freelancer;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;


class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'checkUser:ProductManager,Freelancer,Admin'])->only('store', 'destroy', 'update');
        $this->middleware(['auth:sanctum', 'checkUser:Freelancer,Admin,Employee,ProductManager'])->only('searchTaskByUsers');
        $this->middleware(['auth:sanctum', 'checkUser:ProductManager,Freelancer,Employee,Admin'])->only('searchTaskByStatus');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return TaskResource::collection(Task::all());
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found Tasks'
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
        $task = Task::create($request->all());
        // print($task->project->project_type);
        if ($task->project->project_type == "mileStone") {
            $freelancer =  Freelancer::find($request->input('assigned_to'));
            if ($freelancer) {
                $freelancer->update([
                    'Status' => 0,
                    'task_id' => $task->id
                ]);
            }

            // print(Freelancer::find($request->input('assigned_to')));
        } else {
            $employee = Employee::find($request->input('assigned_to'));
            if ($employee) {
                $employee->update([
                    // 'Status' => 0,
                    'task_id' => $task->id
                ]);
            }
        }
        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        try {
            return new TaskResource($task);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['error' => 'Tasks not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        // return $task;
        // print('===========================');

        try {
            if ($task->project->project_type == "mileStone") {
                Freelancer::where('task_id', $task->id)->update([
                    'Status' => 1,
                    'task_id' => null
                ]);
                // print(Freelancer::find($request->input('assigned_to')));
            } else {
                Employee::where('task_id', $task->id)->update([
                    // 'Status' => 1,
                    'task_id' => null
                ]);
            }

            $task->update($request->all());
            if ($task->project->project_type == "mileStone") {
                Freelancer::find($request->input('assigned_to'))->update([
                    'Status' => 0,
                    'task_id' => $task->id
                ]);
                // print(Freelancer::find($request->input('assigned_to')));
            } else {
                Employee::find($request->input('assigned_to'))->update([
                    // 'Status' => 0,
                    'task_id' => $task->id
                ]);
            }
            return new TaskResource($task);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if Tasks is exist and check it is validation'
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
            $project = Task::findOrFail($id);
            $project->delete();
            return response()->json([
                'success' => "Task deleted"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check if Task is exist '
            ], 404);
        }
    }


    public function searchTaskByUsers()
    {

        $results = [];
        if (!Auth::user()) {
            return response()->json([
                'error' => 'unauthentecation'
            ], 404);
        }
        $id = Auth::user()->id;
        if (Auth::user()->role == 'Admin') {
            // Perform your search logic based on the provided search term
            $results = Task::all();
        } elseif (Auth::user()->role == 'ProductManager') {
            $manager = Manager::where('user_id', $id)->first();
            $results = Task::where([
                ['product_manager_id', '=', $manager->id],
            ])->get();
        } elseif (Auth::user()->role == 'Employee') {
            $Employee = Employee::where('user_id', $id)->first();

            $results = Task::where([
                ['id', '=', $Employee->task_id],
            ])->get();
        } elseif (Auth::user()->role == 'Freelancer') {
            $Freelancer = Freelancer::where('user_id', $id)->first();

            $results = Task::where([
                ['id', '=', $Freelancer->task_id],
            ])->get();
        } else {
            return response()->json([
                'error' => 'Not found project to this user'
            ], 404);
        }
        return TaskResource::collection($results);
    }
    public function searchTaskByStatus($status)
    {
        $searchTerm = $status;

        $results = [];
        if (!Auth::user()) {
            return response()->json([
                'error' => 'unauthentecation'
            ], 404);
        }
        $id = Auth::user()->id;
        if (Auth::user()->role == 'Admin') {
            // Perform your search logic based on the provided search term
            $results = Task::where('task_status', '=', $searchTerm)->get();
        } elseif (Auth::user()->role == 'ProductManager') {
            $manager = Manager::where('user_id', $id)->first();
            $results = Task::where([
                ['product_manager_id', '=', $manager->id],
                ['task_status', '=', $searchTerm]
            ])->get();
        } elseif (Auth::user()->role == 'Freelancer') {
            $Freelancer = Freelancer::where('user_id', $id)->first();
            $results = Task::where([
                ['id', '=', $Freelancer->task_id],
                ['task_status', '=', $searchTerm]
            ])->get();
        } elseif (Auth::user()->role == 'Employee') {
            $Employee = Employee::where('user_id', $id)->first();
            $results = Task::where([
                ['id', '=', $Employee->task_id],
                ['task_status', '=', $searchTerm]
            ])->get();
        } else {
            return response()->json([
                'error' => 'Not found project with this status'
            ], 404);
        }
        return TaskResource::collection($results);
    }
}
