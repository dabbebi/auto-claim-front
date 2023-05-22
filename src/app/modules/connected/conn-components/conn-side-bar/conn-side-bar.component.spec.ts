import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnSideBarComponent } from './conn-side-bar.component';

describe('ConnSideBarComponent', () => {
  let component: ConnSideBarComponent;
  let fixture: ComponentFixture<ConnSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnSideBarComponent]
    });
    fixture = TestBed.createComponent(ConnSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
