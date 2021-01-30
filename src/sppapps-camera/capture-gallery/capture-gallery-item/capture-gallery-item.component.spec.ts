import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptureGalleryItemComponent } from './capture-gallery-item.component';

describe('CaptureGalleryItemComponent', () => {
  let component: CaptureGalleryItemComponent;
  let fixture: ComponentFixture<CaptureGalleryItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaptureGalleryItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureGalleryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
