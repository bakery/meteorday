Router._filters = {
    isLoggedIn: function(pause) {
        if (!(Meteor.loggingIn() || Meteor.user())) {
            this.render('login');
            pause();
        }
    }
};

var filters = Router._filters;

Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(filters.isLoggedIn);

Router.map(function () {
    this.route('checkins', { path: '/', controller: CheckinsController });
    this.route('checkinForm', {path: '/checkin'});
    this.route('login', { path: '/login', controller: LoginController });
});