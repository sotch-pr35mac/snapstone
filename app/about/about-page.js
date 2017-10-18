/**
* Project: Snapstone
* @author         Preston Wang-Stosur-Bassett, Alex Cadigan
* @created        9/30/2017
* @description    This file defines the main logic for the About page
*/

// Requires the dependencies
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var AboutViewModel = require('./about-view-model');

var aboutViewModel = new AboutViewModel();

// Defines the default behavior for navigating home
var navigateHome = {
	moduleName: 'home/home-page',
	animated: true,
	backstackVisible: false,
	clearHistory: true,
	transition: {
		name: 'slideRight'
	}
};

// This function is loaded when navigating to the page
function onNavigatingTo(args)
{
	var page = args.object;

	// Defines the swipeable gestures and their actions
	var myStack = page.getViewById("swipeable");
	myStack.on(gestures.GestureTypes.swipe, function(args)
	{
		// When swiping right, navigate home
		if (args.direction == gestures.SwipeDirection.right)
		{
			frameModule.topmost().navigate(navigateHome);
		}
	});

	// Add the model to the page
	page.bindingContext = aboutViewModel;
}

// Adds the function go back to the module exports so it can be accessed from the XML page
exports.goBack = function()
{
	frameModule.topmost().navigate(navigateHome);
};

// Adds the function on navigating to to module exports so it can be accessed from the XML page
exports.onNavigatingTo = onNavigatingTo;

var utilityModule = require("utils/utils");

// Opens the link to NativeScript
exports.launchNativeScript = function()
{
	utilityModule.openUrl("https://www.nativescript.org/");
};

// Opens the link to Tesseract
exports.launchTesseract = function()
{
	utilityModule.openUrl("http://tesseract.projectnaptha.com/");
};

// Opens the link to MongoDB
exports.launchMongoDB = function()
{	
	utilityModule.openUrl("https://www.mongodb.com/");
};

// Opens the link to Node.js
exports.launchNode = function()
{
	utilityModule.openUrl("https://nodejs.org/en/");
};

// Opens the link to Express.js
exports.launchExpress = function()
{
	utilityModule.openUrl("https://expressjs.com/");
};

// Opens the link to Sail.js
exports.launchSail = function()
{
	utilityModule.openUrl("http://sailsjs.com/");
};

// Opens the link to the Snapstone project on GitHub
exports.launchSnapstone = function()
{
	utilityModule.openUrl("https://github.com/sotch-pr35mac/snapstone/tree/master");
};

// Opens the link to the Snapstone server on GitHub
exports.launchServer = function()
{
	utilityModule.openUrl("https://github.com/sotch-pr35mac/snapstone-server/tree/master");
};

// Opens Preston's GitHub
exports.launchPrestonGitHub = function()
{
	utilityModule.openUrl("https://github.com/sotch-pr35mac");
};

// Opens Preston's LinkedIn
exports.launchPrestonLinkedIn = function()
{
	utilityModule.openUrl("https://www.linkedin.com/in/prestonstosurbassett/");
};

// Opens Danny's GitHub
exports.launchDannyGitHub = function()
{
	utilityModule.openUrl("https://github.com/dmichelin");
};

// Opens Danny's LinkedIn
exports.launchDannyLinkedIn = function()
{
	utilityModule.openUrl("https://www.linkedin.com/in/danielmichelin/");
};

// Opens Lionel's GitHub
exports.launchLionelGitHub = function()
{
	utilityModule.openUrl("https://github.com/lioniyon");
};

// Opens Lionel's LinkedIn
exports.launchLionelLinkedIn = function()
{
	utilityModule.openUrl("https://www.linkedin.com/in/lionel-niyongabire-1482a195/");
};

// Opens Alex's GitHub
exports.launchAlexGitHub = function()
{
	utilityModule.openUrl("https://github.com/AlexCadigan");
};

// Opens Alex's LinkedIn
exports.launchAlexLinkedIn = function()
{
	utilityModule.openUrl("https://www.linkedin.com/in/alexandercadigan/");
};

// Opens the link to the license
exports.launchLicense = function()
{
	utilityModule.openUrl("https://www.gnu.org/licenses/gpl-3.0.en.html");
};
