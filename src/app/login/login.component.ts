/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginSession } from '../class/loginSession';
import { SessionService } from '../services/session.service';

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    public session: LoginSession;
    displayForm: boolean;
    logged: boolean;
    form: FormGroup;
    password: string;

    constructor(public router: Router, private sessionService: SessionService) {
    }

    ngOnInit() {
        this.session = new LoginSession("user", "", false);
        this.form = new FormGroup({
            type: new FormControl(this.session.type, Validators.required),
            username: new FormControl(this.session.username, Validators.required),
            password: new FormControl(this.password, Validators.required),
            rememberMe: new FormControl(this.session.rememberMe, Validators.required),
        });
        if (this.sessionService.isLogged()) {
            this.router.navigate(['home'])
        }
    }

    onSubmit(): void {
        this.form.setValue({
            "type": this.session.type,
            "password": this.password,
            "username": this.session.username,
            "rememberMe": this.session.rememberMe
        })
        this.form.updateValueAndValidity()
        if (this.form.valid) {
            this.sessionService.logOn(this.session);
        }
    }
}
