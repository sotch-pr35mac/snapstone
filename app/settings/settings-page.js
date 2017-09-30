var stackModule = require('ui/layouts/stack-layout');
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var SettingsViewModel = require('./settings-view-model');

settingsViewModel = new SettingsViewModel();

var navigateHome = {
  moduleName: 'camera/camera-page',
  animated: true,
  backstackVisible: false,
  transition: {
    name: "slideRight"
  }
};

function onNavigatingTo(args) {
  var page = args.object;

  var myStack = page.getViewById('swipable');
  myStack.on(gestures.GestureTypes.swipe, function(args) {
    if(args.direction == gestures.SwipeDirection.right) {
      console.log('Navigate Back to Camera');
      frameModule.topmost().navigate(navigateHome);
    }
  });

  page.bindingContext = settingsViewModel;
}


function goBack() {
  frameModule.topmost().navigate(navigateHome);
  // frameModule.topmost().navigate('camera/camera-page');
}
exports.goBack = goBack;
exports.onNavigatingTo = onNavigatingTo;
