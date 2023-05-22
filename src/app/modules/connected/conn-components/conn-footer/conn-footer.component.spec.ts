import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnFooterComponent } from './conn-footer.component';

describe('ConnFooterComponent', () => {
  let component: ConnFooterComponent;
  let fixture: ComponentFixture<ConnFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnFooterComponent]
    });
    fixture = TestBed.createComponent(ConnFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
