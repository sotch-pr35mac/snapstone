/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

require('./bundle-config');
var application = require('application');

// This can be used to store app settings that will persist even when the app is closed
var appSettings = require("application-settings");

// Initializes the login variable if the user is not yet logged in
var hasKey = appSettings.hasKey("userLogin");
if (!hasKey)
{
	appSettings.setBoolean("userLogin", false);
}

// Displays the login page if the user is not logged in, otherwise displays bookmarks
if (!appSettings.getBoolean("userLogin"))
{
	application.start(
		{ 
			moduleName: 'login/login-page'
		});
}
else
{
	application.start(
		{ 
			moduleName: 'home/home-page' 
		});
}

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
