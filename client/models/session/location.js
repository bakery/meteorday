LocationSession = {
    __sessionKey : 'selected-location',
    getSelectedLocation : function(){
        return Session.get(this.__sessionKey);
    },
    setSelectedLocation : function(locationId){
        return Session.set(this.__sessionKey,locationId);
    },
    reset : function(){
        Session.set(this.__sessionKey,null);
    }
};