// Import Angular testing utilities
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the component we want to test
import { PostListComponent } from './post-list';

// A test suite for PostListComponent
describe('PostListComponent', () => {
  // 'component' will hold the actual instance of PostListComponent
  let component: PostListComponent;

  // 'fixture' is a wrapper that gives access to both the component instance
  // and the rendered DOM (template) for testing
  let fixture: ComponentFixture<PostListComponent>;

  // Runs before each test in this suite
  beforeEach(async () => {
    // Configure a testing module for this spec file
    // In standalone Angular, we import the component directly instead of declaring it in a module
    await TestBed.configureTestingModule({
      imports: [PostListComponent]  // ✅ standalone component imported here
    })
    .compileComponents(); // Compiles the component's template and CSS

    // Create a test fixture for PostListComponent
    fixture = TestBed.createComponent(PostListComponent);

    // Get the actual component instance from the fixture
    component = fixture.componentInstance;

    // Trigger Angular's change detection so bindings and lifecycle hooks run
    fixture.detectChanges();
  });

  // Example test case: check that the component was created successfully
  it('should create', () => {
    // 'toBeTruthy()' means the component instance exists and is not null/undefined
    expect(component).toBeTruthy();
  });
});
