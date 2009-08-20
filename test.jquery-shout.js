/*
-*- coding: utf-8 -*-
<jQuery Shout - Event bus plugin based on GObject's signal system>
Copyright (C) <2009>  Gabriel Falcão <gabriel@nacaolivre.org>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var ShowMessage = function ($self, data) {
    $self.find(".text").text(data.text);

    var assertionMessage1 = $self.attr('id') +
                            ' did show the message: "' +
                            data.text +
                            '"'

    $self.show('drop', {'direction': 'up'}, 'slow', function (){
                   ok(true, assertionMessage1);
                   start();
                   setTimeout(function () {
                                  $self.hide('drop',
                                             {'direction': 'up'},
                                             'slow',
                                             data.callback);
                                  return false;
                              }, data.timeout);
               });
}
var ShoutTests = {
    run: function () {
        module("Core");
        test('jQuery should have "_jq_shout" attribute.', function() {
          expect(1);
          ok(typeof jQuery._jq_shout === 'object',
             "jQuery has the attribute shout ($._jq_shout)");
        });

        module("Listeners");
        test("Shout hold a object with a table of listeners", function() {
          expect(1);
          ok(typeof jQuery._jq_shout.registry === 'object',
             "The registry of listeners should be a object");
        });
        test('jQuery HTML elements should be able to "hear" a event',
             function() {
                 var myCallback = function (data) {};

                 expect(3);
                 ok(typeof $("#email-user-box").hear === 'function',
                    'A jQuery HTML element should have the method "hear"');
                 // will hear the event "event-1"
                 var $element = $("#email-user-box");
                 $element.hear("event-1", myCallback);
                 equals($._jq_shout.registry['event-1'][0].callback,
                        myCallback);
                 equals($._jq_shout.registry['event-1'][0].source,
                        $element);
             });
        test("More than 1 html element hearing a event", function() {
                 var callback1 = function (data) {};
                 var callback2 = function (data) {};
                 expect(2);
                 $("#top-message").hear("event-2", callback1);
                 $("#email-user-box").hear("event-2", callback2);
                 equals($._jq_shout.registry['event-2'][0].callback,
                        callback1);
                 equals($._jq_shout.registry['event-2'][1].callback,
                        callback2);
        });
       test("Test hear returns the original object", function() {
                var dummyCallback = function (data) {};
                var $element = $("#top-message");
                expect(1);
                equals($element.hear("event-3", dummyCallback), $element);
        });

        module("Shouters");
        test('jQuery should be able to shout with some data',
             function() {
                 expect(3);
                 ok(typeof $.shout === 'function',
                    'A jQuery should have the method "shout"');
                 // will hearing the event "event-1"
                 $("#top-message").hear("show-message", ShowMessage);
                 $.shout("show-message",
                        {text: 'First shout!',
                         timeout: 2000});
                 equals($("#top-message").find(".text").text(),
                        'First shout!',
                        'After shouting, the top message shout contain the text I specified');
                 stop();
             });
    }
}