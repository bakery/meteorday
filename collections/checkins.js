Checkins = new Meteor.Collection('checkins');

Checkins.allow({
    insert : function(userId, doc){
        return userId;
    }
});

Checkins.before.insert(function (userId, doc) {
    var currentUser = Meteor.user();
    _.extend(doc, { authorProfile : currentUser.profile });
});

CheckinSchema = new SimpleSchema({
    created : {
        type : Date,
        denyUpdate: true,
        autoValue : function() {
            if (this.isInsert){
                return new Date();
            }
        }
    },
    userId : {
        type : String
    },
    text : {
        type : String
    },
    latitude : {
        type : Number,
        decimal: true
    },
    longitude : {
        type : Number,
        decimal: true
    },
    locationName : {
        type : String,
        optional : true
    },
    locationData : {
        type : Object,
        blackbox : true,
        optional : true
    },
    photo : {
        type : String,
        optional : true
    },
    authorProfile : {
        type : Object,
        blackbox : true
    },
    device : {
        type : Object,
        blackbox : true,
        optional : true
    }
});

Checkins.attachSchema(CheckinSchema);

getAllCheckins = function(){
    return Checkins.find({},{
        sort : {
            created : -1
        },
        limit : Meteor.settings.public.checkins.limit
    });
};