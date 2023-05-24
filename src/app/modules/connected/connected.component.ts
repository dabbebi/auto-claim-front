import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.css'],
  providers: [
    MessageService,
    DatePipe
  ]
})
export class ConnectedComponent {

}
