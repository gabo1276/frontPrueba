define(['jquery'],
    function($) {
        
        utilForm = {

             serializeFormToJson : function(formSelector) {
                    var jsonData = {};
                    var formData = $(formSelector).serializeArray();
                    $.each(formData, function() {
                        if(this.name != "region")
                        {
                            if (jsonData[this.name]) {
                                if (!jsonData[this.name].push) {
                                    jsonData[this.name] = [jsonData[this.name]];
                                }
                                jsonData[this.name].push(this.value || '');
                            } else {
                                jsonData[this.name] = this.value || '';
                            }
                        }

                    });
                    return jsonData;
            },
            serializeFormToObject : function(formSelector) {
                
                var selector = $(formSelector).serializeArray();
                var object = {};
                for (var i in selector) {
                    object[selector[i].name] = selector[i].value;
                }
                
                return object;
            },

            serializeFormToObjectChangePass : function(formSelector) {
                
                var selector = $(formSelector).serializeArray();
                var object = {};
                for (var i in selector) {
                    if(selector[i].name=="id" || selector[i].name=="password")
                    object[selector[i].name] = selector[i].value;
                }
                return object;
            },


            cleanDataForm: function(formSelector){
                $(formSelector).each(function() {
                    this.reset();
                });
            }

        }

        return utilForm;
});
