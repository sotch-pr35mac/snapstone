/*
 *  @file         ::  app/about/about-view-model.js
 *  @authors      ::  Preston Wang-Stosur-Bassett <preston.wang-stosur-bassett14@kzoo.edu>
 *  @created      ::  Sept 30, 2017
 *  @updated      ::  N/A
 *  @description  ::  Defines the view model for the file app/about/about-page.js
*/

var Observable = require('data/observable').Observable;

function AboutViewModel() {
  var viewModel = new Observable();

  return viewModel;
}

// Add AboutViewModel to the module.exports so that it can be accessed in the about-page.js
module.exports = AboutViewModel;
