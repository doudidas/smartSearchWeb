/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ModuleWithProviders} from '@angular/core/src/metadata/ng_module';
import {RouterModule, Routes} from '@angular/router';

import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UsersComponent} from './users/users.component';
import {VroComponent} from "./vro/vro.component";
import { SnakeComponent } from './snake/snake.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'vro', component: VroComponent},
    {path: "snake", component: SnakeComponent},
    {path: 'users', component: UsersComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
