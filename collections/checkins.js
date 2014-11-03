Checkins = new Meteor.Collection('checkins');

Checkins.allow({
    insert : function(userId, doc){
        return userId;
    }
});

// XXX Bring this back after simulation
Checkins.before.insert(function (userId, doc) {
    var currentUser = Meteor.user();
    _.extend(doc, { authorProfile : currentUser.profile });
});

Checkins.after.insert(function(userId, doc) {

    // do this on the server only
    if(!Meteor.isServer){
        return;
    }

    var checkinId = this._id;

    // upload image to Imugr

    if(doc.photo && !SimpleSchema.RegEx.Url.exec(doc.photo)){
        var parameters = {
            image: doc.photo,
            apiKey: Meteor.settings.private.imugr.apiKey
        };

        Imgur.upload(parameters, function (error, data) {
            if (error) {
                console.error('error uploading image', error);
            } else {
                Checkins.update(checkinId, {
                    $set : {
                        photo : data.link
                    }
                });
            }
        });
    }

    // update geo stats
    
    Stats.processCheckin(doc);
    
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
    media : {
        type : Object,
        optional : true,
        blackbox : true
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