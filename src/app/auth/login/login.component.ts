import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {fadeStateTrigger} from "../../shared/animations/fade.animation";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

    @HostBinding('@fade') a = true;

    loginForm: FormGroup;
    message: Message;

    constructor(private usersService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['nowCanLogin']) {
                    this.showMessage({
                        text: 'Now you can login!',
                        type: 'success'
                    });
                } else if (params['accessDenied']) {
                    this.showMessage({
                        text: 'You should be logined',
                        type: 'warning'
                    });
                }
            });

        this.loginForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        });
    }

    private showMessage(message: Message) {
        this.message = message;
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
                        this.message.text = '';
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.authService.login();
                        this.router.navigate(['/system', 'bill']);
                    } else {
                        this.showMessage({
                            text: 'Wrong password',
                            type: 'danger'
                        });
                    }
                } else {
                    this.showMessage({
                        text: 'User don\'t defined',
                        type: 'danger'
                    });
                }
            });
    }

}
