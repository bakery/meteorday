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

    // action: function () {
    //     if (this.ready()){
    //         this.render();
    //     }
    //     else {
    //         this.render('loading');
    //     }
    // }
});

CheckedInController = RouteController.extend({
    template: 'checkedIn'
});