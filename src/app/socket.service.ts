import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://mst-full-stack-dev-test.herokuapp.com', {
      transports: ['websocket'],
      upgrade: false
    });
  }

  onDataUpdate(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('data-update', (data: any) => {
        observer.next(data);
      });
    });
  }
}
