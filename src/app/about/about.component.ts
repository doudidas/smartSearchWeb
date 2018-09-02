/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from '@angular/core';
import { AppComponent } from '..';

@Component({
    styleUrls: ['./about.component.scss'],
    templateUrl: './about.component.html'
})
export class AboutComponent {
    // open: Boolean = false;
    type: String;
    columns = [
        {id: 0, name: "Front-End"},
        {id: 1, name: "Back-End"},
    ]
}
