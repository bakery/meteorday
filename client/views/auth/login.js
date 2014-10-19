Template.login.events({
    'click .login-twitter' : function () {
        Meteor.loginWithTwitter(function(err){
            //handle error;
        });
    },
    'click .login-facebook' : function () {
        Meteor.loginWithFacebook(function(err){
            //handle facebook
        });
    }
});