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

CheckinsByCityController = MobileController.extend({
    template: 'checkinsByCity',

    subscriptions: function () {
        return Meteor.subscribe('checkinsByCity', this.params.id);
    },

    data: function () {
        return {
            checkins : Checkins.find()
        };
    }
});

CheckedInController = RouteController.extend({
    template: 'checkedIn'
});