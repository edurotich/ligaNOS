import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguetableComponent } from './leaguetable.component';

describe('LeaguetableComponent', () => {
  let component: LeaguetableComponent;
  let fixture: ComponentFixture<LeaguetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaguetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
