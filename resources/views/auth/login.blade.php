@extends('app')

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<div class="panel panel-default">
				<div class="panel-body">
                    <h2 style="text-align: center">Admin Login</h2>
					@if (count($errors) > 0)
						<div class="alert alert-danger">
							<strong>Whoops!</strong> There were some problems with your input.<br><br>
							<ul>
								@foreach ($errors->all() as $error)
									<li>{{ $error }}</li>
								@endforeach
							</ul>
						</div>
					@endif

					<form role="form" method="POST" action="/auth/login">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">

						<div class="form-group">
							<div class="col-md-12">
								<input type="email" placeholder="E-Mail Address" class="form-control" name="email" value="{{ old('email') }}">
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-12">
								<input type="password" placeholder="Password" class="form-control" name="password">
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-12">
								<div class="checkbox">
									<label>
										<input type="checkbox" name="remember"> Remember Me
									</label>
								</div>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-12">
								<button type="submit" class="btn btn-primary btn-block" style="margin-right: 15px;padding: 10px;font-size: 22px;margin-bottom: 5px;">
									Login
								</button>

								<a href="/password/email">Forgot Your Password?</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
