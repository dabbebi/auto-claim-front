import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnHeaderComponent } from './conn-header.component';

describe('ConnHeaderComponent', () => {
  let component: ConnHeaderComponent;
  let fixture: ComponentFixture<ConnHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnHeaderComponent]
    });
    fixture = TestBed.createComponent(ConnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
