Meteor.startup(function(){
    // enable Twitter OAuth

    Accounts.loginServiceConfiguration.remove({
        service : 'twitter'
    });

    Accounts.loginServiceConfiguration.remove({
        service : 'facebook'
    });

    Accounts.loginServiceConfiguration.insert({
        service     : 'twitter',
        consumerKey : Meteor.settings.private.twitter.consumerKey,
        secret      : Meteor.settings.private.twitter.secret
    });

    Accounts.loginServiceConfiguration.insert({
        service     : 'facebook',
        appId 		: Meteor.settings.private.facebook.applicationId,
        secret      : Meteor.settings.private.facebook.applicationSecret
    });
});