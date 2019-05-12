import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: Message;

  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.message = new Message('danger', '');
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
      }, 5000);
  }

  onSubmit() {
    const formData = this.loginForm.value;

    this.usersService.getUserByEmail(formData.email)
        .subscribe((user: User) => {
          if (user) {
            if (user.password === formData.password) {
              // Login logic
            } else {
              this.showMessage('Wrong password');
            }
          } else {
            this.showMessage('User dont defined');
          }
        });
  }

}
