import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnapLauncherComponent } from './snap-launcher.component';

describe('SnapLauncherComponen', () => {
  let component: SnapLauncherComponent;
  let fixture: ComponentFixture<SnapLauncherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnapLauncherComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
