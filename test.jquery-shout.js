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
var ShowMessage = function (text, timeout, callback) {
    var $mainDiv = $("#top-message");
    $mainDiv.find(".text").text(text);

    $mainDiv.show('drop', {'direction': 'up'}, 'slow', function (){
        setTimeout(function () {
                       $mainDiv.hide('drop',
                                     {'direction': 'up'},
                                     'slow',
                                     callback);
                       return false;
                   }, timeout);
                  });
}
var ShoutTests = {
    run: function () {
        module("Core");
        test('jQuery should have "shout" attribute.', function() {
          expect(1);
          ok(typeof jQuery.shout === 'object',
             "jQuery has the attribute shout ($.shout)");
        });

        module("Listener's Layer");
        test("Shout hold a object with a table of listeners", function() {
          expect(1);
          ok(typeof jQuery.shout.registry === 'object',
             "The registry of listeners should be a object");
        });
        test('jQuery HTML elements should be able to "hear" a event',
             function() {
                 var myCallback = function (data) {};

                 expect(2);
                 ok(typeof $("#email-user-box").hear === 'function',
                    'A jQuery HTML element should have the method "hear"');
                 // will hearing the event "event-1"
                 $("#email-user-box").hear("event-1", myCallback);
                 equals($.shout.registry['event-1'][0], myCallback);
             });
        test("More than 1 html element hearing a event", function() {
                 var callback1 = function (data) {};
                 var callback2 = function (data) {};
                 expect(2);
                 $("#top-message").hear("event-2", callback1);
                 $("#email-user-box").hear("event-2", callback2);
                 equals($.shout.registry['event-2'][0], callback1);
                 equals($.shout.registry['event-2'][1], callback2);
        });

    }
}