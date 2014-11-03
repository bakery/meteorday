DashboardController = DesktopController.extend({
    template: 'dashboard',

    waitOn: function () {
        return [
            Meteor.subscribe('checkins'),
            Meteor.subscribe('city-stats')
        ];
    },

    data: function () {
        return {
            checkins : getAllCheckins(),
            cities : getAllCityStats()
        };
    }
});

// http://d3.artzub.com/wbca/