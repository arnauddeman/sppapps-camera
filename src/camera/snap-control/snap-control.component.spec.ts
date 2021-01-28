import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnapControlComponent } from './snap-control.component';

describe('SnapControlComponent', () => {
  let component: SnapControlComponent;
  let fixture: ComponentFixture<SnapControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnapControlComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
