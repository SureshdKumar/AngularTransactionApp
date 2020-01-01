import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  transaction: Transaction = new Transaction();
  transactionForm: FormGroup;
  hide = true;
  date: any;
  constructor(private dataService: DataService, private formBuilder: FormBuilder, private datePipe: DatePipe, private httpClient: HttpClient) { }
  

  ngOnInit() {
    this.transactionForm = this.formBuilder.group({
      'accountId': [this.transaction.accountId, [Validators.required]],
      'amount': [this.transaction.amount, [Validators.required]],
      'transactionType': [this.transaction.type, [Validators.required]],
      'createdDate': [this.transaction.createdDate, [Validators.required]]
    });
      
  }


  
  public restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
   }



  onRegisterSubmit() {
 
    //Withdrawal Validation logic
    if ("Withdraw" == this.transaction.type ){
      this.httpClient.get(`http://localhost:8080/api/v1/transactionService/getDepositAmount/`+this.transaction.accountId).subscribe(
        result => {           
        if (this.transaction.amount > result){
          alert("Withdrawal amount is greater than total deposit amount.\n   Kindly re-try with valid withdrawal amount");
          window.location.reload();
        }else{
          const transactionObj = {
            accountId : this.transaction.accountId,
            amount: -this.transaction.amount, 
            createdDate: this.datePipe.transform(this.transaction.createdDate,"yyyy-MM-dd")
          };
          this.dataService.postTransaction(Object.assign(transactionObj)).subscribe();
          alert("Transaction saved successfully.");
          window.location.reload();
        }
          });
    
         
        
    }else{
      const transactionObj = {
      accountId : this.transaction.accountId,
       amount: this.transaction.amount, 
       createdDate: this.datePipe.transform(this.transaction.createdDate,"yyyy-MM-dd")
      };
      this.dataService.postTransaction(Object.assign(transactionObj)).subscribe((data) => {
        alert(data);
      });
      alert("Transaction saved successfully.");
      window.location.reload();
    }
   }
}
