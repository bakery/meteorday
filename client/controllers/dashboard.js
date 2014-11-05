DashboardController = DesktopController.extend({
    template: 'dashboard',

    waitOn: function () {
        return [
            Meteor.subscribe('checkins',Meteor.settings.public.checkins.dashboardLimit),
            Meteor.subscribe('city-stats')
        ];
    },

    data: function () {
        return {
            checkins : getAllCheckins(Meteor.settings.public.checkins.dashboardLimit),
            cities : getAllCityStats()
        };
    }
});