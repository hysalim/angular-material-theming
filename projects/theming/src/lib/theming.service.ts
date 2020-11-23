import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Inject, Injectable, Optional, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// tslint:disable: variable-name

@Injectable({
  providedIn: 'root'
})
export class MatThemingService {
  public themeList: MatThemingConfig[];
  private timeAnimation = 500;

  private render: Renderer2;
  private dom = document.documentElement;

  private readonly _theme = new BehaviorSubject<string>(null);
  public readonly theme$ = this._theme.asObservable();
  private get theme(): string {
    return this._theme.getValue();
  }
  private set theme(value: string) {
    this._theme.next(value);
    this.changeThemeColor();
  }

  private readonly _dark = new BehaviorSubject<boolean>(false);
  public readonly dark$ = this._dark.asObservable();
  private get dark(): boolean {
    return this._dark.getValue();
  }
  private set dark(value: boolean) {
    this._dark.next(coerceBooleanProperty(value));
    this.changeThemeColor();
  }

  constructor(private renderFactory: RendererFactory2,
              @Inject('config') @Optional()config: MatThemingConfig[]) {
    this.render = this.renderFactory.createRenderer(null, null);
    if (config) {
      this.themeList = config;
    }
    const storage = JSON.parse(localStorage.getItem('theme'));
    if (storage) {
      this.setMatTheme(storage.theme);
      this.setDarkMode(storage.dark);
    }
    this.changeThemeColor();
  }

  /**
   * Update theme
   * @param themeName Theme name to apply
   */
  public setMatTheme(themeName: string): void {
    this.theme = themeName;
    this.setLocalStorage();
    this.render.addClass(this.dom, 'transition');
    this.render.setAttribute(this.dom, 'data-theme', `${themeName}`);
    setTimeout(() => {
      this.render.removeClass(this.dom, 'transition');
    }, this.timeAnimation);
  }

  /**
   * Toggle light/dark mode
   */
  public toggleDarkMode(): void {
    this.dark ? this.dark = false : this.dark = true;
    this.setLocalStorage();
    this.render.addClass(this.dom, 'transition');
    this.render.setAttribute(this.dom, 'data-dark', `${this.dark}`);
    setTimeout(() => {
      this.render.removeClass(this.dom, 'transition');
    }, this.timeAnimation);
  }

  /**
   * Update state of dark mode
   * @param value Dark mode is active or not
   */
  public setDarkMode(value: boolean): void {
    this.dark = coerceBooleanProperty(value);
    this.setLocalStorage();
    this.render.addClass(this.dom, 'transition');
    this.render.setAttribute(this.dom, 'data-dark', `${value}`);
    setTimeout(() => {
      this.render.removeClass(this.dom, 'transtion');
    }, this.timeAnimation);
  }

  /**
   * Save values in localStorage
   */
  private setLocalStorage(): void {
    const params = {
      theme: this.theme,
      dark: this.dark
    };
    localStorage.setItem('theme', JSON.stringify(params));
  }

  private changeThemeColor(): void {
    setTimeout(() => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--mat-theme-status-bar');
      const metaThemeColor = document.querySelector('meta[name=theme-color]');
      metaThemeColor.setAttribute('content', color);
    }, 0);

  }
}

export class MatThemingConfig {
  name: string;
  dataClass: string;
  constructor(name: string, dataClass: string) {
    this.name = name;
    this.dataClass = dataClass;
  }
}
