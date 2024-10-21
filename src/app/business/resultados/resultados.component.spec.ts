import { ComponentFixture, TestBed } from '@angular/core/testing';

import { resultadosComponent } from './resultados.component';

describe('resultadosComponent', () => {
  let component: resultadosComponent;
  let fixture: ComponentFixture<resultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [resultadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(resultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
