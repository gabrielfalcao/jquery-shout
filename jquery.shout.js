jQuery.extend(
{
    _jq_shout: {},
    shout: function (event, data){
        jQuery.each(this._jq_shout.registry[event],
                    function (){
                        this.callback(this.source, data);
                    });
    }
});


jQuery.extend(jQuery._jq_shout,
{
    registry: {}
});

jQuery.extend(jQuery.fn,
{
    hear: function (eventName, messageCallback) {
        var $self = this;
        var list = jQuery._jq_shout.registry[eventName];
        if (!list)
            jQuery._jq_shout.registry[eventName] = [];

        return this.each(function() {
                             var item = {
                                 source: $self,
                                 callback: messageCallback
                             }
                             jQuery._jq_shout.registry[eventName].push(item);
                         });
    }
});

