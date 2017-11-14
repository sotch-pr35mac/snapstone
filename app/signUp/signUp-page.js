/*
 *  @file         ::  app/signUp/signUp-page.js
 *  @authors      ::  Lionel Niyongabire <k15ln01@kzoo.edu>
 *  @created      ::  October 23, 2017
 *  @updated      ::  N/A
 *  @description  ::  This file defines the main logic for the sign up page
*/

// Require dependencies
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var SignUpViewModel = require('./signUp-view-model');
var http = require('http');
var serverURL = "https://safe-temple-72583.herokuapp.com";

var signUpViewModel = new SignUpViewModel();

// The page object
var page;

// Define the default behavior for navigating home uisng the global navigateHome object
var navigateToLogin = {
  moduleName: 'login/login-page',
  animated: true,
  backstackVisible: false,
  clearHistory: true,
  transition: {
    name: 'slideLeft'
  }
};

var navigateToHome = {
  moduleName: 'home/home-page',
  animated: true,
  backstackVisible: false,
  clearHistory: true,
  transition: {
    name: 'slideLeft'
  }
}

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
  page.bindingContext = signUpViewModel;
}

// Add the function goBack to the module.exports so it can be accessed from the XML page
/*
 *  @function     ::  goBack()
 *  @description  ::  Navigate home using the behavior defined in the global navigateHome object
*/
exports.goBack = function() {
  frameModule.topmost().navigate(navigateToLogin);
};


/*
 *  @function     :: createAccount
 *  @description  :: Create a new user account on the server
*/
exports.createAccount = function() {
  var firstName = page.getViewById('firstName').text;
  var lastName = page.getViewById('lastName').text;
  var email = page.getViewById('email').text;
  var password = page.getViewById('password').text;
  var confirmPassword = page.getViewById('confirmPassword').text;

  console.log("FIRST NAME: " + firstName);

  if(password == confirmPassword) {
    // The passwords match, move along
    http.request({
      url: serverURL + '/user/create',
      method: 'POST',
      content: JSON.stringify({ username: 'test', password: 'test' })
      /*{
        firstName: firstName,
        lastName: lastName,
        username: email,
        password: password
      }*/
    }).then(function(response) {
      if(response.status == 200) {
        // The user account was successfully created,
        alert("Congrats! New user account created!");
        frameModule.topmost().navigate(navigateHome);
      } else {
        alert("There was an unexpected error. Please try again later.");
        console.log("There was an unexpected error.");
        console.log(response.status);
        console.log(response.message);
        console.log(response.error);
      }
    });
  } else {
    // There was an error, display it
    alert('The passwords do not match.');
  }
}

// Add onNavigatingTo to module.exports so it can be accessed in the XML page
exports.onNavigatingTo = onNavigatingTo;
