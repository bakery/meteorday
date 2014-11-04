Geocoder = {

    reverseGeocode : function(latitude, longitude, callback){

        var that = this;
        var cached = this.__getFromCache(latitude,longitude);

        if(cached){
            callback.call(null, cached.data);
            return;
        }

        return Meteor.http.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params : {
                latlng: [latitude,longitude].join(','),
                key: this.__apiKey()
            }
        }, function(error, result){
            var hasResults = !error && (result.statusCode === 200) &&
                (result.data.results) && (result.data.results.length > 0);


            if(hasResults){
                var data = result.data.results[0];
                
                var cities = _.reduce(result.data.results, function(memo, r){
                    var city = _.find(r.address_components, function(ac){
                        return ac.types.indexOf('locality') !== -1;
                    });

                    if(city){
                        memo.push(city);
                    }

                    return memo;
                }, []);

                var countries = _.reduce(result.data.results, function(memo, r){
                    var country = _.find(r.address_components, function(ac){
                        return ac.types.indexOf('country') !== -1;
                    });

                    if(country){
                        memo.push(country);
                    }

                    return memo;
                }, []);
                
                var city = cities.length > 0 ? cities[0].long_name : null;
                var country = countries.length ? countries[0].long_name : null;
                var countryShortName = countries.length ? countries[0].short_name : null;

                var response = {
                    city : city,
                    country : country,
                    countryShortName : countryShortName,
                    latitude : parseFloat(data.geometry.location.lat),
                    longitude : parseFloat(data.geometry.location.lng)
                };
                that.__putToCache(latitude,longitude,response);
                callback.call(null, response);

            } else {
                console.error('error geolocating',latitude,longitude,error,result);
            }
        });
    },

    __cache : [],

    __getFromCache : function(latitude,longitude){
        return _.find(this.__cache, function(c){
            return (c.latitude === latitude) && (c.longitude === longitude);
        });
    },

    __putToCache : function(latitude, longitude, data){
        this.__cache.push({
            latitude : latitude,
            longitude : longitude,
            data : data
        });
    },

    __apiKey : function(){
        return Tools.getRandomValue(Meteor.settings.private.google.apiKey);
    }
};