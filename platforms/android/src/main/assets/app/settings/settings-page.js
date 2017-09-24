var stackModule = require('ui/layouts/stack-layout');
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var SettingsViewModel = require('./settings-view-model');

settingsViewModel = new SettingsViewModel();

function onNavigatingTo(args) {
  var page = args.object;

  var myStack = page.getViewById('swipable');
  myStack.on(gestures.GestureTypes.swipe, function(args) {
    if(args.direction == gestures.SwipeDirection.up) {
      console.log('Navigate Back to Camera');
      frameModule.topmost().navigate('camera/camera-page');
    }
  });

  page.bindingContext = settingsViewModel;
}

exports.onNavigatingTo = onNavigatingTo;
