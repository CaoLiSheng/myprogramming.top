class KeyBinder {
    private lastSpaceKeyHit = 0;

    public bindDoubleSpaceKey ( callback: () => void, ev: KeyboardEvent ): void {

        if ( ev.key !== ' ' ) {
            this.lastSpaceKeyHit = 0;
            return;
        }

        ev.preventDefault ();

        const now = performance.now ();
        if ( now - this.lastSpaceKeyHit < 300 ) {
            this.lastSpaceKeyHit = 0;
            callback ();
            return;
        }

        this.lastSpaceKeyHit = now;
    }

}

export const Binder = new KeyBinder ();
