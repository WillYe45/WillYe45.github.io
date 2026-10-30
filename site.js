const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
if (menuButton && navigation) {
  document.body.classList.add('js-ready');
  menuButton.hidden = false;
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('span').textContent = '＋';
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span').textContent = open ? '−' : '＋';
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
}
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.paper-animation').forEach(figure => {
  const button = figure.querySelector('.animation-toggle');
  const subject = button.getAttribute('aria-label').replace(/^Pause /, '');
  const setPaused = paused => {
    figure.classList.toggle('is-paused', paused);
    button.setAttribute('aria-pressed', String(paused));
    button.disabled = motionPreference.matches;
    button.textContent = motionPreference.matches ? 'Static' : paused ? 'Play' : 'Pause';
    button.setAttribute('aria-label', motionPreference.matches
      ? `${subject}: reduced motion enabled`
      : `${paused ? 'Play' : 'Pause'} ${subject}`);
  };
  button.hidden = false;
  setPaused(motionPreference.matches);
  button.addEventListener('click', () => {
    setPaused(button.getAttribute('aria-pressed') !== 'true');
  });
  motionPreference.addEventListener('change', () => setPaused(motionPreference.matches));
});
