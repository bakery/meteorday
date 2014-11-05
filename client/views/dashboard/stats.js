Template.stats.helpers({

    getCityNumber : function() {
        return this.cities.fetch().length;
    },

    getCheckinNumber : function() {
        return _.reduce(this.cities.fetch(), function(memo, city){ return memo + city.counter; }, 0);
    }
});