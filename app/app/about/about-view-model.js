/**
* Project: Snapstone
* @authors 			Preston Wang-Stosur-Bassett, Alex Cadigan
* @created 			9/20/2017
* @description 		Defines the view model for the About page
*/

var Observable = require('data/observable').Observable;

function AboutViewModel()
{
	var viewModel = new Observable();

	return viewModel;
}

// Adds the AboutViewModel function to the module.exports so that it can be accessed in the about-page.js file
module.exports = AboutViewModel;
