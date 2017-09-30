var stackModule = require('ui/layouts/stack-layout');
var view = require("ui/core/view");
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var WordDetailViewModel = require('./word-detail-view-model');

wordDetailViewModel = new WordDetailViewModel();

function onNavigatingTo(args) {
  var page = args.object;
    
  // Grab the image that we just took
  var imageData = page.navigationContext;
  console.log(imageData.param1);
    
  // Get the image view we need
  var imageView = view.getViewById(page, "wordImage");
    
  // Set the image view
  imageView.src = imageData.param1.src;
  var myStack = page.getViewById('swipable');
  myStack.on(gestures.GestureTypes.swipe, function(args) {
    if(args.direction == gestures.SwipeDirection.right) {
      console.log('Navigate Back to Camera');
      frameModule.topmost().navigate('camera/camera-page');
    }
  });

  page.bindingContext = wordDetailViewModel;
}

exports.onNavigatingTo = onNavigatingTo;
