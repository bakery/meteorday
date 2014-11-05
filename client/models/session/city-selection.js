CitySelectionSession = {
    setSelection : function(value){
        return Session.set(this.__selectedCitySessionKey,value);
    },
    getSelection : function(value){
        return Session.get(this.__selectedCitySessionKey);
    },
    resetSelection : function(){
        return Session.set(this.__selectedCitySessionKey,null);
    },
    __selectedCitySessionKey : 'selected-city'
};