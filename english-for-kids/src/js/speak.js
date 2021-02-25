const speak = (word, synth) => {
  const utterThis = new SpeechSynthesisUtterance(word);
  const voices = speechSynthesis.getVoices();
  const random = Math.floor(Math.random() * Math.floor(2)) + 4;
  utterThis.voice = voices[random];
  synth.speak(utterThis);
};

export default speak;
