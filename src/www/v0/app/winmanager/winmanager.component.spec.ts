import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinManagerComponent } from './winmanager.component';

describe ( 'WinManagerComponent', () => {
  let component: WinManagerComponent;
  let fixture: ComponentFixture<WinManagerComponent>;

  beforeEach ( async () => {
    await TestBed.configureTestingModule ( {
      declarations: [ WinManagerComponent ]
    } )
    .compileComponents ();
  } );

  beforeEach ( () => {
    fixture = TestBed.createComponent ( WinManagerComponent );
    component = fixture.componentInstance;
    fixture.detectChanges ();
  } );

  it ( 'should create', () => {
    expect ( component ).toBeTruthy ();
  } );
} );
