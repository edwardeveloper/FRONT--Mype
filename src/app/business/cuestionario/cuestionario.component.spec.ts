import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cuestionarioComponent } from './cuestionario.component';

describe('cuestionarioComponent', () => {
  let component: cuestionarioComponent;
  let fixture: ComponentFixture<cuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [cuestionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(cuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
