/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginForm } from '../class/loginForm';

@Component({
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    public form: LoginForm;
    ngOnInit() {
        this.form = new LoginForm(null, null, null, false);
    }
    submit() {
        console.log(this.form);
    }
}
