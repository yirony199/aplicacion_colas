const {
    io
} = require('../server');
const {
    TicketControl
} = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        console.log('cual es el siguiente ticket');
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });


    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4 : ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data,callback)=>{
        if( !data.escritorio ){
            return callback({
                err : true,
                messaje : "El escritorio es necesario"
            });
        }

        let atenderTicket  = ticketControl.atenderTicket(data.escritorio);


        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4 : ticketControl.getUltimos4()
        });
        

        callback(atenderTicket);
    });


});