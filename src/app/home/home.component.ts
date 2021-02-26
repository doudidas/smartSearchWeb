/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})

export class HomeComponent {
    open = false;
    public cards = [
        {
            title: 'Angular',
            body: 'Language used for the front-end web app',
            image: 'assets/images/angular.svg'
        },
        {
            title: 'Java',
            body: 'Language for the back-end. It allows to manage connexion between the front-end and the database',
            image: 'assets/images/java.svg'
        },
        {
            title: 'Kubernetes',
            body: 'Kubernetes is an open-source container-orchestration system for automating deployment, scaling and management of containerized applications.',
            image: 'assets/images/kubernetes.svg'
        },
        {
            title: 'Yarn',
            body: 'Angular package and environnement manager',
            image: 'assets/images/yarn-kitten-full.png'
        },
        {
            title: 'DropWizard',
            body: 'Java API framework',
            image: 'assets/images/dropwizard.png'
        },
        {
            title: 'TensorFlow',
            body: 'TensorFlow™ is an open source software library for high performance numerical computation',
            image: 'assets/images/tensorFlow.svg'
        },
        {
            title: 'Clarity',
            body: 'UX guidelines, HTML/CSS framework, and Angular components working together to craft exceptional experiences',
            image: 'assets/images/clarity_logo.svg'
        },
        {
            title: 'Gin-Gonic',
            body: 'Gin is a HTTP web framework written in Go (Golang)',
            image: 'assets/images/gin-gonic.png'
        }
    ];
}
