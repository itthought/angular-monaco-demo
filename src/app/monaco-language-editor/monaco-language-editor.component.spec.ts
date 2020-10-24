import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonacoLanguageEditorComponent } from './monaco-language-editor.component';

describe('MonacoLanguageEditorComponent', () => {
  let component: MonacoLanguageEditorComponent;
  let fixture: ComponentFixture<MonacoLanguageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonacoLanguageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonacoLanguageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
