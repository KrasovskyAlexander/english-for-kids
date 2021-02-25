const generateArr = (arr) => {
  const cards = [...arr];
  cards.shift();
  const newArr = [];
  cards.forEach((element) => {
    element.forEach((item) => newArr.push(item));
  });
  return newArr;
};

const createStats = (arr) => {
  function templateStats(categories, word, translate, train, playCorrect, playIncorrect) {
    return `
            <tr>
                <th>${categories}</th>
                <th>${word}</th>
                <th>${translate}</th>
                <th>${train}</th>
                <th>${playCorrect}</th>
                <th>${playIncorrect}</th>
                <th>${isNaN((playIncorrect / (playIncorrect + playCorrect)) * 100) || (playIncorrect / (playIncorrect + playCorrect)) * 100 == Infinity || playIncorrect == 0 ? 0 : Math.floor((playIncorrect / (playIncorrect + playCorrect)) * 100)}</th>
            </tr>
        `;
  }
  // const newArr = generateArr(arr);
  const newArr = arr;
  const container = document.querySelector('.content');
  container.innerHTML = '';
  if (!container.classList.contains('content_scroll')) {
    container.classList.add('content_scroll');
  }
  const table = document.createElement('table');
  container.insertAdjacentHTML('afterbegin', `
    <div class="stats-btn">
        <button class="difficult">Repeat difficult words</button>
        <button class="reset">Reset</button>
    </div>
    `);
  table.classList.add('table');
  container.append(table);
  table.insertAdjacentHTML('afterbegin', `
        <thead>
            <tr>
                <th class="thead-item" data-item="categories">Categories</th>
                <th class="thead-item" data-item="word">Word</th>
                <th class="thead-item" data-item="translation">Translation</th>
                <th class="thead-item" data-item="train">Trained</th>
                <th class="thead-item" data-item="playCorrect">Correct</th>
                <th class="thead-item" data-item="playIncorrect">Incorrect</th>
                <th class="thead-item" data-item="wrong">% error</th>
            </tr>
        </thead>
    `);
  const tbody = document.createElement('tbody');
  table.append(tbody);
  let fragment = '';
  newArr.forEach((item) => {
    fragment += templateStats(item.categories, item.word, item.translation, item.train, item.playCorrect, item.playIncorrect);
  });
  tbody.insertAdjacentHTML('afterbegin', fragment);
};

const sortStats = (arr, dataitem, reverse = false) => {
  const cards = generateArr(arr);
  if (dataitem === 'categories' || dataitem === 'word' || dataitem === 'translation') {
    cards.sort((prev, next) => {
      if (prev[dataitem] < next[dataitem]) return -1;
      if (prev[dataitem] < next[dataitem]) return 1;
    });
  } else if (dataitem === 'wrong') {
    cards.sort((a, b) => (isNaN((b.playIncorrect / (b.playIncorrect + b.playCorrect)) * 100) || (b.playIncorrect / (b.playIncorrect + b.playCorrect)) * 100 == Infinity || b.playIncorrect == 0 ? 0 : Math.floor((b.playIncorrect / (b.playIncorrect + b.playCorrect)) * 100)) - (isNaN((a.playIncorrect / (a.playIncorrect + a.playCorrect)) * 100) || (a.playIncorrect / (a.playIncorrect + a.playCorrect)) * 100 == Infinity || a.playIncorrect == 0 ? 0 : Math.floor((a.playIncorrect / (a.playIncorrect + a.playCorrect)) * 100)));
  } else {
    cards.sort((a, b) => b[dataitem] - a[dataitem]);
  }
  if (reverse) {
    cards.reverse();
  }
  createStats(cards);
  return reverse ? cards.reverse() : cards;
};

export { createStats, sortStats, generateArr };
