/*
 *  @file         ::  app/word-detail/word-detail-page.js
 *  @authors      ::  Preston Wang-Stosur-Bassett <preston.wang-stosur-bassett14@kzoo.edu>, Daniel Michelin <daniel.michelin14@kzoo.edu>
 *  @created      ::  Sept 24, 2017
 *  @updated      ::  Sept 29, 2017 - Preston Wang-Stosur-Bassett (IF YOU EDIT THIS FILE, REPLACE THIS LINE WITH YOUR NAME AND THE DATE, AND ADD YOURSELF TO THE LIST OF AUTHORS)
 *  @description  ::  This file contains the main logic for the word detail page, which is where the app navigates after a picture is taken
*/

// Require dependencies
var gestures = require('ui/gestures'); // Gestures Module to handle gestures and swipes
var frameModule = require('ui/frame'); // Frame Module that handles views and navigation
var WordDetailViewModel = require('./word-detail-view-model'); // The Model of the word detail page
var wordDetailViewModel = new WordDetailViewModel();
// stuff to upload images
var bghttp = require("nativescript-background-http");
// stuff to authenticate
var http = require("http");
var session = bghttp.session("image-upload");
var imagePath;
var path = "https://safe-temple-72583.herokuapp.com";
var appSettings = require("application-settings")
//var path = "http://192.168.1.23:1337";
// Gloabl navigateHome object that defines the behavior for navigating home
var navigateHome = {
  moduleName: 'home/home-page',
  animated: true,
  backstackVisible: false,
  clearHistory: true,
  transition: {
    name: 'slideRight'
  }
};

// Load this function when navigating to this page
function onNavigatingTo(args) {
  var page = args.object;

  // Hides the action bar so the user cannot navigate away from the page
  page.actionBarHidden = true;

  // Grab the image that we just took
  var imageData = page.navigationContext;

  // Get the image view we need
  var imageView = page.getViewById('wordImage');

  // Set the image view
  imageView.src = imageData.param1.src;

  // send the image to our server
  imagePath = imageData.path;

  http.request({
    url: path+"/user/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Please forgive my use of plaintext username and password
    content: JSON.stringify({ username: appSettings.getString("username"), password: appSettings.getString("password")})
    }).then(function (response) {
        var result = response.content.toJSON();
        console.log(result);
        sendPhoto(args);

    }, function (e) {
        console.log("Error occurred " + e);
  });

  // Add the model to the page
  page.bindingContext = wordDetailViewModel;
}

// add the function goBack to the module.exports so it can be accessed on the xml page
/*
 *  @function     ::  goBack()
 *  @description  ::  navigate home using the behavior defined in the global navigateHome object
*/
exports.goBack = function() {
  frameModule.topmost().navigate(navigateHome);
};

function sendPhoto(args){
  //var temp = "https://requestb.in/1oi3baf1"
  var request = {
    url: path+"/photo/process",
    //url:temp,
    method: "POST",
    headers: {
        "Content-Type": "application/octet-stream",
        "File-Name": "chars.png"
    },
    description: "{ 'uploading': 'chars.jpg' }"
  };

  var params = [{name:"photo",filename:imagePath,mimeType:'image/jpeg'}]
  var task = session.multipartUpload(params, request);
  task.on("progress", logEvent);
  task.on("error", logEvent);
  task.on("complete", logResponse);
  function logEvent(e) {
    console.log(e.toString());
    console.log("currentBytes: " + e.currentBytes);
    console.log("totalBytes: " + e.totalBytes);
    console.log("eventName: " + e.eventName);
    console.dir(e);
  }
  function logResponse(e){
    console.log("eventName: " + e.eventName);
    console.log(JSON.parse(e.response.getBodyAsString()));

    var jsonData = JSON.parse(e.response.getBodyAsString());

    var page = args.object;
    var lblTraditionalSimplified = page.getViewById("lblTraditionalSimplified");
    var lblPinyin = page.getViewById("lblPinyin");
    var lblDefinitions = page.getViewById("lblDefinitions");

    if (jsonData != null)
    {
      lblTraditionalSimplified.text = jsonData.traditional;
      lblPinyin.text = jsonData.pinyin;
      lblDefinitions = jsonData.definitions;
    }
    else
    {
      lblTraditionalSimplified.text = "Unable to read picture";
      lblPinyin.text = "";
      lblDefinitions.text = "";
    }

    // This should show the action bar again and allow the user to swipe away from the page
    page.actionBarHidden = false;
    var myStack = page.getViewById('swipable');
    myStack.on(gestures.GestureTypes.swipe, function(args)
    {
      if(args.direction == gestures.SwipeDirection.right)
      {
        frameModule.topmost().navigate(navigateHome);
      }
    });

    // Makes all of the different translation fields visible
    page.addCss("#lblPhotoUpload {visibility: hidden}");
    page.addCss("#lblTraditionalSimplified {visibility: visible}");
    page.addCss("#lblPinyin {visibility: visible}");
    page.addCss("#lblDefinitions {visibility: visible}");
  }

}

// Add the onNavigatingTo function to module.exports so it can be accessed on the xml page
exports.onNavigatingTo = onNavigatingTo;

var dialogs = require("ui/dialogs");

// Bookmarks the current Chinese word in the user's bookmarks
exports.bookmark = function()
{
  // Sends alert to the user
  dialogs.alert({title: "Bookmarks", message: "This character is now bookmarked!", okButtonText: "Yay!"});

  // Lots of additional code must go here!
}
