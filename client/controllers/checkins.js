CheckinsController = MobileController.extend({
    template: 'checkinsList',

    subscriptions: function () {
        return Meteor.subscribe('checkins');
    },

    data: function () {
        return {
            checkins : getAllCheckins()
        };
    }
});

CheckedInController = RouteController.extend({
    template: 'checkedIn'
});