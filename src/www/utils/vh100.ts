const setVh = () => {
  const vh = (window.innerHeight * 0.01).toFixed(1);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('pageshow', function(evt) {
  return evt.persisted && setVh();
});
window.addEventListener('resize', setVh);
