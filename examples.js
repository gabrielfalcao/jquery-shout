$("#user-box").hear('new-message', function (data){
  alert("You've got " + data.number + " new messages");
});

$("a.search-button").click(function (){
  $.shout("new-message",  {number:100, messages: [
          {subject: "Welcome to jquery list", bodyPreview: "My email..."},
          {subject: "Help on qUnit", bodyPreview: "please..."}
      ]
  });
});
