$(document).ready(function (){
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
