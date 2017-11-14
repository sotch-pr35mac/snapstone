/*
 *  @file         ::  app/login/login-page.js
 *  @authors      ::  Lionel Niyongabire <k15ln01@kzoo.edu>
 *  @created      ::  October 27, 2017
 *  @updated      ::  N/A
 *  @description  ::  This file defines the main logic for the login page
*/

// Require dependencies
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var LoginViewModel = require('./login-view-model');
var http = require('http');

// This can be used to store app settings that will persist even when the app is closed
var appSettings = require("application-settings");
var serverURL = "https://safe-temple-72583.herokuapp.com";

var loginViewModel = new LoginViewModel();
var page;

// Define the default behavior for navigating home uisng the global navigateHome object
var navigateHome = {
  moduleName: 'home/home-page',
  animated: true,
  backstackVisible: false,
  clearHistory: true,
  transition: {
    name: 'slideRight'
  }
};

// Load this function when navigating to the page
function onNavigatingTo(args) {
  page = args.object;

  // Define swipable gestures and their actions
  var myStack = page.getViewById('swipable');
  myStack.on(gestures.GestureTypes.swipe, function(args) {
    if(args.direction == gestures.SwipeDirection.right) {
      // When swiping right, navigate home using the behavior defined in the global navigateHome object
      frameModule.topmost().navigate(navigateHome);
    }
  });

  // Add the model to the page
  page.bindingContext = loginViewModel;
}

// Add the function goBack to the module.exports so it can be accessed from the XML page
/*
 *  @function     ::  goBack()
 *  @description  ::  Navigate home using the behavior defined in the global navigateHome object
*/
exports.goBack = function() {
  frameModule.topmost().navigate(navigateHome);
};

// Open the sign up page for the user to sign up if they do not have an account
exports.openSignup = function() {
  frameModule.topmost().navigate({
    moduleName: 'signUp/signUp-page',
    animated: true,
    transition: {
      name: 'slideLeft'
    }
  });
}

// Add onNavigatingTo to module.exports so it can be accessed in the XML page
exports.onNavigatingTo = onNavigatingTo;

// Authenticates the user login
exports.authenticate = function()
{
  var username = page.getViewById('email').text;
  var password = page.getViewById('password').text;

  http.request({
    url: serverURL + '/user/login',
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify({
      username: username,
      password: password
    })
  }).then(function(response) {
    response = response.content.toJSON();
    if(response.status == 200) {
      // The user was successfully logged in

      // Forgive the bad practice, but i need this to work NOW
      appSettings.setString('username', username);
      appSettings.setString('password', password);

      // If the login information passes authentication:
      appSettings.setBoolean("userLogin", true);
      frameModule.topmost().navigate(navigateHome);
    } else {
      alert("Could not log you in.");
      console.log(response.status);
      console.log(response.message);
      console.log(response.error);
    }
  });
}
