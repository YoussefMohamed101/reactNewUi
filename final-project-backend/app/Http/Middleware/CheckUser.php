<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (Auth::user()) {
            $userRole = Auth::user()->role;
            // Perform your role-based checks or validations here
            // For example, you can check if the user's role is one of the specified roles
            // and perform specific actions accordingly.

            if (in_array($userRole, $roles)) {
                // User has one of the specified roles
                // Perform actions or grant access based on the role
                return $next($request);
            } else {
                // User does not have any of the required roles
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        }

        return response()->json(['error' => 'Unauthenticated'], 401);
    }
}
