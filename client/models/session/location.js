LocationSession = {
    __selectedLocationSessionKey : 'selected-location',
    __locationSelectorActiveSessionKey : 'location-selector-showing',

    getSelectedLocation : function(){
        return Session.get(this.__selectedLocationSessionKey);
    },
    setSelectedLocation : function(locationId){
        return Session.set(this.__selectedLocationSessionKey,locationId);
    },
    
    getIsLocationSelectorActive : function(){
        return Session.get(this.__locationSelectorActiveSessionKey);
    },

    setIsLocationSelectorActive : function(value){
        return Session.set(this.__locationSelectorActiveSessionKey,value);
    },

    reset : function(){
        Session.set(this.__selectedLocationSessionKey,null);
        Session.set(this.__locationSelectorActiveSessionKey,null);
    }
};