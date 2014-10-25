DashboardController = DesktopController.extend({
    template: 'dashboard',

    waitOn: function () {
        return Meteor.subscribe('checkins');
    },

    data: function () {
        return {
            checkins : getAllCheckins()
        };
    }
});

// http://d3.artzub.com/wbca/