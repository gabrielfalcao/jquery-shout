jQuery.extend({
                  shout: {}
              });


jQuery.extend(jQuery.shout, {
                  registry: {}
              });

jQuery.extend(jQuery.fn, {
                  hear: function (eventName, messageCallback) {
                      var list = jQuery.shout.registry[eventName];
                      if (!list)
                          jQuery.shout.registry[eventName] = [];

                      jQuery.shout.registry[eventName].push(messageCallback);
                  }
              });

