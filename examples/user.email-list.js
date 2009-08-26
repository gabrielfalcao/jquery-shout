$(document).ready(function (){
    $("#email-list").hear("user-login", function ($self, data){
        $self.show('slide', 'slow');
    });
    $("#email-list").hear("user-logout", function ($self, data){
        $self.hide('slide', 'slow');
        $self.find('.warning').show('slow');
        $self.find('ul').empty();
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
});
