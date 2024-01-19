// WebSocketService.js

import * as signalR from '@microsoft/signalr';
import backendUrl from '../config/config';

class WebSocketService {
    constructor() {
        //this.connection = new signalR.HubConnectionBuilder()
        //    .withUrl(`${backendUrl}/ws`)  // Vervang <backend-url> door het juiste adres
        //    .build();

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${backendUrl}/ws`, { withCredentials: true })  // Credentials inschakelen
            .build();

        // Event voor het ontvangen van berichten van de server
        this.connection.on('broadcastMessage', (message) => {
            console.log('Received message from server:', message);
            // Doe hier iets met het ontvangen bericht in je Vue-componenten
        });

        // Event voor eventuele fouten
        this.connection.onclose((error) => {
            console.error('WebSocket closed:', error);
        });

        // Start de verbinding
        this.startConnection();
    }

    startConnection() {
        this.connection
            .start()
            .then(() => {
                console.log('WebSocket connection started');
            })
            .catch((err) => {
                console.error('Error starting WebSocket connection:', err);
                setTimeout(() => this.startConnection(), 5000); // Probeer opnieuw na 5 seconden bij fouten
            });
    }
}

export default new WebSocketService();