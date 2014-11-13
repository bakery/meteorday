Template.stats.helpers({

    getCityNumber : function() {
        var cities = this.cities.fetch ? this.cities.fetch() :
            this.cities.get();
        return _.filter(cities, function(c){ return c.counter !== 0; }).length;
    },

    cityLabel : function(value){
        return value === 1 ? 'CITY' : 'CITIES';
    },

    checkinLabel : function(value){
        return value === 1 ? 'CHECKIN' : 'CHECKINS';
    },

    getCheckinNumber : function() {
        var checkins = this.cities.fetch ? this.cities.fetch() :
            this.cities.get();
        return _.reduce(checkins, function(memo, city){ return memo + city.counter; }, 0);
    }
});