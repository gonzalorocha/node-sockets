//Comando para establecer la comunicación 
let socket = io();

let label = $('#lblNuevoTicket')

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado al servidor')
})

socket.on('estadoActual', (res) => {
    label.text(res.actual);
})

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });



    console.log()
})