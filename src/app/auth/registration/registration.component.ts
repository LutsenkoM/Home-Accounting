import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
      this.regForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
          'name': new FormControl(null, Validators.required),
          'agree': new FormControl(false,[Validators.required, Validators.requiredTrue])
      });
  }

  onSubmit() {
    const {email, password, name} = this.regForm.value;
    const user = new User(email, password, name);

    this.userService.createNewUser(user)
        .subscribe(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true
            }
          })
        })
  }

}
