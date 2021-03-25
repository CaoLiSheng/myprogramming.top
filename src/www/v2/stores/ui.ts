import localforage from 'localforage';
import { clickIn } from '@www/utils/dom';

declare let __production__: string;

const ReaderLevelKey = 'READERLEVEL';

const ui = {
  state: {
    menuOpened: true,
    menuVisible: false,
    readerLevelGranted: false,
    rlGrantable: !JSON.parse( __production__ ),
  },
  private: {
    handleMenuClose: ( _: MouseEvent ) => {},
  },
  openMenu ( ...bounds: ( HTMLElement | null )[] ) {
    this.state.menuOpened = true;
    this.private.handleMenuClose = ( ev: MouseEvent ) => {
      if ( !( ev.target instanceof HTMLElement ) ) return;
      if ( clickIn( ev.target, ...bounds ) ) return;
      document.body.removeEventListener( 'click', this.private.handleMenuClose );
      ui.closeMenu();
    };
    setTimeout(
      () => document.body.addEventListener( 'click', this.private.handleMenuClose ),
      0,
    );
  },
  closeMenu () {
    this.state.menuOpened = false;
  },
  setVisible ( v: boolean ) {
    this.state.menuVisible = v;
  },
  toggleReaderLevel () {
    this.state.readerLevelGranted = !this.state.readerLevelGranted;
    void localforage.setItem( ReaderLevelKey, this.state.readerLevelGranted );
  },
};

void ( async () => {
  ui.state.readerLevelGranted = ( await localforage.getItem<boolean>( ReaderLevelKey ) ) || false;
} )();

export { ui };
