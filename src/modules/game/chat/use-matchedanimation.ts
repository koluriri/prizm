const useMatchedAnimation =
  (gameColor: string, scrollChat: () => void) => () => {
    document.body.classList.add('matched');

    setTimeout(() => {
      document.body.style.backgroundColor = gameColor;
      document
        .querySelector("meta[name='theme-color']")
        ?.setAttribute('content', gameColor);
    }, 10);

    setTimeout(() => {
      document.body.classList.remove('matched');
      document.body.style.backgroundColor = 'var(--bg-color)';
      document
        .querySelector("meta[name='theme-color']")
        ?.setAttribute('content', '#f2efe2');
      document
        .querySelector("meta[name='theme-color'][media*='dark']")
        ?.setAttribute('content', '#0b141c');
    }, 800);

    setTimeout(() => scrollChat(), 900);
  };

export default useMatchedAnimation;
