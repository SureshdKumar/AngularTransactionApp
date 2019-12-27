import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'firstName': [this.user.firstName, [Validators.required]],
      'lastName': [this.user.lastName, [Validators.required]],
      'email': [this.user.email, [Validators.required, Validators.email]],
      'password': [this.user.password, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }

  

  onRegisterSubmit() {
    var usersData = []
    if(null != localStorage.getItem("userData")){
      usersData = JSON.parse(localStorage.getItem("userData"))
    }
    usersData.push(this.user)
   
    
   
    localStorage.setItem("userData", JSON.stringify(usersData))
    alert("User Data saved successfully.");
    window.location.reload();
  }
}
