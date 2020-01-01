import { Component, OnInit } from '@angular/core';
//import { Transaction } from '../models/transaction.model  ';
import { RegisterComponent } from '../register/register.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  transactions;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getTransactions().subscribe((data) => {
      console.log(data)
      this.transactions = data;
    })
  }

}
