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
var http = require('http');
var appSettings = require('application-settings');

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

var wordObject;
var serverURL = "https://safe-temple-72583.herokuapp.com";

// This function is loaded when navigating to the page
function onNavigatingTo(args)
{
	var page = args.object;

  // Get the word object from the navigation context for the element that the user clicked on the home page
  var data = page.navigationContext;

  page.bindingContext = data;

  wordObject = data;

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

exports.removeBookmark = function() {
  http.request({
    url: serverURL + "/user/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Please forgive my use of plaintext username and password
    content: JSON.stringify({ username: appSettings.getString("username"), password: appSettings.getString("password")})
  }).then(function(response) {
    response = response.content.toJSON();
    if(response.error) {

      console.log("There was an error logging in the user and getting the user data.");
      console.log(response.status);
      console.log(response.message);
      console.log(response.error);

    } else {
      http.request({
        url: serverURL + '/bookmarks/remove',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(wordObject)
      }).then(function(response) {
        response = response.content.toJSON();
        if(response.error) {
          console.log("There was an error adding a bookmark.");
          console.log(response.status);
          console.log(response.message);
          console.log(response.error);
        } else {
          alert("Word removed from bookmarks!");
          frameModule.topmost().navigate(navigateHome);
        }
      })
    }
  });
}
