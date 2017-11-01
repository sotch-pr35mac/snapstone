/*
 *  @file         ::  app/settings/settings-page.js
 *  @authors      ::  Preston Wang-Stosur-Bassett <preston.wang-stosur-bassett14@kzoo.edu> (IF YOU EDIT THIS FILE ADD YOUR NAME AND CONTACT INFO TO THIS LINE)
 *  @created      ::  Sept 24, 2017
 *  @updated      ::  Sept 30, 2017 - Preston Wang-Stosur-Bassett - Added comments (IF YOU EDIT THIS FILE, REPLACE THIS LINE WITH YOUR NAME, THE DATE, AND YOUR CHANGES TO THIS LINE)
 *  @description  ::  This file defines the main logic for the settings page
*/

// Require dependencies
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var SettingsViewModel = require('./settings-view-model');

var settingsViewModel = new SettingsViewModel();

// Define the default behavior for navigating home using this global navingateHome object
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
  page.bindingContext = settingsViewModel;
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
