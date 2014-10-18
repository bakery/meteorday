Accounts.onCreateUser(function(options, user){
    var extendedProfile = _.extend(options.profile || {}, {
        imageUrl : user.services.twitter.profile_image_url_https
    });
    return _.extend(user, { profile : extendedProfile });
});