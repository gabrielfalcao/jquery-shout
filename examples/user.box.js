$(document).ready(function (){
    //when the user logs in
    $("#email-user-box").hear("user-login", function ($self, data){
        $("#login").hide('drop', {'direction': 'right'}, 'slow');
        $self.find(".username").text(data.user.name);
        $self.find(".welcome").show('drop', {'direction': 'up'}, 'slow', function () {
            $self.find(".metadata").show('drop', {'direction': 'down'}, 'slow');
        });
    });
    //when the user logs out
    $("#email-user-box").hear("user-logout", function ($self, data){
        $self.find(".metadata").hide('drop', {'direction': 'right'}, 'slow', function () {
            $self.find(".welcome").hide('drop', {'direction': 'right'}, 'slow', function (){
                $("#login").show();
                $("#messages-msg").find(".number").text('no');
            });
        });
    });
    //when the user gets a email
    $("#email-user-box").hear("new-email", function ($self, data){
        $("#messages-msg").find(".number").text(data.messages.length);
    });
});
