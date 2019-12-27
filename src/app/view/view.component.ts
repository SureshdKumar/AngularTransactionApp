import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  usersData: RegisterModel[] = JSON.parse(localStorage.getItem('userData'));

  constructor() { }

  ngOnInit() {
  }

}
