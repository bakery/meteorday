Router._filters = {
    isLoggedIn: function(pause) {
        if (!(Meteor.loggingIn() || Meteor.user())) {
            this.render('login');
            pause();
        }
    }
}

var filters = Router._filters;

Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(filters.isLoggedIn,{only:['checkinForm']});

Router.map(function () {

    if(Meteor.isCordova){
        this.route('checkinForm', {path: '/'});
    } else {
        this.route('checkins', { path: '/', controller: CheckinsController });
    }

    this.route('login', { path: '/login', controller: LoginController });
});