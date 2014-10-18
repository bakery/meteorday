Checkins = new Meteor.Collection('checkins');
Checkins.allow({
    insert : function(userId, doc){
        return userId;
    }
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
    photo : {
        type : String,
        optional : true
    }
});

Checkins.attachSchema(CheckinSchema);

getAllCheckins = function(){
    return Checkins.find({},{
        sort : {
            created : -1
        }
    });
};