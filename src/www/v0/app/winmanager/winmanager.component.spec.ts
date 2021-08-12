import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinmanagerComponent } from './winmanager.component';

describe ( 'WinmanagerComponent', () => {
  let component: WinmanagerComponent;
  let fixture: ComponentFixture<WinmanagerComponent>;

  beforeEach ( async () => {
    await TestBed.configureTestingModule ( {
      declarations: [ WinmanagerComponent ]
    } )
    .compileComponents ();
  } );

  beforeEach ( () => {
    fixture = TestBed.createComponent ( WinmanagerComponent );
    component = fixture.componentInstance;
    fixture.detectChanges ();
  } );

  it ( 'should create', () => {
    expect ( component ).toBeTruthy ();
  } );
} );
