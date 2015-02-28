/**
 * Created by Ak on 2/19/2015.
 */

var app =  angular.module('adminApp.directives',[]);

app.directive('backButton',function(){
    return {
        'restrict': 'EA',
        'template': '<a class="btn base-resize search-btn back-btn" href=""><span class="fa fa-chevron-left"></span></a>',
        'link': function link(scope, element, attrs) {
            element.bind('click',function(e){
                window.history.back();
                e.preventDefault();
            })
        }
    }
});



app.directive('webCamera',function(ScriptCam){
    return {
        'restrict': 'EA',
        'scope': {
            imageSrc: '=',
            imageEncoded: '='
        },
        'template': '<div class="webcamera"><div id="webcam"></div><div style="margin-top: 10px"><button class="btn btn-default btn-capture">Capture</button></div></div>',
        'link': function link(scope, element, attrs) {
            element.find('#webcam').scriptcam({
                path: ScriptCam.path,
                showMicrophoneErrors:false,
                onError:onError,
                cornerColor:'eee',
                uploadImage:ScriptCam.path+'upload.gif',
                onPictureAsBase:captureImage
            });

            element.find('btn-capture').on('click',function(){
                captureImage();
            });

            function captureImage(){
                scope.imageSrc = base64_toimage();
                scope.imageEncoded = base64_tofield();
                scope.$apply();
            }

            function base64_tofield() {
                return $.scriptcam.getFrameAsBase64();
            }

            function base64_toimage() {
                return "data:image/png;base64,"+$.scriptcam.getFrameAsBase64();
            }

            function onError(errorId,errorMsg) {
                element.find('btn-capture').attr( "disabled", true );
            }
        }
    }
});

app.directive('fileButton',function(){
    return {
        'restrict': 'EA',
        'scope': {
            'name': '@name',
            'label': '@'
        },
        'template': '<div class="input-group"><div class="input-group-btn"><span class="btn btn-info btn-file">Browse.. <input type="file" name="{{ name }}"/> </span></div><input class="form-control file-select-label" value="{{ label }}" placeholder="Select a file" name="file-name" type="text"/></div>',
        'link': function link(scope, element, attrs) {
            var fileInput = element.find('.btn-file input[type=file]');
            //var fileLabel = element.find('input[type=text].file-select-label');
            element.find('.btn.btn-file').css({
                position: 'relative',
                overflow: 'hidden',
                width: '70px',
                height: '34px'
            });

            fileInput.css({
                top: '0',
                right: '0',
                position: 'absolute',
                'min-width': 'inherit',
                'width': 'inherit',
                'min-height': 'inherit',
                'height': 'inherit',
                'font-size': '100px',
                'text-align': 'right',
                'filter': 'alpha(opacity=0)',
                'opacity': '0',
                'outline': 'none',
                'backgound': 'white',
                'cursor': 'inherit',
                'display': 'block'
            });

            fileInput.on('change',function(){
                console.log("file input change event");
                var input = $(this),numFiles = input.get(0).files ? input.get(0).files.length : 1;
                scope.label = input.val().replace(/\\/g,'/').replace(/.*\//,'');
                console.log(scope.label);
                scope.$apply();
            });
        }
    }
});


app.directive('toast',function($animate,$timeout){
    return {
        'restrict': 'EA',
        'template': '<div class="toast alert alert-{{ type }} text-center" ><ul><li ng-repeat="message in messages"> {{ message }}</li></ul></div>',
        scope: {
            type: '=type',
            messages: '=messages',
            show: '=show'
        },
        'link': function link(scope, element, attrs) {
            function showToast() {
                //$animate.addClass(element,'toast-alert');
                element.css({opacity: 1});
                $timeout(hideToast,10000);
            }

            function hideToast() {
                element.css({opacity: 0});
                //$animate.removeClass(element,'toast-alert');
            }
            showToast();
            scope.$watch(function() { return scope.show; },function(newV,oldV){
                if(newV == true){
                    showToast();
                }else{
                    hideToast();
                }
            })
        }
    }
});



app.directive('formItemUpdate',function($timeout){
    return {
        'restrict': 'A',
        'scope': {
            'status': '='
        },
        'link': function link(scope, element, attrs) {
            function showLoadingTick() {
                //element.remove('.loader-item');
                element.find('.input-form-item')
                    .html('<span class="loader-item" style="margin-left: 20px"><span class="fa fa-spin fa-spinner"></span></span>');

                $timeout(clear,3000);
            }

            function showErrorTick() {
                //element.remove('.loader-item');
                element.find('.input-form-item')
                    .html('<span class="loader-item" style="margin-left: 20px;color: red;"><span class="fa fa-close"></span></span>');

                $timeout(clear,3000);
            }

            function showGreenTick() {
               // element.remove('.loader-item');
                element.find('.input-form-item')
                    .html('<span class="loader-item" style="margin-left: 20px;color: green;"><span class="fa fa-check"></span></span>')
            }

            function clear(){
                element.find('.input-form-item')
                    .html('');
            }

            scope.$watch('status',function(newV,oldV){
                if(newV == 'success'){
                    showGreenTick();
                }else if(newV == 'failure'){
                    showErrorTick();
                }else if(newV == 'loading'){
                    showLoadingTick();
                }else{
                    clear();
                }
            })
        }
    }
});