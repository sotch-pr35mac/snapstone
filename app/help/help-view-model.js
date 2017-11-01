/*
 *  @file         ::  app/help/help-view-model.js
 *  @authors      ::  Lionel Niyongabire <k15ln01@kzoo.edu>
 *  @created      ::  October 11, 2017
 *  @updated      ::  N/A
 *  @description  ::  Defines the view model for the file app/help/help-page.js
*/

var Observable = require('data/observable').Observable;

function HelpViewModel() {
  var viewModel = new Observable();

  return viewModel;
}

// Add AboutViewModel to the module.exports so that it can be accessed in the about-page.js
module.exports = HelpViewModel;