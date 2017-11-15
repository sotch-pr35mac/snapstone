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

  // Get the word object from the navigation context for the element that the user clicked on the home page
  var data = page.navigationContext;

  page.bindingContext = data;

  page.getViewById('simplified').text = "Simplified: " + data.simplified;
  page.getViewById('traditional').text = "Traditional: " + data.traditional;
  page.getViewById('pinyin').text = "Pinyin: " + data.pinyin;

}

exports.onNavigatingTo = onNavigatingTo;

// Adds the function go back to the module exports so it can be accessed from the XML page
exports.goBack = function()
{
	frameModule.topmost().navigate(navigateHome);
};
