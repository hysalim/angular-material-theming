# Angular Material Theming

## Get Starting
### Installation
```
$npm install @hysalim/theming
```
### Angular
In angular.json add
``` json
"projects": {
  "architect": {
    "build": {
      "options": {
        /** Add properties */

        "stylePreprocessorOptions": {
          "includePaths": [
            "node_modules/
          ]
        }
        .......................................
      }
    }
  }
}
```
### SCSS
Import SCSS in your style sheet
``` scss
@use "@hysalim/theming/theme";
```
### TypeScript
Import service in appModule
```typescript
@import {MatThemingModule, MatThemingConfig} from '@hysalim/theming';

const theme: MatThemingConfig[] = [
  {name: 'default', dataClass: ''}
];

@NgModule({
  ................
  MatThemingModule.forRoot(theme)
  ................
})
export class AppModule { }
```
## Usage
To set multiple themes within your app
### SCSS
In your stylesheet
```scss
@use "@hysalim/theming/theme" with (
  theme-list: (
    default: (
      primary: (color: blue),
      accent: (color: teal)
    ),
    secondary-theme: (
      primary: (color: teal, default: 600)
    )
  )
);
```
Each theme you create is based on a basic theme. You don't have to write down all the settings
```scss
$_base-theme: (
  light-color: #FFF,
  dark-color: #000,
  light-status-bar: #E0E0E0,
  dark-status-bar: black,
  primary: (color: #6200EE, default: 500, lighter: 100, darker: 700, text: 500),
  accent: (color: #018786, default: 500, lighter: 100, darker: 700, text: 500),
  warn: (color: #B00020, default: 500, lighter: 100, darker: 700, text: 500),
  darkBackground: #121212,
  darkThemeMixToPrimary: "true",
  darkMaterialReference: "true"
) !default;
```
|Key name|Description|
|--------|-----------|
|`light-color`|The base of light color (use for background, surface,...)|
|`dark-color`|The base of dark color (use to front color, icon, ...)|
|`light-status-bar`|The color of status bar in light mode|
|`dark-status-bar`|The color of status bar in dark mode|
|`primary`, `accent` and `warn`|The base color of the palette colors. `color` is a color base, `default` is the default color of palette color, `lighter` is the light color of the palette, `darker` is the dark color of the palette and `text` is the text color of the palette.|
|`darkBackground`|The background color of the dark mode|
|`darkThemeMixToPrimary`|The background color is mixed with the primary color ("true" or "false")|
|`darkMaterialReference`|True if you want to use [Material specification](https://material.io/design/color/dark-theme.html). Modifie elevation, image and primary palette color in dark mode.
### TypeScript
Import service in appModule
```typescript
@import {MatThemingModule, MatThemingConfig} from '@hysalim/theming';

const theme: MatThemingConfig[] = [
  {name: 'default', dataClass: ''},
  {name: 'Name of my Secondary Theme', dataClass: 'secondary-theme'}
];

@NgModule({
  ................
  MatThemingModule.forRoot(theme)
  ................
})
export class AppModule { }
```
In `app.component.ts`
```typescript
import { Component } from '@angular/core';
import { MatThemingService } from '@hysalim/theming';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'documentation';

  constructor(public theme: MatThemingService) {}
}
```
### HTML
```html
<mat-menu #menu="matMenu">
    <button mat-menu-item *ngFor="let item of theme.themeList" (click)="theme.setMatTheme(item.dataClass)">
      <span>{{item.name}}</span>
    </button>
  </mat-menu>
```
## Mixins and functions
### **Luminance**
`theme.luminance($color)`

Calculate the luminance value (0 - 1) of a given color.
``` scss
@debug theme.luminance(#9C27B0); //return 0.116554
``` 

### **Contrast**
`theme.contrast($background, $front)`

Calculates the contrast ratio between two colors.
```scss
@debug theme.contrast(#9C27B0, #000); // return 3.33071
```
>**Note:**  
>Minimum contrast recommanded by [Material Theming](https://material.io/design/color/text-legibility.html#legibility-standards) is 3.1

#### **Tone**
`theme.tone($color)`

Determines whether the given color is light or dark.
If the input color is a string literal equal to `"light"` or `"dark"`, it will be returned verbatim.
```scss
@debug theme.tone(#9C27B0); // return dark
@debug(light); // return light
```

### **Tone contrast**
`theme.contrast-tone($color)`

Determines whether to use light or dark text on top of a given color.
```scss
@debug theme.contrast-tone(#9C27B0); // return light
```

### **Accessible text color**
`theme.accessible-ink-color($color, $light-color: #FFF, $dark-color: #000)`

Returns an accessible ink color that has sufficient contrast against the given color fill.
```scss
@include theme.accessible-ink-color(bleu); // return color: #FFF
```

### **Custom properties**

`theme.property($property,$value-of-property-values)`

**Keys of palette colors**
|Key Name|Description|
|--------|-----------|
|`primary-default`|The theme of primary default color|
|`primary-lighter`|The theme of primary lighter color|
|`primary-darker`|The theme of primary darker color|
|`primary-text`|The theme of primary text color|
|`primary-50` `primary-100` or other hue|The theme of primary hue 50 color or other hue color|
|`primary-contrast-default`|The theme of primary contrast default color|
|`primary-contrast-lighter`|The theme of primary contrast lighter color|
|`primary-contrast-darker`|The theme of primary contrast darker color|
|`primary-contrast-text`|The theme of primary contrast text color|
|`primary-contrast-50` `primary-contrast-100` or other hue|The theme of primary contrast hue 50 color or other contrast hue color|

>**Note:**  
>Idem for other palette:
>- accent
>- warn

**Keys of foreground**
|Key name|Description|
|--------|-----------|
|`base`|The theme of base color|
|`disabled`|The theme of disabled color|
|`disabled-button`|The theme of disabled button color|
|`elevation`|The theme of elevation color (black)|
|`secondary-text`|The theme of secondary text color|
|`icon`|The theme of icon color|
|`text`|The theme of text color|
|`slider-off`|The theme of slider off color|
|`slider-off-active`|The theme of slider off active color|
**Keys of background**
|Key name|Description|
|--------|-----------|
|`status-bar`|The theme of status bar color|
|`app-bar`|The theme of application bar color|
|`background`|The theme of background color|
|`hover`|The theme of hover color|
|`surface`|The theme of surface color|
|`disabled-button-background`|The theme of disabled background button color|
|`focused`|The theme of focused color|
|`selected`|The theme of selected color|
|`selected-disabled`|The theme of selected disabled color|
|`disabled-component`|The theme of disabled component color|
|`unselect-chip`|The theme of unselected chip color|
|`tooltip`|The theme of tooltip color|

```scss
@use "@hysalim/theming/theme";

.foo {
  @include theme.property(background, primary-red-500);
}
/// return in CSS
.foo {
  background: red;
  background: var(--mat-theme-red-500, red);
}
```
The `theme.property()` mixin also accepts a custom property Map for the `$value` argument. The map must contain a varname key with the name of the custom property, and an optional fallback key with the value of the custom property.

Use the `@hysalim/theme/helper/custom-properties` module to create custom property Maps.
```scss
@use "@hysalim/theming/theme";
@use "@hysalim/theming/theme/helper/custom-properties";

.foo {
  @include theme.property(color, custom-properties.create(--foo-color, red));
}
/// return in CSS
.foo {
  background: red;
  background: var(--foo-color, red);
}
```
