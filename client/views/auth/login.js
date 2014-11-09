Template.login.events({
    'click .login-facebook' : function () {
        Meteor.loginWithFacebook(function(error){
            //handle facebook
            if(!error){
                Router.go('checkins');
            }
        });
    },

    'click .login-meteor' : function() {
        Meteor.loginWithMeteorDeveloperAccount(function(error){
            if(!error){
                Router.go('checkins');
            }
        });
    }
});