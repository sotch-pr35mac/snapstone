var stackModule = require('ui/layouts/stack-layout');
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var WordDetailViewModel = require('./word-detail-view-model');

wordDetailViewModel = new WordDetailViewModel();

function onNavigatingTo(args) {
  var page = args.object;

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
