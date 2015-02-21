<?php namespace SupergeeksGadgetSwap\Http\Middleware;

use Closure;

class AdviserAuthenticate
{


    /**
     * The Guard implementation.
     *
     * @var Guard
     */
    protected $auth;

    /**
     * Create a new filter instance.
     *
     * @param  Guard $auth
     * @return void
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($this->auth->user()->role !== 'adviser') {

            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                return 'Only Adviser can access!';
            }
        }

        return $next($request);
    }

}
