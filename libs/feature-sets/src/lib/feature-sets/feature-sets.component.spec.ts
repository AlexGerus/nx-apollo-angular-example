import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureSetsComponent } from './feature-sets.component';

describe('FeatureSetsComponent', () => {
  let component: FeatureSetsComponent;
  let fixture: ComponentFixture<FeatureSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureSetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
