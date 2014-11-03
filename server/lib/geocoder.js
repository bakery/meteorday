Geocoder = {
    reverseGeocode : function(latitude, longitude, callback){
        return Meteor.http.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params : {
                latlng: [latitude,longitude].join(','),
                key: 'AIzaSyDeJxYBiJGB_z0d41KdHuOzACXtaddU0qU'
            }
        }, function(error, result){
            var hasResults = !error && (result.statusCode === 200) &&
                (result.data.results) && (result.data.results.length > 0);

            if(hasResults){
                var data = result.data.results[0];
                var city = _.find(data.address_components, function(ac){
                    return ac.types.indexOf('locality') !== -1;
                });
                var country = _.find(data.address_components, function(ac){
                    return ac.types.indexOf('country') !== -1;
                });

                city = city ? city.long_name : city;
                country = country ? country.long_name : country;

                callback.call(null, {
                    city : city,
                    country : country,
                    latitude : parseFloat(data.geometry.location.lat),
                    longitude : parseFloat(data.geometry.location.lng)
                });

            } else {
                console.error('error geolocating',latitude,longitude,error);
            }
        });
    }
};