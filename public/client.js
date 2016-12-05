
//Ceation of a new angular application
var app = angular.module("myApp", []);

//The controller of the angular application 
app.controller("myCtrl", function ($scope, $http) {


    /*Initialization function to declare and set variables*/
    $scope.init = function () {

        //Legal Age Checkbox Value
        $scope.legalAge = false;
        //Policy Agreement Checkbox Value
        $scope.policyAgreement = false;
        //Phone Number Input Value
        $scope.phone = '';

    }

    /* Send Message is a function that calls the Rest API to send the coupon message to the given number*/
    $scope.sendMessage = function () {

        //If statement that checks if the requirements are valid before sending the request
        if (($scope.legalAge == true) && ($scope.policyAgreement == true) && ($scope.phone.length > 0)) {

            // The object for the request body
            var msgObj = {
                'phone': $scope.phone
            }

            //HTTP Post request to our sms-promotion API.
            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/sms-promotion',
                data: JSON.stringify(msgObj),
                headers: { 'Content-Type': 'application/json' }
            }).success(function (response) {
                //alert message of successful response
                alert('Success! You will have your bonus coupon very soon!')
            })
                .error(function (response) {
                    //alert message of the error
                    alert(response.message);

                });

        } else alert('Something went wrong! Please complete the empty textbox and check the boxes!');
    }


});

