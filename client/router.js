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

if(Meteor.isCordova){
    Router.onBeforeAction(function(){
        // temporary work around since this.next does not seem to work
        filters.isOnline.apply(this, arguments);
        filters.isLoggedIn.apply(this, arguments);
    });
}

Router.map(function () {
    
    if(Meteor.isCordova){
        this.route('checkins', { path: '/', controller: CheckinsController });
    } else {
        this.route('dashboard', { path: '/', controller: DashboardController });
    }

    
    this.route('login', { path: '/login', controller: LoginController });
    
    // loading and offline routes are for convenience (style/debug templates)
    this.route('loading', { path: '/loading'});
    this.route('offline', { path: '/offline'});

    // convenience route for testing checkins on desktop browsers
    if(!Meteor.isCordova){
        this.route('checkins', { path: '/checkins', controller: CheckinsController });
    }
});