/*
 *  @file         ::  app/signUp/signUp-view-model.js
 *  @authors      ::  Lionel Niyongabire <k15ln01@kzoo.edu>
 *  @created      ::  October 11, 2017
 *  @updated      ::  N/A
 *  @description  ::  Defines the view model for the file app/signUp/signUp-page.js
*/

var Observable = require('data/observable').Observable;

function SignUpViewModel() {
  var viewModel = new Observable();

  return viewModel;
}

// Add SignUpViewModel to the module.exports so that it can be accessed in the signUp-page.js
module.exports = SignUpViewModel;