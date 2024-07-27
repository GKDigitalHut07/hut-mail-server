import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { IntroductionComponent } from '../introduction/introduction.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBarComponent,IntroductionComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

}
