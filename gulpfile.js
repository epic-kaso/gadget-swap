var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.less('app.less')
        .scriptsIn('resources/js/app', 'public/app/js/main.js')
        .scriptsIn('resources/js/libs/core','public/app/libs/core.js')
        .scriptsIn('resources/js/libs/others','public/app/libs/others.js');
});
