var stackModule = require('ui/layouts/stack-layout');
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var PreviousImageViewModel = require('./previous-image-view-model');

previousImageViewModel = new PreviousImageViewModel();

function onNavigatingTo(args) {
  var page = args.object;

  var myStack = page.getViewById('swipable');
  myStack.on(gestures.GestureTypes.swipe, function(args) {
    if(args.direction == gestures.SwipeDirection.right) {
      console.log('Navigate back to camera');
      frameModule.topmost().navigate('camera/camera-page');
    }
  });

  page.bindingContext = previousImageViewModel;
}

exports.onNavigatingTo = onNavigatingTo;
