// Angular testing utilities
import { ComponentFixture, TestBed } from '@angular/core/testing';

// ✅ Import the actual standalone component class
import { PostFormComponent } from './post-form';

describe('PostFormComponent', () => {
  // Holds the concrete instance of PostFormComponent created by the TestBed
  let component: PostFormComponent;

  // Fixture provides access to the component instance and its rendered DOM,
  // and lets us trigger change detection
  let fixture: ComponentFixture<PostFormComponent>;

  // Runs before each test to set up a fresh testing environment
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone pattern: import the component directly (no NgModule declarations)
      imports: [PostFormComponent]
    })
    // Compiles the component's template and styles so they can be instantiated
    .compileComponents();

    // Creates a fixture (test host) for the component
    fixture = TestBed.createComponent(PostFormComponent);

    // Extracts the component instance from the fixture for direct interaction
    component = fixture.componentInstance;

    // Triggers Angular's change detection so bindings and lifecycle hooks run
    fixture.detectChanges();
  });

  // Basic sanity test: verifies the component instance was created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
