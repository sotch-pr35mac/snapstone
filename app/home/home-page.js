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
var camera = require('nativescript-camera'); // Nativescript plugin to work with the system camera
var ImageModule = require('ui/image'); // Image Module to support images from the camera
var imageSourceModule = require("image-source"); // support image sources
var fs = require("tns-core-modules/file-system"); // accessing documents
var http = require('http');
var appSettings = require('application-settings');
var observableArray = require('data/observable-array');

var serverURL = "https://safe-temple-72583.herokuapp.com";

// Load this function when navigating to this page
function onNavigatingTo(args) {
  /*
  This gets a reference this page’s <Page> UI component. You can
  view the API reference of the Page to see what’s available at
  https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
  */
  var page = args.object;

  var viewModel = new observableArray.ObservableArray();

  viewModel.bookmarks = [];

  http.request({
    url: serverURL + "/user/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Please forgive my use of plaintext username and password
    content: JSON.stringify({ username: appSettings.getString("username"), password: appSettings.getString("password")})
  }).then(function(response) {
    var res = response.content.toJSON();
    if(res.error || res.success == false) {

      console.log("There was an error logging in the user and getting the user data.");
      console.log(response.status);
      console.log(response.message);
      console.log(response.error);

    } else {
      //viewModel.bookmarks = response.user.bookmarks;

      console.log(response.content.toString());
      viewModel.bookmarks = res.user.bookmarks;

      page.bindingContext = viewModel;
    }
  });

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
  //page.bindingContext = viewModel;
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
      var documents = fs.knownFolders.documents();
      var path = fs.path.join(documents.path, "chars.png");
      imageSourceModule.fromAsset(imageAsset)
                .then(imageSource => {
                     imageSource.saveToFile(path, "png");
                 });
      var navigationOptions = {
        moduleName: 'word-detail/word-detail-page',
        context: {
          param1: image,
          path: path
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

// Open the bookmarks detail page
exports.openDetail = function(args) {
  var label = args.object;
  var wordObject = label.bindingContext;

  frameModule.topmost().navigate({
    moduleName: 'bookmark-detail/bookmark-detail',
     context: wordObject,
    animated: true,
    transition: {
      name: 'slideLeft'
    }
  });
}

// Test Add Bookmark to Database
exports.addBookmark = function() {
  http.request({
    url: serverURL + "/user/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Please forgive my use of plaintext username and password
    content: JSON.stringify({ username: appSettings.getString("username"), password: appSettings.getString("password")})
  }).then(function(response) {
    response = response.content.toJSON();
    if(response.error) {

      console.log("There was an error logging in the user and getting the user data.");
      console.log(response.status);
      console.log(response.message);
      console.log(response.error);

    } else {
      http.request({
        url: serverURL + '/bookmarks/add',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          traditional: '你好',
          simplified: '你好',
          pinyin: 'nihao',
          definitions: [
            'Hi',
            'Hello',
            'How are you'
          ]
        })
      }).then(function(response) {
        response = response.content.toJSON();
        if(response.error) {
          console.log("There was an error adding a bookmark.");
          console.log(response.status);
          console.log(response.message);
          console.log(response.error);
        } else {
          alert("It should have worked. Try re-navigating to the page.");
        }
      })
    }
  });
}
