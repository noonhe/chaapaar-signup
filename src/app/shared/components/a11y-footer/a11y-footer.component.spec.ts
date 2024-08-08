import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A11yFooterComponent } from './a11y-footer.component';

describe('A11yFooterComponent', () => {
  let component: A11yFooterComponent;
  let fixture: ComponentFixture<A11yFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [A11yFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(A11yFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
