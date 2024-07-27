import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlatformConfig } from '@angular/platform-server';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { BlogResourcesComponent } from './blog-resources/blog-resources.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { ServicesComponent } from './services/services.component';
import { FaqComponent } from './faq/faq.component';

export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch: 'full'},
    { path: 'home', component: HeaderComponent },
  { path: 'home', component: AboutUsComponent },
  { path: 'home', component: ContactComponent },
  { path: 'home', component: FaqComponent},
  { path: 'home', component: TechnologiesComponent },
  { path: 'home', component: ServicesComponent },
  { path: '**', redirectTo: '/home' }
];

// export const appRoutes = RouterModule.forRoot(routes, {
//     scrollPositionRestoration: 'enabled',
//     anchorScrolling: 'enabled'
//   });
export const animations=[BrowserModule,BrowserAnimationsModule];
