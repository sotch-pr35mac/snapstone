/**
* Project: Snapstone
* @author         Preston Wang-Stosur-Bassett
* @created        11/14/2017
* @description    This file defines the main logic for the bookmark detail page
*/

// Requires the dependencies
var gestures = require('ui/gestures');
var frameModule = require('ui/frame');
var BookmarkDetailViewModel = require('./bookmark-detail-view-model');

var bookmarkDetailViewModel = new BookmarkDetailViewModel();

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
