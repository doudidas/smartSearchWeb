[![Known Vulnerabilities](https://snyk.io/test/github/doudidas/SmartSearchWeb/badge.svg)](https://snyk.io/test/github/doudidas/smartSearchWeb)
![Clarity](logo.png)

Clarity fork
============
This is the front part of the 3-tier application SmartSearch

Getting started
----------------------------------

#### Installation
*Prerequisite*: 
    Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation) and [yarn](https://yarnpkg.com/).
    
*Note*: For API call please deploy the [api server](https://github.com/doudidas/SmartSearchEngine) 

```bash
git clone https://github.com/doudidas/Smart-Search-Web
cd Smart-Search-Web

# install the project's dependencies
yarn # or run "npm install"

# starts the application in dev mode and watches your files for livereload
yarn start # dev run
yarn start_ssl  # prod run
```


## Documentation

For documentation on the Clarity Design System, including a list of components and example usage, see [our website](https://vmware.github.io/clarity).


#### Directory structure
```
.
├── README.md

├── karma.conf.js              <- configuration of the test runner
├── package.json               <- dependencies of the project
├── protractor.config.js       <- e2e tests configuration
├── src/                       <- source code of the application
│   ├── app/
│   │   └── component/
│   │       └── <component>.component.html
│   │       └── <component>.component.scss
│   │       └── <component>.component.spec.ts
│   │       └── <component>.component.ts
│   │   └── app.component.html
│   │   └── app.component.scss
│   │   └── app.component.ts
│   │   └── app.e2e-spec.js    <- sample e2e spec file
│   │   └── app.module.ts
│   │   └── app.routing.ts
│   │   └── main.ts            <- boostrap file for the angular app
│   └── index.html
├── angular-cli.json           <- configuration of the angular-cli
├── tsconfig.json              <- configuration of the typescript project
├── tslint.json                <- sample configuration file for tslint
└── yarn.lock
```

## License

The clarity-seed project is licensed under the MIT license.
