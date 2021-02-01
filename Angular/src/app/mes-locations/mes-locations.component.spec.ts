import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesLocationsComponent } from './mes-locations.component';

describe('MesLocationsComponent', () => {
  let component: MesLocationsComponent;
  let fixture: ComponentFixture<MesLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
