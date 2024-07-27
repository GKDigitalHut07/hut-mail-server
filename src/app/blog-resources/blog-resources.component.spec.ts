import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogResourcesComponent } from './blog-resources.component';

describe('BlogResourcesComponent', () => {
  let component: BlogResourcesComponent;
  let fixture: ComponentFixture<BlogResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
