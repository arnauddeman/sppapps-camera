import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSnapComponent } from './modal-snap.component';

describe('ModalSnapComponent', () => {
  let component: ModalSnapComponent;
  let fixture: ComponentFixture<ModalSnapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSnapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
