import ClickWAV from './click.wav';

const validatePlayer = (() => {
  let firstValidPalyer: string | null = null;
  return (name: string): boolean => {
    if (null === firstValidPalyer) {
      firstValidPalyer = name;
    }

    return firstValidPalyer === name;
  };
})();

const playAudio = (name: string) => {
  if (!validatePlayer(name)) return;

  let player = document.getElementById('click-wav');
  if (!player) {
    player = document.createElement('audio');
    player.setAttribute('src', ClickWAV);
    player.id = 'click-wav';
    document.body.appendChild(player);
  }
  (player as HTMLAudioElement).play();
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
