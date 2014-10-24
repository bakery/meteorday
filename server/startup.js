Meteor.startup(function(){
    Accounts.loginServiceConfiguration.remove({
        service : 'facebook'
    });

    Accounts.loginServiceConfiguration.insert({
        service     : 'facebook',
        appId 		: Meteor.settings.private.facebook.applicationId,
        secret      : Meteor.settings.private.facebook.applicationSecret
    });
});