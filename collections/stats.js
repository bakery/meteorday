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

Stats = {
    processCheckin : function(checkin){
        Geocoder.reverseGeocode(checkin.latitude, checkin.longitude, function(data){
            function updateStats(Collection, values){
                Collection.upsert({ slug : Tools.slugify(values.name) },
                    {
                        $set : values,
                        $inc: { counter: 1 }
                    }
                );
            }

            if(data.city){
                updateStats(CityStats, {
                    name : data.city,
                    country : Tools.slugify(data.country),
                    latitude : data.latitude,
                    longitude : data.longitude
                });
            }

            if(data.country){
                updateStats(CountryStats, {
                    name : data.country
                });
            }
        });
    }
};