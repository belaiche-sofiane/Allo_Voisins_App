import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsAjoutesComponent } from './produits-ajoutes.component';

describe('ProduitsAjoutesComponent', () => {
  let component: ProduitsAjoutesComponent;
  let fixture: ComponentFixture<ProduitsAjoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsAjoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsAjoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
