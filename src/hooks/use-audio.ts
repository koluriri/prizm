const useAudio = () => (path: string) => {
  const audio = new Audio(`/audio/${path}.mp3`);
  audio.volume = 0.5;
  audio
    .play()
    .then(() => true)
    .catch((error) => console.error(error));
};

export default useAudio;
