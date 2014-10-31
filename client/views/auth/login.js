Template.login.events({
    'click .login-facebook' : function () {
        Meteor.loginWithFacebook(function(err){
            //handle facebook
        });
    },

    'click .login-meteor' : function() {
        Meteor.loginWithMeteorDeveloperAccount(function(err){
            
        });
    }
});