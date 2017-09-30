/*
 *  @file         ::  app/word-detail/word-detail-view-model.js
 *  @authors      ::  Preston Wang-Stosur-Bassett <preston.wang-stosur-bassett14@kzoo.edu> (IF YOU EDIT THIS FILE, ADD YOUR NAME AND CONTACT POINT TO THIS LINE)
 *  @created      ::  Sept 24, 2017
 *  @updated      ::  Sept 30, 2017 - Preston Wang-Stosur-Bassett - added comments (IF YOU EDIT THIS FILE, REPLACE THIS LINE WITH YOUR UPDATES AND YOUR INFORMATION)
 *  @description  ::  Defines the view model for the file app/word-detail/word-detail-page.js
*/

var Observable = require('data/observable').Observable;

function WordDetailViewModel() {
  var viewModel = new Observable();

  return viewModel;
}

// Add WordDetailViewModel to the module.exports so that it can be accessed in the word-detail-page.js
module.exports = WordDetailViewModel;
