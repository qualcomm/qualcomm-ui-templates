import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControlsDemo } from './form-controls-demo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormControlsDemo],
  template: `
    <main class="main" style="display: flex; flex-direction: column; gap: 16px">
      <div>QUI Angular project template</div>
      <form-controls-demo></form-controls-demo>
    </main>

    <router-outlet />
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-ssr');
}
