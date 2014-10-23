Router._filters = {
    isLoggedIn: function(pause) {
        if (!(Meteor.loggingIn() || Meteor.user())) {
            this.render('login');
            pause();
        }
    },

    isOnline: function(pause){
        if(navigator.network && navigator.network.connection){
            if(navigator.network.connection.type === Connection.NONE){
                this.render('offline');
                pause();
            }
        }
    }
};

var filters = Router._filters;

Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function(){
    // temporary work around since this.next does not seem to work
    filters.isOnline.apply(this, arguments);
    filters.isLoggedIn.apply(this, arguments);
});
//Router.onBeforeAction();

Router.map(function () {
    this.route('checkins', { path: '/', controller: CheckinsController });
    this.route('checkinForm', {path: '/checkin'});
    this.route('login', { path: '/login', controller: LoginController });
});