import ClickWAV from './click.wav';

const playAudio = () => {
  let player = document.getElementById('click-wav');
  if (!player) {
    player = document.createElement('audio');
    document.body.appendChild(player);
    player.setAttribute('src', ClickWAV);
  }
  (player as HTMLAudioElement).play();
};

document.body.addEventListener('mousedown', playAudio);
document.body.addEventListener('touchstart', playAudio);

window.addEventListener('beforeunload', () => {
  document.body.removeEventListener('mousedown', playAudio);
  document.body.removeEventListener('touchstart', playAudio);
});
