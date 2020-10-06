import ClickWAV from './click.wav';

const playAudio = () => {
  let player = document.getElementById('click-wav');
  if (!player) {
    player = document.createElement('audio');
    player.setAttribute('src', ClickWAV);
    player.id = 'click-wav';
    document.body.appendChild(player);
  }
  (player as HTMLAudioElement).play();
};

document.body.addEventListener('mousedown', playAudio);
document.body.addEventListener('touchstart', playAudio);

window.addEventListener('beforeunload', () => {
  document.body.removeEventListener('mousedown', playAudio);
  document.body.removeEventListener('touchstart', playAudio);
});
