// Angular testing utilities: TestBed bootstraps a test environment,
// ComponentFixture wraps the component instance and its rendered DOM.
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the actual standalone component under test.
// Make sure the filename matches your component: './post-detail.component'
import { PostDetailComponent } from './post-detail';

describe('PostDetailComponent', () => {
  // Holds the concrete instance of PostDetailComponent created by the TestBed.
  let component: PostDetailComponent;

  // Fixture provides access to the component instance and the DOM,
  // and lets us trigger change detection.
  let fixture: ComponentFixture<PostDetailComponent>;

  // Runs before each test to set up a fresh testing environment.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone pattern: import the component directly (no NgModule declarations).
      imports: [PostDetailComponent]
    })
    // Compiles the component's template and styles so they can be instantiated.
    .compileComponents();

    // Creates a fixture (test host) for the component.
    fixture = TestBed.createComponent(PostDetailComponent);

    // Extracts the component instance from the fixture for direct interaction.
    component = fixture.componentInstance;

    // Triggers Angular's change detection so bindings and lifecycle hooks run.
    fixture.detectChanges();
  });

  // Basic sanity test: verifies the component instance was created successfully.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
