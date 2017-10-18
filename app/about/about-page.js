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

// Opens the link to the Snapstone project on GitHub
var utilityModule = require("utils/utils");
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
