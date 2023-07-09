<?php

use App\Http\Controllers\API\FreelancerController;
use App\Http\Controllers\API\ManagersController;

use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\SearchController;
use App\Http\Controllers\API\ClientController;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\staffLevelController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\SkillController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\Payment\CreditController;
use App\Http\Controllers\API\PayPalController;
use App\Http\Controllers\API\ContactUsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\FatoorahController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// ========== paypal payment ====================
// Route::post('paypal/pay', [PayPalController::class, 'pay']);

// Route::post('success', [PayPalController::class, 'success']);
// Route::get('error', [PayPalController::class, 'error']);


Route::post('paypal/pay', [PayPalController::class, 'pay'])->name('paypal/pay');
Route::get('paypal/success', [PayPalController::class, 'success'])->name('paypal.success');
Route::get('paypal/error', [PayPalController::class, 'error'])->name('paypal.error');


// ========== Chat route ====================

use App\Http\Controllers\API\ChatGPTController;

Route::post('chatgpt/ask', [ChatGPTController::class, 'ask']);


// ========== Staff route ====================
Route::apiResource('staff', StaffLevelController::class);

// ========== Register route ====================

Route::post('register/client', [RegisterController::class, 'RegisterClient'])->name('RegisterClient');
Route::post('register/freelancer', [RegisterController::class, 'RegisterFreelancer'])->name('RegisterFreelancer');
Route::post('register/manager', [RegisterController::class, 'RegisterManager'])->name('RegisterManager');

// ========== login route ====================
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


// ========== User route ====================
Route::put('user/updateForAdmin/{user}', [UserController::class, 'updateForAdmin'])->name('updateForAdmin');
Route::get('user/count', [UserController::class, 'countUser'])->name('countUser');
Route::get('user/countCountry', [UserController::class, 'countUserCountry'])->name('countUserCountry');
Route::post('user/Skills', [UserController::class, 'addSkillsToUser']);
Route::get('user/{user}/Skills', [UserController::class, 'getUserSkills']);
Route::apiResource('user', UserController::class);

// ========== Freelancer route ====================
Route::get('freeFreelancers', [FreelancerController::class, 'findFreeFreelancer']);
Route::apiResource('freelancer', FreelancerController::class);

// ========== client route ====================
Route::apiResource('client', ClientController::class);

// ========== employee route ====================
Route::get('freeEmployees', [EmployeeController::class, 'findFreeEmployees']);
Route::apiResource('employee', EmployeeController::class);

// ========== manager route ====================
Route::get('managers/{type}', [ManagersController::class, 'index'])->name('index');
Route::apiResource('manager', ManagersController::class);

// ========== search route ====================
Route::get('search/{model}/{keyword}/{projectType?}', [SearchController::class, 'searchByName'])->name('search');
Route::get('searchUser/{projectType}/{keywords}', [SearchController::class, 'searchSkills'])->name('searchSkills');


// ========== project route ====================
Route::get('projects/count', [ProjectController::class, 'countProject'])->name('countProject');
Route::get('projects/searchProjectByUsers', [ProjectController::class, 'searchProjectByUsers'])->name('searchProjectByUsers');
Route::apiResource('projects', ProjectController::class);
Route::get('projects/search/{status}', [ProjectController::class, 'searchProjectByStatus'])->name('projects.search');


// ========== task route ====================
Route::get('task/searchTaskByUsers', [TaskController::class, 'searchTaskByUsers']);
Route::apiResource('task', TaskController::class);
Route::get('tasks/search/{status}', [TaskController::class, 'searchTaskByStatus'])->name('task.search');

// ========== skill route ====================
Route::apiResource('skill', SkillController::class);

// ========== contactUs route ====================
// Route::apiResource('contact-us', [ContactUsController::class]);
Route::apiResource('contact-us', '\App\Http\Controllers\API\ContactUsController');





// Route::post('pay', [FatoorahController::class, 'payOrder'])->name('pay');

// Route::post('payment', [\App\Http\Controllers\MyFatoorahController::class, 'index']);
// Route::get('payment/callback', [\App\Http\Controllers\FatoorahController::class, 'paymentCallBack']);
// Route::get('payment/error', [\App\Http\Controllers\FatoorahController::class, 'error']);




// use APP\Http\Controllers\API\payment\CreditController;
// // paymob
// Route::post('/credit', [CreditController::class, 'credit'])->name('credit');
// Route::get('/callback', [CreditController::class, 'callback'])->name('callback');

// Route::get('/search', [ SearchٍController::class, 'searchByName'])->name('search');


// Route::get('/payment', [DashboardController::class, 'index']);
// Route::post('pay', [PaymentController::class, 'pay'])->name('payment');
// Route::get('success', [PaymentController::class, 'success']);
// Route::get('error', [PaymentController::class, 'error']);
