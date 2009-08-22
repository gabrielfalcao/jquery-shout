$(document).ready(function (){
    $("#email-user-box").hear("user-login", function ($self, data){
        $("#login").hide('drop', {'direction': 'right'}, 'slow');
        $self.find(".username").text(data.user.name);
        $self.find(".welcome").show('drop', {'direction': 'up'}, 'slow', function () {
            $self.find(".metadata").show('drop', {'direction': 'down'}, 'slow');
        });
    });
    $("#email-user-box").hear("user-logout", function ($self, data){
        $self.find(".metadata").hide('drop', {'direction': 'right'}, 'slow', function () {
            $self.find(".welcome").hide('drop', {'direction': 'right'}, 'slow', function (){
                $("#login").show();
                $("#messages-msg").find(".number").text('no');
            });
        });
    });
    $("#email-list").hear("user-login", function ($self, data){
        $self.show('slide', 'slow');
    });
    $("#email-list").hear("user-logout", function ($self, data){
        $self.hide('slide', 'slow');
        $self.find('.warning').show('slow');
        $self.find('ul').empty();
    });

    $("#email-user-box").hear("new-email", function ($self, data){
        $("#messages-msg").find(".number").text(data.messages.length);
    });
    $("#email-list").hear("new-email", function ($self, data){
        $self.find('.warning').hide('slow');
        $self.find('ul').empty();
        var even = true;
            $.each(data.messages, function () {
            var message = this;
            var from = "FROM: " + message.from;
            var $li = $(document.createElement('li'));
            var $a = $(document.createElement('a'));
            $li.addClass('new');
            if (even) {
                even = false;
                $li.addClass('dark');
            } else {
                even = true;
            }
            $li.append($a);
            $a.text(from + ', ' + message.preview);
            $self.find("ul").append($li);
            $a.click(function () {
                $(this).parent().removeClass("new");
                var $dialog = $(document.createElement('div'));
                var $p = $(document.createElement('p'));
                $dialog.append($p);
                $dialog.attr("title", "E-MAIL " + from);
                $dialog.hide();
                $p.text(message.text);

                $("body").append($dialog);
                $dialog.dialog({
                    draggable: false,
                    resizable: false,
                    width: '400px',
                    modal: true,
                    close: function(event, ui) {
                        $dialog.remove();
                    }
                });
            });
        });
    });

    $("#login").click(function(){
        $.shout('user-login', {
            user: {
                name: 'Gabriel'
            }
        });
        return false;
    });
    $("#refresh").click(function (){
        $(this).hide();
        $.shout('new-email', {
            messages: [
                {from: 'foo-service.com', preview: 'Welcome to foo!', text: 'Welcome to foo!\nWe are very proud of having you as new member!'},
                {from: 'John Doe', preview: 'Up to a new freelan...', text: "Up to a new freelance ?\nIt's about improving UX with jQuery."},
                {from: 'GNU', preview: 'Is jquery-shout free ?', text: "Is jquery-shout free? I would like to improve and share its code!"}
            ]
        });
        return false;
    });
    $("#logout").click(function (){
        $.shout('user-logout', {});
        return false;
    });
});
