let socket = io();

let lblTicket1 = $('lblTicket1');
let lblTicket2 = $('lblTicket2');
let lblTicket3 = $('lblTicket3');
let lblTicket4 = $('lblTicket4');

let lblEscritorio2 = $('lblEscritorio2');
let lblEscritorio1 = $('lblEscritorio1');
let lblEscritorio3 = $('lblEscritorio3');
let lblEscritorio4 = $('lblEscritorio4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', (data) => {
    console.log(data);
    actualizaHTML(data.ultimosTickets);
})

const actualizaHTML = (ultimosTickets) => {
    console.log(ultimosTickets.length);
    for (let i = 0; i <= ultimosTickets.length - 1; i++) {
        lblTickets[i].text(`Ticket ${ultimosTickets[i].numero}`)
        lblEscritorios[i].text(`Escritorio ${ultimosTickets[i].escritorio}`)
    }
}