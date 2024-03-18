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
