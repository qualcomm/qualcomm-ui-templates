import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControlsKitchenSink } from './form-controls-kitchen-sink'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormControlsKitchenSink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-ssr');
}
