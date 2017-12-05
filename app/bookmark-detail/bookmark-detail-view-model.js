/**
* Project: Snapstone
* @authors 			Preston Wang-Stosur-Bassett
* @created 			11/14/2017
* @description 		Defines the view model for the bookmark detail page
*/

var Observable = require('data/observable').Observable;

function BookmarkDetailViewModel()
{
	var viewModel = new Observable();

	return viewModel;
}

// Adds the AboutViewModel function to the module.exports so that it can be accessed in the about-page.js file
module.exports = BookmarkDetailViewModel;
