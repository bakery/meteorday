CheckinsController = RouteController.extend({
    template: 'checkinsList',

    waitOn: function () {
    	return Meteor.subscribe('checkins');
    },

    data: function () {
        return {
        	checkins : getAllCheckins()
        };
    },

    action: function () {
        if (this.ready()){
            this.render();
        }
        else {
            this.render('Loading');
        }
    }
});

CheckedInController = RouteController.extend({
    template: 'checkedIn'
});