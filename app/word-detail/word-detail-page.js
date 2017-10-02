/*
 *  @file         ::  app/word-detail/word-detail-page.js
 *  @authors      ::  Preston Wang-Stosur-Bassett <preston.wang-stosur-bassett14@kzoo.edu> (IF YOU EDIT THIS FILE, ADD YOUR NAME AND A METHOD OF CONTACT TO THIS LINE)
 *  @created      ::  Sept 24, 2017
 *  @updated      ::  Oct 1, 2017 - Preston Wang-Stosur-Bassett - Added OCR dependencies as a test / proof of concept (IF YOU EDIT THIS FILE, REPLACE THIS LINE WITH YOUR NAME AND THE DATE, AND ADD YOURSELF TO THE LIST OF AUTHORS)
 *  @description  ::  This file contains the main logic for the word detail page, which is where the app navigates after a picture is taken
*/

// Require dependencies
var gestures = require('ui/gestures'); // Gestures Module to handle gestures and swipes
var frameModule = require('ui/frame'); // Frame Module that handles views and navigation
var WordDetailViewModel = require('./word-detail-view-model'); // The Model of the word detail page
var OCRPlugin = require('nativescript-ocr'); // Require the nativescript-orc pluggin, which makes it easy for us to use Tesseract.js inside of our nativescript app
var imageSource = require('image-source');

var ocr = new OCRPlugin.OCR();
var wordDetailViewModel = new WordDetailViewModel();

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

  var readableImage = imageSource.fromFile(imageData.param1.src.android);
  //var readableImage = imageSource.fromFile('~/test-ocr-nativescript.png');

  console.log(JSON.stringify(readableImage));

  /*
   *  TODO: Get this part working fully
  */
  // Read the text in the image, and display it to the console
  ocr.retrieveText({
    image: imageData.param1,
    language: 'chi_sim'
  }).then(
    function(result) {
      alert(result.text);
      console.log('Result: ' + result.text);
    },
    function(error) {
      alert('there was some sort of error... idk.. read the logs.');
      alert(error);
      console.log('Error: ' + error);
    }
  );

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

// Add the onNavigatingTo function to module.exports so it can be accessed on the xml page
exports.onNavigatingTo = onNavigatingTo;
