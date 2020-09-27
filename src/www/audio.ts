import ClickWAV from '@audios/click.wav';

document.body.addEventListener('click', () => {
  let player = document.getElementById('click-wav');
  if (!player) {
    player = document.createElement('audio');
    document.body.appendChild(player);
    player.setAttribute('src', ClickWAV);
  }
  (player as HTMLAudioElement).play();
});