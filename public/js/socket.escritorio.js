var socket = io();

socket.on('connect', function () {
    //console.log("se conecto al servidor");
});

socket.on('disconnect', function () {
    //console.log("desconecto del servidor");
});

var label = $('small');

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function () {

    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function (data) {
        if (data == "No hay tickets") {
            alert(data);
            label.text(data);
            return;

        } else
        if (data.err) {
            alert(data.messaje);
            return;

        } else {
            label.text("Ticket " + data.numero);
        }
    });




});