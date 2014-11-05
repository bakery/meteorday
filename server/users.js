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
        var email = user.services['meteor-developer'].emails &&
            user.services['meteor-developer'].emails[0] &&
            user.services['meteor-developer'].emails[0].address;
        var url = email ? Gravatar.imageUrl(email, {
            size: 60, default: 'retro'
        }) : null;

        extendProfileWith = {
            imageUrl : url
        };
    }

    var extendedProfile = _.extend(options.profile || {}, extendProfileWith);

    return _.extend(user, { profile : extendedProfile });
});