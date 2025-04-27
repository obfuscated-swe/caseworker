import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRadioComponent } from './status-radio.component';

describe('StatusRadioComponent', () => {
  let component: StatusRadioComponent;
  let fixture: ComponentFixture<StatusRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
