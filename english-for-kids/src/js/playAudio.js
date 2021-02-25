const playAudio = (url) => {
  const audCorrect = new Audio();
  audCorrect.src = url;
  audCorrect.play();
};

export default playAudio;
