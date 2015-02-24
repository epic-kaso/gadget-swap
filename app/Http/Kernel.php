<?php namespace SupergeeksGadgetSwap\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel {

	/**
	 * The application's global HTTP middleware stack.
	 *
	 * @var array
	 */
	protected $middleware = [
		'Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode',
		'Illuminate\Cookie\Middleware\EncryptCookies',
		'Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse',
		'Illuminate\Session\Middleware\StartSession',
		'Illuminate\View\Middleware\ShareErrorsFromSession',
		//'SupergeeksGadgetSwap\Http\Middleware\VerifyCsrfToken',
	];

	/**
	 * The application's route middleware.
	 *
	 * @var array
	 */
	protected $routeMiddleware = [
		'auth' => 'SupergeeksGadgetSwap\Http\Middleware\Authenticate',
		'auth.basic' => 'Illuminate\Auth\Middleware\AuthenticateWithBasicAuth',
		'guest' => 'SupergeeksGadgetSwap\Http\Middleware\RedirectIfAuthenticated',
        'auth-admin' => 'SupergeeksGadgetSwap\Http\Middleware\AdminAuthenticate',
        'auth-adviser' => 'SupergeeksGadgetSwap\Http\Middleware\AdviserAuthenticate',
	];

}
