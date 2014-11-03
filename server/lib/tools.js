Tools = {
    slugify: function(str){
        return str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    }
};