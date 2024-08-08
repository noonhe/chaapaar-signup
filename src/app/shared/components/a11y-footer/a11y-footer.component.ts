import { Component, computed } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-a11y-footer',
  standalone: true,
  imports: [],
  templateUrl: './a11y-footer.component.html',
  styleUrl: './a11y-footer.component.scss'
})
export class A11yFooterComponent {
  isDark = computed(() => this.themeService.isDark());

  constructor(private themeService: ThemeService) {}

  changeTheme() {
    this.themeService.changeTheme();
  }

}
