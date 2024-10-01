import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrcComponent } from './brc.component';

describe('BrcComponent', () => {
  let component: BrcComponent;
  let fixture: ComponentFixture<BrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
