import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptureEmptyGalleryComponent } from './capture-empty-gallery.component';

describe('CaptureEmptyGalleryComponent', () => {
  let component: CaptureEmptyGalleryComponent;
  let fixture: ComponentFixture<CaptureEmptyGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaptureEmptyGalleryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureEmptyGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
