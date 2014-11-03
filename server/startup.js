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


    // start running a fake checkin marathon
    var capitals = [{"latitude":41,"longitude":19},{"latitude":42,"longitude":1},{"latitude":48,"longitude":16},{"latitude":53,"longitude":27},{"latitude":50,"longitude":4},{"latitude":43,"longitude":18},{"latitude":42,"longitude":23},{"latitude":45,"longitude":15},{"latitude":35,"longitude":33},{"latitude":50,"longitude":14},{"latitude":55,"longitude":12},{"latitude":59,"longitude":24},{"latitude":62,"longitude":-6},{"latitude":60,"longitude":24},{"latitude":48,"longitude":2},{"latitude":52,"longitude":13},{"latitude":36,"longitude":-5},{"latitude":37,"longitude":23},{"latitude":49,"longitude":-2},{"latitude":47,"longitude":19},{"latitude":64,"longitude":-21},{"latitude":53,"longitude":-6},{"latitude":54,"longitude":-4},{"latitude":41,"longitude":12},{"latitude":49,"longitude":-2},{"latitude":42,"longitude":21},{"latitude":56,"longitude":24},{"latitude":47,"longitude":9},{"latitude":54,"longitude":25},{"latitude":49,"longitude":6},{"latitude":42,"longitude":21},{"latitude":35,"longitude":14},{"latitude":47,"longitude":28},{"latitude":43,"longitude":7},{"latitude":42,"longitude":19},{"latitude":52,"longitude":4},{"latitude":59,"longitude":10},{"latitude":52,"longitude":21},{"latitude":38,"longitude":-9},{"latitude":44,"longitude":26},{"latitude":55,"longitude":37},{"latitude":43,"longitude":12},{"latitude":44,"longitude":20},{"latitude":48,"longitude":17},{"latitude":46,"longitude":14},{"latitude":40,"longitude":-3},{"latitude":78,"longitude":15},{"latitude":59,"longitude":18},{"latitude":46,"longitude":7},{"latitude":50,"longitude":30},{"latitude":51,"longitude":0},{"latitude":41,"longitude":12}];

    // Meteor.setInterval(function(){
    //     var user = Meteor.users.findOne({_id :  'MciRyEzJKWu5hv5eD'});
    //     var capital = capitals[Tools.getRandomInt(0,capitals.length-1)];
    //     Checkins.insert({
    //         latitude: capital.latitude,
    //         longitude : capital.longitude,
    //         userId : user._id,
    //         authorProfile : user.profile,
    //         text : 'hello there'
    //     });
    // },4000);

});