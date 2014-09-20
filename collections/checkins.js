Checkins = new Meteor.Collection('checkins');
Checkins.allow({
    insert : function(userId, doc){
        return userId;
    }
});

Checkins.attachSchema(new SimpleSchema({
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
    photo : {
        type : String,
        optional : true
    }
}));

getAllCheckins = function(){
    return Checkins.find({},{
        sort : {
            created : -1
        }
    });
};