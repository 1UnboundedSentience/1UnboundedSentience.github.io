document.addEventListener('DOMContentLoaded', () => {
  let words = [];
  let index = 0;
  let known = JSON.parse(localStorage.getItem('knownWords') || '[]');

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadWords() {
    fetch(FLASHCARD_DATA_URL)
      .then(res => res.json())
      .then(data => {
        words = data;
        shuffle(words);
        index = 0;
        showWord();
      });
  }

  function showWord() {
    if (index >= words.length) {
      document.getElementById('card-word').textContent = 'All done!';
      document.getElementById('card-answer').textContent = '';
      return;
    }
    const w = words[index];
    document.getElementById('card-word').textContent = w.gurmukhi;
    document.getElementById('card-answer').textContent = `${w.transliteration} - ${w.english}`;
    document.getElementById('card-answer').style.display = 'none';
  }

  document.getElementById('show-answer').addEventListener('click', () => {
    document.getElementById('card-answer').style.display = 'block';
  });

  document.getElementById('known-btn').addEventListener('click', () => {
    known.push(words[index]);
    localStorage.setItem('knownWords', JSON.stringify(known));
    index++;
    showWord();
  });

  document.getElementById('unknown-btn').addEventListener('click', () => {
    index++;
    showWord();
  });

  loadWords();
});
