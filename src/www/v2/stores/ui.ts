export const ui = {
  state: {
    menuOpened: true,
  },
  openMenu() {
    this.state.menuOpened = true;
  },
  closeMenu() {
    this.state.menuOpened = false;
  },
};
