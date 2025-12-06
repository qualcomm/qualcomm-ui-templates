import {Component} from "@angular/core"
import {RouterOutlet} from "@angular/router"

@Component({
  imports: [RouterOutlet],
  selector: "app-root",
  styleUrl: "./app.css",
  template: `
    <main class="main flex flex-col gap-4">
      <div>QUI Angular project template</div>
    </main>

    <router-outlet />
  `,
})
export class App {}
