import { clickIn } from '@www/utils/dom';

export const ui = {
  state: {
    menuOpened: true,
  },
  private: {
    handleMenuClose: (ev: MouseEvent) => {},
  },
  openMenu(...bounds: (HTMLElement | null)[]) {
    this.state.menuOpened = true;
    this.private.handleMenuClose = (ev: MouseEvent) => {
      console.log('hjaha');
      if (!(ev.target instanceof HTMLElement)) return;
      if (clickIn(ev.target, ...bounds)) return;
      document.body.removeEventListener('click', this.private.handleMenuClose);
      ui.closeMenu();
    };
    setTimeout(
      () =>
        document.body.addEventListener('click', this.private.handleMenuClose),
      0
    );
  },
  closeMenu() {
    this.state.menuOpened = false;
  },
};
