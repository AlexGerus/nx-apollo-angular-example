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
