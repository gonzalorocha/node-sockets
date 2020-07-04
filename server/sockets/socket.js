const { io } = require('../server');
const { TicketsControl } = require('./../classes/tickets-control')


const ticketsControl = new TicketsControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketsControl.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketsControl.getUltimoTicket(),
        ultimosTickets: ticketsControl.getUltimosTickets()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketsControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //Actualizar y notificar cambioes en los ultimos 4
    })



});