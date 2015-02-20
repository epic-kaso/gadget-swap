/**
 * Created by kaso on 11/6/2014.
 */
var app = angular.module('SupergeeksWidget.Services', [])

/**
 * Created by kaso on 12/19/2014.
 */

var Gadget = function(props){
    //this.make = props.make || '';
    //this.model = props.model || '';
    //this.color = props.color || '';
    //this.size = props.size || '';
    //this.baseLinePrice = props.baseLinePrice || 0;
    //this.condition = '';
    //this.network = '';
};

Gadget.prototype.getValue = function(){
    var result = this.condition * this.baseLinePrice,
        bonus =  result * (this.getNetworkBonus()/100.0);

    return result + bonus;
};

Gadget.prototype.getNetworkBonus = function(){
    if(this.network)
        return this.network.description;
    return 'none';
};

Gadget.prototype.getReward = function(){
    if(this.size && this.baseLinePrice && this.condition_value)
        return parseInt(parseInt(this.baseLinePrice) * (this.condition_value/ 100.0));
    return 'Sorry, You\'ll have to come to our Swap Location.';
};





app.factory('GadgetServ', function () {
    var models = {};
    var devices = {};

    return {
        getModels: function () {
            return models;
        },
        setModels: function(data){
            models = data;
        },
        setDevices: function(data){
            angular.forEach(data,function(value,key){
                devices[value.name] =  value.gadgets;
            },devices);
            console.log(devices);
        },
        getDevicesFor: function(make){
            return devices[make];
        }
    };
});

app.factory('MailServ', function ($http) {
    var url = 'https://mandrillapp.com/api/1.0/messages/send.json';
    var data = {
        "message": {
            "html": "",
            "text": "",
            "subject": "Supergeeks Widget",
            "from_email": "supergeeks-widget@supergeeks.com.ng",
            "from_name": "Supergeeks Widget",
            "to": [
            ],
            "headers": {"Reply-To": "no-reply@supergeeks.com.ng"},
            "important": true
        },
        "key": "XZ6K0JEmpINZY4sw6_1F2g"
    };

    return {
        send: function(message,destination){
            data.message.html = message;
            data.message.to.push({email: destination,type: 'to' });
            return $http.post(url,data);
        }
    }
});

app.factory('CurrentGadget',function(){
    var gadget = new Gadget({});
    return {
        fetch: function(){
            return gadget;
        }
    }
});

app.factory('GadgetsInfoServ',function($http,GadgetServ,$q,$rootScope){
    var cache;
    var networks = [
        {
            name: 'Airtel',
            image_url: 'airtel.jpg'
        },
        {
            name: 'Mtn',
            image_url: 'mtn.jpg'
        },
        {
            name: 'Glo',
            image_url: 'glo.jpg'
        },
        {
            name: 'Etisalat',
            image_url: 'etisalat.jpg'
        }
    ];
    return {
        'get': function(){
            var p = $q.defer();
            if(cache){
                p.resolve(cache);
            }else{

                GadgetServ.setModels(window.gadget_swap.data.models);
                GadgetServ.setDevices(window.gadget_swap.data.models);
                cache = window.gadget_swap.data;
                networks = window.gadget_swap.data.networks;
                p.resolve(window.gadget_swap.data);
            }
            return p.promise;
        },
        'getModelsFor': function(maker){
           return  GadgetServ.getDevicesFor(maker);
        },
        getMakeByName: function(device_make){
            var result = {data: ''};
            angular.forEach(cache.models,function(value,key){
                if(value['name'] == device_make) {
                    this.data = value;
                    return value;
                }

            },result);

            return result.data;
        },
        getModelByName: function(device_model){
            var result = {data: ''};
            angular.forEach(cache.devices,function(v,k){
                if(v['model'] == device_model)
                    this.data = v;
                    return v;
            },result);
            return result.data;
        },
        getModelBySlug: function(device_model){
            var result = {data: ''};
            angular.forEach(cache.devices,function(v,k){
                if(v['slug'] == device_model)
                    this.data = v;
                return v;
            },result);
            return result.data;
        },
        getSizeModelBySlug: function(input,model){
            var result = {data: ''};
            angular.forEach(model.sizes,function(v,k){
                if(v['slug'] == input)
                    this.data = v;
                return v;
            },result);
            return result.data;
        },
        getNetworks: function(){
            console.log(networks);
            return networks;
        },
        getBaseLinePriceForSize: function(model,size){
            var result = {data: ''};
            angular.forEach(model.base_line_prices,function(v,k){
                if(v['size'] == size)
                    this.data = v['value'];
                return v['value'];
            },result);
            return result.data;
        },
        getNetworkBySlug: function(name){
            for(var i = 0;i < networks.length; i++){
                if(networks[i].slug == name)
                    return networks[i];
            }
            return {};
        },
        getConditions: function(){
            return  [
                {
                    name: 'Like New',
                    slug: 'Like-New',
                    value: $rootScope.currentGadget.current_make.normal_condition
                },
                {
                    name: 'Scratches & Cracks',
                    slug: 'Scratches-Cracks',
                    value: $rootScope.currentGadget.current_make.scratched_condition
                },
                {
                    name: 'Faulty',
                    slug: 'Faulty',
                    value: $rootScope.currentGadget.current_make.bad_condition
                }
            ];
        },
        postSwapDetails: function(details){
            var url = window.location.origin + "/add-swap-detail";
            return $http.post(url,details);
        }

    }
});

app.factory('PreloadTemplates',function ($templateCache, $http,ViewBaseURL) {
    var templates = [
        ViewBaseURL+"/device-make.html",
        ViewBaseURL+"/device-model.html",
        ViewBaseURL+"/device-size.html",
        ViewBaseURL+"/device-network.html",
        ViewBaseURL+"/device-condition.html",
        ViewBaseURL+"/device-reward.html",
        ViewBaseURL+"/book-appointment.html",
        ViewBaseURL+"/book-success.html",
        ViewBaseURL+"/swap-location.html"
    ];
    return {
        run: function(){
            templates.forEach(function(currentItem){
                $http.get(currentItem, { cache: $templateCache });
            });
        }
    }
});