/**
* Project: Snapstone
* @authors 		     Lionel Niyongabire 
* @created 			10/23/2017
* @description 		Defines the view model for the Sign Up page
*/

var Observable = require('data/observable').Observable;

function SignUpViewModel()
{
    var viewModel = new Observable();

	return viewModel;
}

// Adds the SignUpViewModel function to the module.exports so that it can be accessed in the signUp-page.js file
module.exports = SignUpViewModel;
