import { Component, signal } from '@angular/core';       // Angular core + signals API
import { RouterOutlet } from '@angular/router';          // RouterOutlet renders routed components

@Component({
  selector: 'app-root',                                  // Root tag <app-root>
  standalone: true,                                      // Mark as standalone component
  imports: [RouterOutlet],                               // Import RouterOutlet so routes can display
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Signal is a reactive value that can be used in the template
  protected readonly title = signal('Comp584AngularFinal');
}
