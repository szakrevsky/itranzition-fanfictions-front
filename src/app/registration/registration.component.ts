import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Message, SelectItem} from 'primeng/api';
import {AuthenticationService} from '../services/auth.service';
import {Profile} from '../profile';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  msgs: Message[] = [];
  email: string;
  password: string;
  username: string;
  userform: FormGroup;

  submitted: boolean;

  constructor(private fb: FormBuilder, private auth: AuthenticationService) {}

  ngOnInit() {
    this.userform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }
  savePassword(event: any) {
    this.password = event.target.value;
  }
  saveUsername(event: any) {
    this.username = event.target.value;
  }
  saveEmail(event: any) {
    this.email = event.target.value;
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
    const user: Profile = {
      email: this.email,
      name: this.username,
      password: this.password
    };
    this.auth.register(user);
}
}
