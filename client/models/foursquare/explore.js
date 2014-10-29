Foursquare = {
    explore : function(lat, lng, ready){

        var authentication = {
            client_id : Meteor.settings.public.foursquare.clientId,
            client_secret : Meteor.settings.public.foursquare.clientSecret,
            m : 'swarm',
            v : '20140806'
        };

        console.log('exploring with 4square', lat, lng);

        Meteor.http.call('GET','https://api.foursquare.com/v2/venues/explore',
            {
                params : _.extend({}, authentication, {
                    ll : [lat,lng].join(','),
                    limit : 10, sortByDistance : 1
                })
            },
            function(error, result){
                console.log('called 4square',arguments);

                if(result.statusCode !== 200){
                    return;
                }

                // merge header full location with venue results

                var data = result.data.response;
                var locations = [];

                if(data.headerFullLocation){
                    locations.push({
                        name : data.headerFullLocation
                    });
                }

                if(data.groups && data.groups.length > 0){
                    _.each(data.groups[0].items, function(i){
                        locations.push({
                            name : i.venue.name,
                            data : i.venue
                        });
                    });
                }

                if(ready && _.isFunction(ready)){
                    ready(locations);
                }
            }
        );
    }
};