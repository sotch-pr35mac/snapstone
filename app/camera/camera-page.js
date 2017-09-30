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
var stackModule = require('ui/layouts/stack-layout');
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var CameraViewModel = require('./camera-view-model');
var camera = require("nativescript-camera");
var ImageModule = require("ui/image");

var cameraViewModel = new CameraViewModel();

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    var myStack = page.getViewById('swipable');
    myStack.on(gestures.GestureTypes.swipe, function(args) {
      if(args.direction == gestures.SwipeDirection.right) {
        console.log('Pull out sidebar gets displayed');
        alert('Pull out sidebar gets displayed');
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
    page.bindingContext = cameraViewModel;
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/

exports.loaded = function() {
    camera.requestPermissions();
}
exports.onNavigatingTo = onNavigatingTo;
exports.buttonTap = function() {
    camera.takePicture()   
    .then(function (imageAsset) {
        console.log("Result is an image asset instance");
        var image = new ImageModule.Image();
        image.src = imageAsset;
        var navigationOptions = {
            moduleName: 'word-detail/word-detail-page',
            context: {
                param1: image
            }
        }
        console.log('navigate to word detail');
        alert('Navigate to word detail.');
        frameModule.topmost().navigate(navigationOptions);

    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
