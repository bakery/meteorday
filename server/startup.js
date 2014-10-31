Meteor.startup(function(){
    Accounts.loginServiceConfiguration.remove({
        service : 'facebook'
    });

    Accounts.loginServiceConfiguration.insert({
        service     : 'facebook',
        appId       : Meteor.settings.private.facebook.applicationId,
        secret      : Meteor.settings.private.facebook.applicationSecret
    });

    Accounts.loginServiceConfiguration.remove({
        service : 'meteor-developer'
    });

    Accounts.loginServiceConfiguration.insert({
        service     : 'meteor-developer',
        clientId    : Meteor.settings.private.meteor.clientId,
        secret      : Meteor.settings.private.meteor.secret
    });
});