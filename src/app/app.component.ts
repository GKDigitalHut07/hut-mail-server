import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { BlogResourcesComponent } from './blog-resources/blog-resources.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ServicesComponent } from './services/services.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { FaqComponent } from './faq/faq.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, AboutUsComponent,BlogResourcesComponent,ContactComponent,PortfolioComponent,
      IntroductionComponent,ServicesComponent,TechnologiesComponent,FaqComponent,FooterComponent,ButtonModule,RippleModule,
      NavBarComponent, FormsModule
      ],
      animations: [
        trigger('openClose', [
          state('open', style({
            opacity: 1,
            transform: 'scale(1)'
          })),
          state('closed', style({
            opacity: 0,
            transform: 'scale(0.9)'
          })),
          transition('open => closed', [
            animate('2s ease-in')
          ]),
          transition('closed => open', [
            animate('2s ease-out')
          ])
        ])
      ]
})
export class AppComponent implements OnInit {
  

  constructor(private primeNgConfig:PrimeNGConfig){}

  ngOnInit(): void {
    this.primeNgConfig.ripple=true;
  }

  title = 'gkdigitalhut';

}
