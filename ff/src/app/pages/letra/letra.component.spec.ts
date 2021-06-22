import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetraComponent } from './letra.component';

describe('LetraComponent', () => {
  let component: LetraComponent;
  let fixture: ComponentFixture<LetraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
