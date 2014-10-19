Accounts.onCreateUser(function(options, user){

    var extendProfileWith = {};

    if(user.services.twitter){
        extendProfileWith = {
            imageUrl : user.services.twitter.profile_image_url_https
        };
    }

    if(user.services.facebook){
        extendProfileWith = {
            imageUrl : [
                'http://graph.facebook.com', user.services.facebook.id, 'picture'
            ].join('/')
        };
    }

    var extendedProfile = _.extend(options.profile || {}, extendProfileWith);

    return _.extend(user, { profile : extendedProfile });
});