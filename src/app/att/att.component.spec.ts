import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttComponent } from './att.component';

describe('AttComponent', () => {
  let component: AttComponent;
  let fixture: ComponentFixture<AttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
