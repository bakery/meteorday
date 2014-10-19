// Set PhoneGap/Cordova preferences
App.setPreference('StatusBarOverlaysWebView', false);

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('https://github.com/Wizcorp/phonegap-facebook-plugin.git', {
  APP_ID: 885250964821245,
  APP_NAME: 'Waldof'
});