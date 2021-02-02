import '@common/shims-string';

import ClickWAV from './click.wav';

const playAudio = (name: string) => {
  if (!name.uniqueCheck('ClickWAV')) return;

  let player = document.getElementById('click-wav');
  if (!player) {
    player = document.createElement('audio');
    player.id = 'click-wav';
    document.body.appendChild(player);
  }

  if (player instanceof HTMLAudioElement) {
    player.setAttribute('src', ClickWAV);
    player.play();
  }
};

// const mouseupListender = playAudio.bind(null, 'mouseup');
const mousedownListender = playAudio.bind(null, 'mousedown');
const touchstartListender = playAudio.bind(null, 'touchstart');

// document.body.addEventListener('mouseup', mouseupListender);
document.body.addEventListener('mousedown', mousedownListender);
document.body.addEventListener('touchstart', touchstartListender);

window.addEventListener('beforeunload', () => {
  // document.body.removeEventListener('mouseup', mouseupListender);
  document.body.removeEventListener('mousedown', mousedownListender);
  document.body.removeEventListener('touchstart', touchstartListender);
});
