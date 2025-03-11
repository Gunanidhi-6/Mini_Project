import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Change to your server URL
  }

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }

  typing(status: boolean, username: string) {
    this.socket.emit('typing', { username, status });
  }

  getTypingStatus(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
    });
  }
}
