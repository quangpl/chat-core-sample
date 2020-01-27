$(function() {
  var socket = io();
  let timeout;
  $("form").submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", $("#m").val());
    $("#m").val("");
    return false;
  });


    socket.on("chat message", function(msg) {
        $("#messages").append($("<li>").text(msg));
    });
     socket.on("typing", function() {
         clearTimeout(timeout);
       $(".typing").show();
     });

     socket.on("stop typing", function() {
      timeout = setTimeout(()=>{
        $(".typing").hide();
       },2000)
     });

     $("#m").keydown(function(val) {
            socket.emit("typing");
     });

     $("#m").keyup(function(val) {
       socket.emit("stop typing");
     });

     $("#stop").click(function() {
      socket.emit("stop chat");
      alert("STOP CHAT")
     });
      $("#start").click(function() {
        socket.emit("start chat");
        alert("START CHAT");
      });
});
