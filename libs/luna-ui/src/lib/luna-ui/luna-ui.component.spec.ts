import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LunaUiComponent } from './luna-ui.component';

describe('LunaUiComponent', () => {
  let component: LunaUiComponent;
  let fixture: ComponentFixture<LunaUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LunaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
