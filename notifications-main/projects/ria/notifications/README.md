# Routing

Notifications is a npm library that takes the language, apiGw URL and notifications enabled boolean as inputs and generates a veera global notification from available correct notifications set in the notify application (https://notify-fe.{{env}}.riaint.ee/teavitused).
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Installation
`npm install @ria/stateportal-notifications`

### Usage
Import the RoutingModule and add it to the imports of your module.
```
import {NotificationsModule} from "@ria/stateportal-notifications"

@NgModule({
imports: [NotificationsModule],
declarations: [...],
exports: [...]
})
export class YourModule { }`
```
If you already have a module of the same name, you can create an alias
`import { NotificationsModule as YourAlias } from '@ria/stateportal-notifications'`

Call the component from within a template (sandbox examples in app.component.html)
```
<lib-stateportal-notifications
  [lang]="'et'"
  [apiGwUrl]="'apiGwUrl'"
  [notifyEnabled]="true"
></lib-stateportal-notifications>
```
