CityStats = new Meteor.Collection('city-stats');
CountryStats = new Meteor.Collection('country-stats');

CityStats.allow({
    insert : function(){ return false; },
    update : function(){ return false; },
    remove : function(){ return false; }
});

CountryStats.allow({
    insert : function(){ return false; },
    update : function(){ return false; },
    remove : function(){ return false; }
});

BaseStatSchema = new SimpleSchema({
    name : {
        type : String
    },
    slug : {
        type : String,
        autoValue : function() {
            var name = this.field('name');
            if (name.isSet) {
                return Tools.slugify(name.value);
            }
        }
    },
    counter : {
        type : Number,
        defaultValue : 0,
        optional : true
    }
});

CityStatsSchema = new SimpleSchema([BaseStatSchema,{
    country : {
        type : String
    },
    countryShortName : {
        type : String
    },
    latitude : {
        type : Number,
        decimal: true
    },
    longitude : {
        type : Number,
        decimal: true
    }
}]);

CityStats.attachSchema(CityStatsSchema);
CountryStats.attachSchema(BaseStatSchema);

getAllCityStats = function(){
    return CityStats.find({}, {sort: {'counter': -1} });
};

Stats = {
    processCheckin : function(checkin){
        Geocoder.reverseGeocode(checkin.latitude, checkin.longitude, function(data){
            
            console.log('processing checkin', data);

            var geography = {};

            function updateStats(Collection, values){
                var upsertResult = Collection.upsert({ slug : Tools.slugify(values.name) },
                    {
                        $set : values,
                        $inc: { counter: 1 }
                    }
                );

                return upsertResult.insertedId ? upsertResult.insertedId :
                    Collection.findOne({ slug : Tools.slugify(values.name) })._id;
            }

            if(data.city){
                geography.cityId = updateStats(CityStats, {
                    name : data.city,
                    country : Tools.slugify(data.country),
                    countryShortName : data.countryShortName,
                    latitude : data.latitude,
                    longitude : data.longitude
                });
            }

            if(data.country){
                geography.countryId = updateStats(CountryStats, {
                    name : data.country
                });
            }

            Checkins.update(checkin._id, { $set : { geography : geography } });
        });
    }
};