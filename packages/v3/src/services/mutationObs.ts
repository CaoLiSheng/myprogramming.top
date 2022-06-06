export default class MutationObs {
  
  _mutationObserver: MutationObserver | null = null;

  _config: { childList: boolean; characterData: boolean; characterDataOldValue: boolean; subtree: boolean; };
  _domElements: HTMLElement[] = [];

  isEnabled = false;

  constructor() {
    this._config = {
			childList: true,
			characterData: true,
			characterDataOldValue: true,
			subtree: true
		};
    this._mutationObserver = new MutationObserver( this._onMutations.bind( this ) );
    this.isEnabled = true;
  }

  observe( domElement: HTMLElement ) {
		this._domElements.push( domElement );

		if ( this.isEnabled ) {
			this._mutationObserver?.observe( domElement, this._config );
		}
	}

  enable() {
		this.isEnabled = true;

		for ( const domElement of this._domElements ) {
			this._mutationObserver?.observe( domElement, this._config );
		}
	}

  disable() {
		this.isEnabled = false;

		this._mutationObserver?.disconnect();
	}

  flush() {
    if (!this._mutationObserver) return;

    this._onMutations( this._mutationObserver.takeRecords() );
  }

  _onMutations( domMutations: MutationRecord[] ) {
    console.log(domMutations);
  }
}