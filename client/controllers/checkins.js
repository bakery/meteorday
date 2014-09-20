CheckinsController = RouteController.extend({
    template: 'checkinsList',

    waitOn: function () {
    	return Meteor.subscribe('checkins');
    },

    data: function () {
        return {
        	checkins : getAllCheckins()
        };
    }

    // action: function () {
    //  if we want to override default behavior 
    // }
});

CheckedInController = RouteController.extend({
    template: 'checkedIn'
});