const fs = require('fs');
const { json } = require('express');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketsControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //ticekts pendientes a ser atendidos
        this.ultimosTicket = [] //Almacena los ultimos 4 tickets
        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosTicket = data.ultimosTicket;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosTicket = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosTicket: this.ultimosTicket
        }
        let JsonDataStr = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', JsonDataStr);
        console.log('Se ha inicializado el archivo')
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }


    getUltimosTickets() {
        return this.ultimosTicket;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //elimina el primero del arreglo
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimosTicket.unshift(atenderTicket); //lo agrega al principio del arreglo

        if (this.ultimosTicket.length > 4) {
            this.ultimosTicket.splice(-1, 1) //Elimina el ultimo
        }

        console.log('ultimos 4: ', this.ultimosTicket);

        this.grabarArchivo();
        return atenderTicket;
    }
}

module.exports = {
    TicketsControl
}