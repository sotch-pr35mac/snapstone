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

// This can be used to store app settings that will persist even when the app is closed
var appSettings = require("application-settings");

// Initializes the Chinese translation variable to simplified Chinese if the user has not already chosen
var hasKey = appSettings.hasKey("simplifiedTraditional");
if (!hasKey)
{
	appSettings.setString("simplifiedTraditional", "simplified");
}

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

// Defines a way to navigate to the login page
var navigateToLogin = 
{
  moduleName: 'login/login-page',
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

  // Updates the simplified/traditional label based on the user's preferences
  lblSimplifiedTraditional = page.getViewById("lblSimplifiedTraditional");
  if (appSettings.getString("simplifiedTraditional") == "simplified")
  {
  	lblSimplifiedTraditional.text = "Simplified Chinese";
  }
  else
  {
  	lblSimplifiedTraditional.text = "Traditional Chinese";
  }
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

// This function is called whenever the Simplified Chinese button is pressed
exports.simplified = function()
{
	// Sets the global variable to simplified
	appSettings.setString("simplifiedTraditional", "simplified");
	lblSimplifiedTraditional.text = "Simplified Chinese";
};

// This function is called whenever the Traditional Chinese button is pressed
exports.traditional = function()
{
	// Sets the global variable to traditional
	appSettings.setString("simplifiedTraditional", "traditional");
	lblSimplifiedTraditional.text = "Traditional Chinese";
};

// Logs the user out of the app
exports.logOut = function()
{
	// Changes the variable measuring if the user has logged out
  appSettings.setBoolean("userLogin", false);
  frameModule.topmost().navigate(navigateToLogin)
};
