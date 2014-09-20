Meteor.startup(function(){
    // enable Twitter OAuth

    Accounts.loginServiceConfiguration.remove({
        service : 'twitter'
    });

    Accounts.loginServiceConfiguration.insert({
        service     : 'twitter',
        consumerKey : Meteor.settings.private.twitter.consumerKey,
        secret      : Meteor.settings.private.twitter.secret
    });
});