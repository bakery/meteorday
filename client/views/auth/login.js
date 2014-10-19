// Meteor.loginWithFacebook = function(options, callback) {
//     // support a callback without options
//     if (! callback && typeof options === "function") {
//       callback = options;
//       options = null;
//     }

//     var credentialRequestCompleteCallback = function(){
//         console.log('things are', arguments);
//         return Accounts.oauth.credentialRequestCompleteHandler(newCallback);
//     };

//     Facebook.requestCredential(options, credentialRequestCompleteCallback);
// };


Template.login.events({
    'click .facebook' : function(){
        console.log('facebook login');

        facebookConnectPlugin.login(['public_profile'],
            function(){
                console.log('Meteor facebook login', arguments);
            
                //Accounts.oauth.credentialRequestCompleteHandler(newCallback).call(this);
            },
            function(){
                console.error('facebook login failed', JSON.stringify(arguments));
            }
        );
    }
});