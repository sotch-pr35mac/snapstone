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

var signUpViewModel = new SignUpViewModel();

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
  var page = args.object;

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
  frameModule.topmost().navigate(navigateHome);
};

// Add onNavigatingTo to module.exports so it can be accessed in the XML page
exports.onNavigatingTo = onNavigatingTo;
