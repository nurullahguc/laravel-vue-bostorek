<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum', 'token_expiration']], function () {
    Route::put('user/update-user', [UserController::class, 'updateUser']);

    Route::resource('books', BookController::class)->only([
        'store', 'update', 'destroy'
    ]);

    Route::get('books/uploader', [BookController::class, 'uploader']);

    Route::resource('comments', CommentController::class)->only([
        'store', 'update', 'destroy'
    ]);

    Route::get('comments-for-user', [CommentController::class, 'comment4User']);

    Route::resource('ratings', RatingController::class)->only([
        'store', 'update', 'destroy'
    ]);


});

Route::resource('books', BookController::class)->only([
    'index', 'show'
]);

Route::resource('comments', CommentController::class)->only([
    'index', 'show'
]);

Route::get('comments-for-book/{id}', [CommentController::class, 'comment4Book']);


Route::resource('ratings', RatingController::class)->only([
    'index', 'show'
]);

Route::get('ratings-for-book/{id}', [RatingController::class, 'raitings4Book']);
