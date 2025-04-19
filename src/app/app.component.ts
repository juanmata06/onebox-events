import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavBarComponent } from './shared/header-nav-bar/header-nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    HeaderNavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'onebox-events';
}
