import '../../../shims-string';

import KnockWAV from './index.wav';

const playAudio = ( name: string ) => {
  if ( !name.uniqueCheck ( 'KnockWAV' ) ) return;

  let player = document.querySelector ( '#click-wav' );
  if ( !player ) {
    player = document.createElement ( 'audio' );
    player.id = 'click-wav';
    document.body.append ( player );
  }

  if ( player instanceof HTMLAudioElement ) {
    player.setAttribute ( 'src', KnockWAV );
    void player.play ();
  }
};

// const mouseupListender = playAudio.bind(null, 'mouseup');
const mousedownListender = playAudio.bind ( null, 'mousedown' );
const touchstartListender = playAudio.bind ( null, 'touchstart' );

// document.body.addEventListener('mouseup', mouseupListender);
document.body.addEventListener ( 'mousedown', mousedownListender );
document.body.addEventListener ( 'touchstart', touchstartListender );

window.addEventListener ( 'beforeunload', () => {
  // document.body.removeEventListener('mouseup', mouseupListender);
  document.body.removeEventListener ( 'mousedown', mousedownListender );
  document.body.removeEventListener ( 'touchstart', touchstartListender );
} );
