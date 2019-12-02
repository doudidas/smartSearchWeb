/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UUID} from 'angular2-uuid';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ClrForm } from '@clr/angular';
@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    @ViewChild(ClrForm, { static: true }) clrForm;
    public userForm: FormGroup;
    public displayForm;
    public logged: boolean;

    constructor(private cookieService: CookieService, public router: Router) { }


    ngOnInit() {
        this.displayForm = false;
        this.userForm = new FormGroup({
            username: new FormControl('', Validators.nullValidator),
            password: new FormControl('', Validators.nullValidator),
            remember: new FormControl('', Validators.nullValidator),
            type: new FormControl('local', Validators.required)
          });
        this.logged = this.cookieService.check('login');
        if (this.logged) {
          this.router.navigate(['home']);
        }
    }


    logAsGuest() {
        this.logAsUser('guest');
        this.router.navigate(['home']);
    }

    logAsUser(username) {
        const cookie = JSON.stringify({ username, id: UUID.UUID() });
        this.cookieService.set('login', cookie, 0.5, '/', 'localhost');
        this.router.navigate(['home']);
    }

    showForm() {
        this.displayForm = true;
    }

    submit() {
        if (this.userForm.invalid) {
            this.userForm.markAsTouched();
          } else {
           this.logAsUser(this.userForm.value.username);
          }
    }
}
