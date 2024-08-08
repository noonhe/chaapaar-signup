import { Injectable, computed, signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  dark = 'dark';
  light = 'light';
  html = document.documentElement;
  currentTheme = signal(this.light);
  isDark = computed(() => this.currentTheme() === this.dark)

  constructor() { }

  setCurrentThemeAtAPPInit() {
    const theme = localStorage.getItem('darkMode');
    this.currentTheme.set(theme || this.light);
    this.html.dataset['theme'] = this.currentTheme();
  }

  changeTheme() {
    const newTheme = this.currentTheme() === this.light ? this.dark : this.light;
    this.currentTheme.set(newTheme);
    localStorage.setItem('darkMode', newTheme);
    this.html.dataset['theme'] = newTheme;
  }
}
