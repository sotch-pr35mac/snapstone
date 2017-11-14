/*
 *  @file         ::  app/home/home-page.js
 *  @authors      ::  Preston Wang-Stosur-Bassett <preston.wang-stosur-bassett14@kzoo.edu> (IF YOU EDIT THIS FILE ADD YOUR NAME AND CONTACT INFO TO THIS LINE)
 *  @created      ::  Sept 24, 2017
 *  @updated      ::  Sept 30, 2017 - Preston Wang-Stosur-Bassett - Added comments (IF YOU EDIT THIS FILE, REPLACE THIS LINE WITH YOUR NAME, THE DATE, AND YOUR CHANGES TO THIS LINE)
 *  @description  ::  This file defines the main logic for the home page
*/

/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/

// Require dependencies
var frameModule = require('ui/frame'); // Frame Module that handles views and navigation
var HomeViewModel = require('./home-view-model'); // The model of the home page
var camera = require('nativescript-camera'); // Nativescript plugin to work with the system camera
var ImageModule = require('ui/image'); // Image Module to support images from the camera

var homeViewModel = new HomeViewModel();

// Load this function when navigating to this page
function onNavigatingTo(args) {
  /*
  This gets a reference this page’s <Page> UI component. You can
  view the API reference of the Page to see what’s available at
  https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
  */
  var page = args.object;

  /*
  A page’s bindingContext is an object that should be used to perform
  data binding between XML markup and JavaScript code. Properties
  on the bindingContext can be accessed using the {{ }} syntax in XML.
  In this example, the {{ message }} and {{ onTap }} bindings are resolved
  against the object returned by createViewModel().

  You can learn more about data binding in NativeScript at
  https://docs.nativescript.org/core-concepts/data-binding.
  */

  // Add the model to the page
  page.bindingContext = homeViewModel;
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo='onNavigatingTo' binding in this page’s XML
file work.
*/

// Add loaded to module exports so it can be accessed in the XML page
/*
 *  @function     ::  loaded()
 *  @description  ::  Request permission to use the camera from the user
*/
exports.loaded = function() {
  camera.requestPermissions();
};

// Add the onNavigatingTo function to module.exports so it can be accessed on the XML page
exports.onNavigatingTo = onNavigatingTo;

// Add openCamera() to exports so it can be accessed from the XML page
/*
 *  @function     ::  openCamera()
 *  @description  ::  Open the camera and allow the user to take a picture
*/
exports.openCamera = function() {
  camera.takePicture({height: 300})
    .then(function (imageAsset) {
      var image = new ImageModule.Image();
      image.src = imageAsset;
      var navigationOptions = {
        moduleName: 'word-detail/word-detail-page',
        context: {
          param1: image
        }
      };

      // Navigate to the word detail page
      frameModule.topmost().navigate(navigationOptions);
    }).catch(function (err) {
      // TODO: Handle the error by showing it to the user somehow
      console.log('Error -> ' + err.message);
    });
};

// Add openSettings to the module.exports so it can be accessed on the xml page
/*
 *  @function     ::  openSettings()
 *  @description  ::  Navigate to the settings page
*/
exports.openSettings = function() {
  frameModule.topmost().navigate({
    moduleName: 'settings/settings-page',
    animated: true,
    transition: {
      name: 'slideLeft'
    }
  });
};

// Add openAbout to the module.exports so it can be accessed on the xml page
/*
 *  @function     ::  openAbout()
 *  @description  ::  Navigate to the about page
*/
exports.openAbout = function() {
  frameModule.topmost().navigate({
    moduleName: 'about/about-page',
    animated: true,
    transition: {
      name: 'slideLeft'
    }
  });
};



// Add openHelp to the module.exports so it can be accessed on the xml page
/*
 *  @function     ::  openHelp()
 *  @description  ::  Navigate to the help page
*/
exports.openHelp = function() {
  frameModule.topmost().navigate({
    moduleName: 'help/help-page',
    animated: true,
    transition: {
      name: 'slideLeft'
    }
  });
};

// Add openSignUp to the module.exports so it can be accessed on the xml page
/*
 *  @function     ::  openSignUp()
 *  @description  ::  Navigate to the Sign Up page
*/
exports.openSignUp = function() {
  frameModule.topmost().navigate({
    moduleName: 'signUp/signUp-page',
    animated: true,
    transition: {
      name: 'slideLeft'
    }
  });
};

// Add openLogin to the module.exports so it can be accessed on the xml page
/*
 *  @function     ::  openLogin()
 *  @description  ::  Navigate to the Login page
*/
exports.openLogin = function() {
  frameModule.topmost().navigate({
    moduleName: 'login/login-page',
    animated: true,
    transition: {
      name: 'slideLeft'
    }
  });
};
