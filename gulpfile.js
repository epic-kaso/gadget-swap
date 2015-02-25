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
    mix.less('admin.less','public/admin/css')
        .scripts(['admin/app/app.js', 'admin/app/controllers.js','admin/app/directives.js','admin/app/filters.js','admin/app/services.js'], 'public/admin/js/admin_main.js')
        .scriptsIn('resources/js/app', 'public/app/js/main.js')
        .scriptsIn('resources/js/libs/core','public/app/libs/core_main.js')
        .scriptsIn('resources/js/libs/others','public/app/libs/others_main.js');
});
