//Comando para establecer la comunicacion la conexion 

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log("se conecto al servidor");
});

socket.on('disconnect', function () {
    console.log("desconecto del servidor");
});

socket.on('estadoActual',function (ultimotiket){
    label.text(ultimotiket.actual);
});


$('button').on('click', function () {
    console.log("click");

    socket.emit('siguienteTicket', null , function (siguienteTicket) {
        label.text(siguienteTicket);
    });



});