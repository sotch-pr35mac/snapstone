/*
 *  @file         ::  app/login/login-view-model.js
 *  @authors      ::  Lionel Niyongabire <k15ln01@kzoo.edu>
 *  @created      ::  October 11, 2017
 *  @updated      ::  N/A
 *  @description  ::  Defines the view model for the file app/login/login-page.js
*/

var Observable = require('data/observable').Observable;

function LoginViewModel() {
  var viewModel = new Observable();

  return viewModel;
}

// Add LoginViewModel to the module.exports so that it can be accessed in the login-page.js
module.exports = LoginViewModel;