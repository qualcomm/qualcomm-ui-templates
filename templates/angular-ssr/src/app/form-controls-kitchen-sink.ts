import {Component} from "@angular/core"
import {FormsModule} from "@angular/forms"

import {ButtonModule} from "@qualcomm-ui/angular/button"
import {CheckboxModule} from "@qualcomm-ui/angular/checkbox"
import {PasswordInputModule} from "@qualcomm-ui/angular/password-input"
import {RadioModule} from "@qualcomm-ui/angular/radio"
import {SegmentedControlModule} from "@qualcomm-ui/angular/segmented-control"
import {SwitchModule} from "@qualcomm-ui/angular/switch"
import {TextInputModule} from "@qualcomm-ui/angular/text-input"

@Component({
  imports: [
    FormsModule,
    TextInputModule,
    PasswordInputModule,
    RadioModule,
    CheckboxModule,
    SwitchModule,
    SegmentedControlModule,
    ButtonModule,
  ],
  selector: "form-controls-kitchen-sink",
  template: `
    <form style="display: flex; flex-direction: column; max-width: 800px; gap: 1.5rem;">
      <q-text-input
        label="Full Name"
        placeholder="Enter your full name"
        required
        [(ngModel)]="fullName"
        name="fullName"
      />

      <q-text-input
        label="Email"
        placeholder="Enter your email"
        type="email"
        required
        [(ngModel)]="email"
        name="email"
      />

      <q-password-input
        label="Password"
        placeholder="Enter your password"
        required
        [(ngModel)]="password"
        name="password"
      />

      <fieldset name="language" q-radio-group required [(ngModel)]="language">
        <div q-radio-group-label>Preferred Language</div>
        <div q-radio-group-items>
          <label label="HTML" q-radio value="html"></label>
          <label label="CSS" q-radio value="css"></label>
          <label label="TypeScript" q-radio value="ts"></label>
        </div>
      </fieldset>

      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label label="Subscribe to newsletter" name="subscribe" q-checkbox [(ngModel)]="subscribe"></label>
        <label label="Enable notifications" name="notifications" q-checkbox [(ngModel)]="notifications"></label>
        <label label="Accept terms and conditions" name="terms" q-checkbox required [(ngModel)]="terms"></label>
      </div>

      <label
        label="Enable dark mode"
        name="darkMode"
        q-switch
        [(ngModel)]="darkMode"
      ></label>

      <fieldset q-segmented-control>
        <label q-segmented-control-item text="Chart" value="chart"></label>
        <label q-segmented-control-item text="Table" value="table"></label>
        <label q-segmented-control-item text="Map" value="map"></label>
      </fieldset>

      <div style="display: flex; gap: 0.75rem;">
        <button emphasis="primary" q-button type="submit" variant="fill">
          Submit
        </button>
        <button emphasis="primary" q-button type="button" variant="outline">
          Cancel
        </button>
      </div>
    </form>
  `,
})
export class FormControlsKitchenSink {
  fullName = ""
  email = ""
  password = ""
  language: string | null = null
  subscribe = false
  notifications = false
  terms = false
  darkMode = false
}
