import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmarksComponent } from './viewmarks.component';

describe('ViewmarksComponent', () => {
  let component: ViewmarksComponent;
  let fixture: ComponentFixture<ViewmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewmarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
