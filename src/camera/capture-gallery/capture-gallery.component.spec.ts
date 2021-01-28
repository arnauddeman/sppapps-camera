import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptureGalleryComponent } from './capture-gallery.component';

describe('CaptureGalleryComponent', () => {
  let component: CaptureGalleryComponent;
  let fixture: ComponentFixture<CaptureGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaptureGalleryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
