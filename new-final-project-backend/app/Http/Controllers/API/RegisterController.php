<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\StoreManagersRequest;
use App\Http\Requests\StoreFreelancerRequest;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\StoreEmployeeRequest;
use Illuminate\Http\Request;
use App\Models\Manager;
use App\Models\Freelancer;
use App\Models\Client;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ManagersResource;
use App\Http\Resources\FreelancerResource;
use App\Http\Resources\ClientResource;

class RegisterController extends Controller
{
    public function __construct()
    {
        // $this->middleware(['auth:sanctum', 'checkUser:Admin'])->only('RegisterManager');
    }
    public function RegisterUser(StoreUserRequest $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role' => $request->input('role'),
            'nationalID' => $request->input('nationalID'),
            'address' => $request->input('address'),
            'phone' => $request->input('phone'),
            'joinedDate' => $request->input('joinedDate'),
            'endDate' => $request->input('endDate'),
            'country' => $request->input('country'),
            'userName'=>$request->input('userName'),
        ]);
        $this->save_image($request->profilePic, $user);

        $token = $user->createToken('token-name', ['user_id' => $user->id, 'email' => $user->email, 'name' => $user->name, 'role' => $user->role])->plainTextToken;

        return array("user" => $user, 'token' => $token,);
    }
    public function RegisterManager(StoreUserRequest $request)
    {
        $validator = Validator::make($request->all(), [
            'staff_level_id' => 'exists:staff_levels,id'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'success' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        }

        $result = $this->RegisterUser($request);

        if ($request->input('role') == 'Employee') {
            $employee = Employee::create([
                'user_id' => $result['user']->id,
                'balance' => 0,
                'staff_level_id' => $request->input('staff_level_id'),
            ]);

            return response()->json([
                'success' => true,
                'employee' =>new EmployeeResource($employee),
                'token'  => $result['token']
            ], 201);
        } elseif ($request->input('role') == 'ProductManager' || $request->input('role') == 'ProductOwner' || $request->input('role') == 'Admin') {
            $manager = Manager::create([
                'user_id' => $result['user']->id,
                'staff_level_id' => $request->input('staff_level_id'),
            ]);


            return response()->json([
                'success' => true,
                'manager' => new ManagersResource($manager),
                'token'  => $result['token']
            ], 201);
            // return redirect()->route('managers.store', ['user_id' => $user->id,'role'=>'Product Manager','staff_level_id'=>1])->withInput();;
        }
    }

    public function RegisterFreelancer(StoreUserRequest $request)
    {

        $result = $this->RegisterUser($request);

        $freelancer = Freelancer::create([
            'user_id' => $result['user']->id,
            'Status' => true,
            'rate' => '0',
            'balance' => 0,
            'task_id' => null
        ]);

        return response()->json([
            'success' => true,
            'freelancer' => new FreelancerResource($freelancer),
            'token'  => $result['token'],
        ], 201);
    }
    public function RegisterClient(StoreUserRequest $request)
    {
        $result = $this->RegisterUser($request);


        $client = Client::create([
            'user_id' => $result['user']->id,
            'balance' => 0,
        ]);

        return response()->json([
            'success' => true,
            'client' => new ClientResource($client),
            'token'  => $result['token'],
        ], 201);
    }

    private function save_image($image, $article)
    {
        if ($image) {
            $image_name = time() . '.' . $image->extension();
            $image->move(public_path('images/users'), $image_name);
            $article->profilePic = $image_name;
            $article->save();
        }
    }
}
