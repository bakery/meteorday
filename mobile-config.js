// Set PhoneGap/Cordova preferences
App.setPreference('StatusBarOverlaysWebView', false);
App.setPreference('StatusBarBackgroundColor', '#304b80');

App.icons({
  'iphone': 'resources/icons/app.png',
  'iphone_2x': 'resources/icons/app.png'
});


// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('https://github.com/Wizcorp/phonegap-facebook-plugin.git', {
  APP_ID: 726812950734516,
  APP_NAME: 'Waldof'
});