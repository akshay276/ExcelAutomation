/**
 * 
 */

var myAppRedirect = angular.module("myAppRedirect", []);

myAppRedirect.controller("myAppRedirectCtrl", function($timeout, $window,
		$location) {

	$timeout(function() {
		console.log("wait for 2 sec");

		var str = $location.absUrl();
		var strSplice = $location.absUrl().slice(0, 37);

		$window.location.href = strSplice;
	}, 5000);

});
