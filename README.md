issues
- remove bootstrap from package json etc


===========================
Created:

generated using angular cli, added component pwa
ng new calc-pwa
  picked no routing and scss

verify: ng serve, open browser at http://localhost:4200/

ng add @angular/pwa
  adds a pwa manifest in src/manifest.webmanifest, registers it and adds bunch of icons

ng build
wrangler init --site
  followed instructions to edit the tomo file
wrangler publish  


wrangler init --site
  in toml file changed bucket, entry-point, route (choose calc-pwa)

wrangler publish  

goto https://calc-pwa.saw.workers.dev

add bootstrap: 
  ng add @ng-bootstrap/ng-bootstrap


expr-eval
  npm install --save expr-eval
  npm install --save @types/expr-eval
  

Karma
-----
When the tests gives errors like 'blablba is not a known element' then
to find the offending spec.ts file add the "schemas: [NO_ERRORS_SCHEMA]" to configureTestingModule
when the right file is found add the component (add import and add schema) or stub the component in the ts.spec file


Cloudflare
============

I created by hand kv store: wrangler kv:namespace create "calcpwa"

To retrieve the data from KV store:
wrangler kv:key get --binding=calcpwa test123

curl https://calc-pwa.saw.workers.dev/kv
curl -X PUT -H "Content-Type: application/json" -d '{"sheet":""}' https://calc-pwa.saw.workers.dev/kv


Update wrangler with: npm i @cloudflare/wrangler -g
currently on v1.19.3
note that there is a compatibility-date in wrangler.toml that needs an update in 2022

Debugging workers
-----------------
open two terminals:
$ wrangler tail
$ curl https://calc-pwa.saw.workers.dev/kv





------

# CalcPwa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
