import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }
 
  public getTransactions(){
    return this.httpClient.get(`http://localhost:8080/api/v1/transactionService/getTransactions`);
  }

  public postTransaction(transactionObj: any){
     let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
    const url = 'http://localhost:8080/api/v1/transactionService/addTransaction';
    return this.httpClient.post(url, transactionObj, options);
  }

  public getDepositAmount(accountId: Number){
    var depositAmount;
    this.httpClient.get(`http://localhost:8080/api/v1/transactionService/getDepositAmount/`+accountId).subscribe(
      result => {      
        window.alert("result: "+result);
      depositAmount = result;
        
        });

        return depositAmount;
  }
 
}
