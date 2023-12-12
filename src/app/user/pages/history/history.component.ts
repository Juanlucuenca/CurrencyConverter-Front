import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Convertion } from 'src/app/core/data/interfaces/convertion.interface';
import { HistoryService } from 'src/app/core/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  history: Convertion[] = [];

  constructor(
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.historyService.getUserHistory().subscribe(history => {this.history = history; console.log(history.length > 0);})
  }

  formatDateString(date: Date): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
}


}
