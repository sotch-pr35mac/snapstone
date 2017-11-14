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
    content: JSON.stringify({ username: "dmichelin", password: "dmichelin" })
    }).then(function (response) {
        var result = response.content.toJSON();
        console.log(result);
        sendPhoto();
    }, function (e) {
        console.log("Error occurred " + e);
  });



  // Define swipable gestures and their actions
  var myStack = page.getViewById('swipable');
  myStack.on(gestures.GestureTypes.swipe, function(args) {
    if(args.direction == gestures.SwipeDirection.right) {
      // When swipe right, navigate home using the behavior defined in the global navigateHome object
      frameModule.topmost().navigate(navigateHome);
    }
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

function sendPhoto(){
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
    console.log(JSON.parse(e.response.getBodyAsString()).text);
  }
}

// Add the onNavigatingTo function to module.exports so it can be accessed on the xml page
exports.onNavigatingTo = onNavigatingTo;
