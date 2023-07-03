<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;

class EmployeeController extends Controller
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
            $emp = Employee::all();
            return EmployeeResource::collection($emp);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found Employee collection',
            ], 404);
        }
    }

    public function findFreeEmployees()
    {
        // print('================');
        try {
            $employee = Employee::where('task_id', null)->get();
            // return $freelancer;
            return EmployeeResource::collection($employee);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'not found free freelancers',
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $employee = Employee::create($request->all());
        return new EmployeeResource($employee);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        if ($employee) {
            return  new EmployeeResource($employee);
        }
        return  new Response('', 205);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        try {
            $employee->update($request->all());
            return new EmployeeResource($employee);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'check it is validation'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        try {
            User::find($employee->user->id)->delete();
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
