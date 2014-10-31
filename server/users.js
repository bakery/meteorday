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
                'http://graph.facebook.com', user.services.facebook.id, 'picture', '?height=60&width=60'
            ].join('/')
        };
    }

    if(user.services['meteor-developer']){
        extendProfileWith = {
            imageUrl : 'http://media.yayart.com/media/images/generated/user-picture-placeholder_60x60.png'
        };
    }

    var extendedProfile = _.extend(options.profile || {}, extendProfileWith);

    return _.extend(user, { profile : extendedProfile });
});