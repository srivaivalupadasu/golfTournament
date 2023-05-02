import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';

interface Player {
  MSTID: number;
  First: string;
  Last: string;
  Nationality: string;
  Score: number;
}

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit, OnDestroy {
  players: Player[] = [];
  private subscription: Subscription | null = null;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.subscription = this.socketService.onDataUpdate().subscribe((data: any) => {
      this.players.push(data);
      // this.players = Object.values(data);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
