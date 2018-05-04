///<reference path="../node_modules/@angular/platform-browser-dynamic/src/platform-browser-dynamic.d.ts"/>
import './polyfills.ts';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {AppModule} from './app/';
import '@clr/icons';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
