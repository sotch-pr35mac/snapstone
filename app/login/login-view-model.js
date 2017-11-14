/**
* Project: Snapstone
* @authors 		     Lionel Niyongabire 
* @created 			10/23/2017
* @description 		Defines the view model for the Login page
*/

var Observable = require('data/observable').Observable;

function LoginViewModel()
{
    var viewModel = new Observable();

	return viewModel;
}

// Adds the LoginViewModel function to the module.exports so that it can be accessed in the login-page.js file
module.exports = LoginViewModel;