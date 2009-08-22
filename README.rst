jQuery shout
============

Shout is a `jQuery <http://jquery.com>`_ plugin for message-interchange between visual elements.
It is much inspired on `GObject signals <http://library.gnome.org/devel/gobject/stable/gobject-Signals.html>`_.

Motivation
----------

Imagine a web application with a rich user experience, e.g. a webmail.
Whenever an email arrives many components could be changed, for instance:
* The email list would be prepended with new messages
* Some places that shows how many emails you have, must have its counter increased.
* Maybe you would like to take some action to alert the user that he have new emails.

With jQuery shout, each of those elements will "hear" some event, and take different actions.
And whenever you want to make your visual components take a set of actions, you just "shout" on them.

Example
-------

Hearing events::

    $("#list-of-emails").hear("new-messages", function ($self, data) {
        var $emails = $self.find("ul.emails");
        $.each(data.messages, function () {
            $emails.prepend("FROM: " + this.from + " - " + this.subject);
        });
    });

And shouting::

    $.shout("new-messages",{
        timestamp: "Sat Aug 22 09:45:40 BRT 2009",
        messages: [
            {
                from: "Some User <some@user.com>",
                subject: "Long time, dude!",
                message: "Here comes the message",
                date: "2009-08-22",
                time: "08:43:26"
            },
            {
                from: "John Doe <johndoe@jquery.com>",
                subject: "jQuery shout is released!",
                message: "Download it!",
                date: "2009-08-22",
                time: "09:12:59"
            }
        ]
    });


Furthermore
-----------

You can see a full example in the project source code.
