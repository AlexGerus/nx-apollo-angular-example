
```
npx create-nx-workspace@latest nx-apollo-angular-example
```
```
nx add apollo-angular
```
```
// apps/nx-apollo/src/app/graphql.module.ts
const uri = 'https://countries.trevorblades.com/graphql'; // <-- add the URL of the GraphQL server here
```

Create libs folder and run next 2 commands there
```
nx generate @nrwl/angular:library libs/data-access --style scss
nx generate @nrwl/angular:library libs/feature-countries --style scss
```
```
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript-operations @graphql-codegen/typescript-apollo-angular
```
```
# libs/data-access/src/lib/graphql/operations.graphql

fragment CountryFields on Country {
    code
    name
}

query countriesList {
    countries {
        ...CountryFields
    }
}

```
```
# libs/data-access/codegen.yml
overwrite: true
schema: "https://countries.trevorblades.com/graphql"
generates:
  libs/data-access/src/lib/generated/generated.ts:
    documents: "libs/data-access/src/lib/graphql/**/*.graphql"
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-apollo-angular"
```
```
# package.json scripts
 "generate": "npx graphql-codegen --config libs/data-access/codegen.yml"
```
Run generate script

```
// libs/data-access/src/index.ts

export * from './lib/data-access/data-access.component';
export * from './lib/generated/generated';

```
```
nx generate @schematics/angular:component --name=CountriesList --project=feature-countries --export --style scss
nx generate @schematics/angular:component --name=CountryForm --project=feature-countries --export --style scss
```
```
# countries-list.component.html
<ul>
  <li *ngFor="let country of countries$ | async">
    {{ country.code }} <strong>{{ country.name }}</strong>
  </li>
</ul>

```

```
# countries-list.component.scss

:host {
  font-family: sans-serif;
}

ul {
  list-style: none;
  margin: 0;
}

li {
  padding: 8px;
}

li:nth-child(2n) {
  background-color: #eee;
}

span.code {
  display: block;
  width: 20%;
}

```
```
# countries-list.component.ts

import { Component } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { CountriesListGQL } from '@nx-apollo-angular-example/data-access';

@Component({
  selector: 'lib-countries-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss'
})
export class CountriesListComponent {
  countries$: Observable<any[]>;

  constructor(private countriesGQL: CountriesListGQL) {
    this.countries$ = this.countriesGQL
      .watch()
      .valueChanges
      .pipe(
        map((result) => result.data.countries)
      );
  }
}

```

```
# libs/feature-countries/src/index.ts

export * from './lib/feature-countries/feature-countries.component';
export * from './countries-list/countries-list.component';
export * from './country-form/country-form.component';

```

```
# app.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CountriesListComponent } from '@nx-apollo-angular-example/feature-sets';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CountriesListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx-apollo-angular-example';
}

```
```
# app.component.html

<h1>My Lego Sets</h1>
<div class="flex">
  <lib-countries-list></lib-countries-list>
</div>
<router-outlet></router-outlet>

```

```
# app.component.scss

h1 {
  font-family: sans-serif;
  text-align: center;
}

.flex {
  display: flex;
}

lib-countries-list {
  flex: 1;
  padding: 8px;
}

```
