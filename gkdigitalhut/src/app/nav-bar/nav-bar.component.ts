import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,AvatarModule, InputTextModule, FormsModule, InputGroupModule,ButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
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
export class NavBarComponent {

  menuItem=[
    {label:'Home',selected:true},
    {label:'Dashboard',selected:false},
    {label:'ContactUs',selected:false},
    {label:'Users',selected:false}
  ];
  sidebar:boolean = true;
  openSideBar() {
    this.sidebar=!this.sidebar;
  }
  onSelect(item:{label:string,selected:boolean}) {
    this.menuItem.forEach(i => i.selected=false);
    item.selected = true;
  }

  searchText: string = '';
  showSearchBox: boolean = false;

  // constructor(private searchService: SearchService) {}

  // onSearch(): void {
  //   this.searchService.search(this.query);
  // }
  constructor(private router: Router) {}

  navigateToSection(): void {
    // Clean up search text (trim, lowercase, replace spaces with dashes for ID matching)
    const cleanSearchText = this.searchText.trim().toLowerCase().replace(/\s+/g, '-');

    // Navigate to section based on the cleaned up search text
    this.router.navigate(['home'], { fragment: cleanSearchText });
  }

  toggleSearchBox(): void {
    this.showSearchBox = !this.showSearchBox;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container') && this.showSearchBox) {
      this.showSearchBox = false;
    }
  }
}
