import './scss/index.scss';
import cardsStart from './js/cards';
import createStatic from './js/createStatic';
import createMainPage from './js/createMainPage';
import createContent from './js/createContent';
import speak from './js/speak';
import playAudio from './js/playAudio';
import burger from './js/burger';
import { createStats, sortStats, generateArr } from './js/createStats';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  const synth = window.speechSynthesis;
  app.classList.add('app');
  document.body.append(app);
  let switcher = 'train';
  let onMain = true;
  let onGame = false;
  let answers = [];
  let wordOnGame = '';
  let error = 0;
  let cards;
  let reverseStats = '';
  if (localStorage.getItem('statisticsAndDataCards')) {
    cards = JSON.parse(localStorage.getItem('statisticsAndDataCards'));
  } else {
    cards = cardsStart;
  }
  function func(e) {
    if (e.target.classList.contains('card_act')) {
      const card = e.target.closest('.card');
      // cards[index].forEach((item) => {
      //     if(card.querySelector('.card__name').textContent === item.translation){
      //         card.querySelector('.card__name').textContent = item.word;
      //     }
      // });
      for (let i = 1; i < cards.length; i++) {
        for (let j = 0; j < cards[i].length; j++) {
          if (cards[i][j].translation === card.querySelector('.card__name').textContent) {
            card.querySelector('.card__name').textContent = cards[i][j].word;
          }
        }
      }
      e.target.classList.remove('card_act');
      e.target.closest('.card').removeEventListener('mouseleave', func);
    }
  }
  createStatic();
  burger();
  createMainPage(cards);
  app.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('card__btn-swap')) {
      const card = e.target.closest('.card');
      card.classList.add('card_act');
      for (let i = 1; i < cards.length; i++) {
        for (let j = 0; j < cards[i].length; j++) {
          if (cards[i][j].word === card.querySelector('.card__name').textContent) {
            cards[i][j].train++;
            card.querySelector('.card__name').textContent = cards[i][j].translation;
          }
        }
      }
      localStorage.setItem('statisticsAndDataCards', JSON.stringify(cards));
      card.addEventListener('mouseleave', func);
    } else if (e.target.closest('.card') && !e.target.closest('.card').classList.contains('card_act') && !e.target.closest('.card').classList.contains('card_overlay')) {
      const card = e.target.closest('.card');
      const name = card.querySelector('.card__name');
      if (switcher === 'train') {
        speak(name.textContent, synth);
        for (let i = 1; i < cards.length; i++) {
          for (let j = 0; j < cards[i].length; j++) {
            if (cards[i][j].word === name.textContent) {
              cards[i][j].train++;
            }
          }
        }
        localStorage.setItem('statisticsAndDataCards', JSON.stringify(cards));
      } else if (switcher === 'play' && onGame) {
        if (name.textContent === wordOnGame) {
          playAudio('./assets/correct.mp3');
          e.target.closest('.card').classList.add('card_overlay');
          document.querySelector('.result-block').insertAdjacentHTML('beforeend', '<img src="./assets/nice.svg" alt="">');
          answers.splice(answers.indexOf(wordOnGame), 1);
          for (let i = 1; i < cards.length; i++) {
            for (let j = 0; j < cards[i].length; j++) {
              if (cards[i][j].word === wordOnGame) {
                cards[i][j].playCorrect++;
              }
            }
          }
          localStorage.setItem('statisticsAndDataCards', JSON.stringify(cards));
          if (answers.length === 0 && error === 0) {
            error = 0;
            wordOnGame = '';
            onGame = false;
            document.querySelector('.btn-block').classList.remove('btn-block_active');
            setTimeout(() => {
              playAudio('./assets/win.mp3');
              document.querySelector('.content').innerHTML = `
                                <div class="smile-block">
                                    <img src="./assets/smile.svg" alt="" class="smile">
                                </div> 
                            `;
              document.querySelector('.result-block').innerHTML = '';
              document.querySelector('.btn-block__play').classList.remove('btn-block__play_repeat');
            }, 1500);
            setTimeout(() => {
              document.querySelectorAll('.nav_item').forEach((item) => {
                item.classList.remove('nav_item_active');
              });
              document.querySelector('.nav_item').classList.add('nav_item_active');
              createMainPage(cards);
            }, 8000);
          } else if (answers.length === 0 && error !== 0) {
            wordOnGame = '';
            onGame = false;
            document.querySelector('.btn-block').classList.remove('btn-block_active');
            setTimeout(() => {
              playAudio('./assets/failGame.mp3');
              document.querySelector('.content').innerHTML = `
                                <div class="smile-block">
                                    <img src="./assets/sad.svg" alt="" class="smile">
                                    <div class="error">${error} errors</div>
                                </div> 
                            `;
              document.querySelector('.result-block').innerHTML = '';
              document.querySelector('.btn-block__play').classList.remove('btn-block__play_repeat');
              error = 0;
            }, 1500);
            setTimeout(() => {
              document.querySelectorAll('.nav_item').forEach((item) => {
                item.classList.remove('nav_item_active');
              });
              document.querySelector('.nav_item').classList.add('nav_item_active');
              createMainPage(cards);
            }, 8000);
          } else {
            const random = Math.floor(Math.random() * Math.floor(answers.length));
            wordOnGame = answers[random];
            setTimeout(() => {
              speak(wordOnGame, synth);
            }, 2000);
          }
        } else {
          document.querySelector('.result-block').insertAdjacentHTML('beforeend', '<img src="./assets/x-mark.svg" alt="">');
          error++;
          for (let i = 1; i < cards.length; i++) {
            for (let j = 0; j < cards[i].length; j++) {
              if (cards[i][j].word === wordOnGame) {
                cards[i][j].playIncorrect++;
              }
            }
          }
          localStorage.setItem('statisticsAndDataCards', JSON.stringify(cards));
          playAudio('./assets/fail.mp3');
        }
        if (document.querySelector('.result-block').children.length > 13) {
          document.querySelector('.result-block').firstChild.remove();
        }
      }
    } else if (e.target.closest('[data-id]')) {
      if (e.target.closest('[data-id]').dataset.id == 'main') {
        createMainPage(cards);
        onMain = true;
      } else if (e.target.closest('[data-id]').dataset.id == 'Stats') {
        createStats(generateArr(cards));
        onMain = true;
        document.querySelector('.btn-block').classList.remove('btn-block_active');
      } else {
        const { id } = e.target.closest('[data-id]').dataset;
        createContent(cards, id, switcher);
        onMain = false;
      }
      onGame = false;
      document.querySelectorAll('.nav_item').forEach((item) => {
        if (item.dataset.id === e.target.closest('[data-id]').dataset.id) {
          item.classList.add('nav_item_active');
          return;
        }
        item.classList.remove('nav_item_active');
      });
      document.querySelector('.burger').classList.remove('burger_active');
      document.querySelector('.nav').classList.remove('nav_active');
      document.querySelector('.overlay').classList.remove('overlay_active');
      document.body.classList.remove('scroll-dis');
      document.querySelector('.btn-block__play').classList.remove('btn-block__play_repeat');
      document.querySelector('.btn-block__play').textContent = 'play';
      document.querySelector('.result-block').innerHTML = '';
    } else if (e.target.classList.contains('btn-block__play') && !e.target.classList.contains('btn-block__play_repeat')) {
      e.target.classList.add('btn-block__play_repeat');
      e.target.textContent = 'repeat';
      onGame = true;
      error = 0;
      const cardsGameName = document.querySelectorAll('.card__name');
      const arr = [];
      cardsGameName.forEach((item) => {
        arr.push(item.textContent);
      });
      answers = arr;
      const random = Math.floor(Math.random() * Math.floor(answers.length));
      wordOnGame = answers[random];
      // console.log(arr,random,firstWord);
      speak(wordOnGame, synth);
    } else if (e.target.classList.contains('btn-block__play') && e.target.classList.contains('btn-block__play_repeat')) {
      speak(wordOnGame, synth);
    } else if (e.target.classList.contains('thead-item') && e.target.dataset.item !== reverseStats) {
      sortStats(cards, e.target.dataset.item);
      reverseStats = e.target.dataset.item;
    } else if (e.target.classList.contains('thead-item') && e.target.dataset.item === reverseStats) {
      sortStats(cards, e.target.dataset.item, true);
      reverseStats = '';
    } else if (e.target.classList.contains('reset')) {
      for (let i = 1; i < cards.length; i++) {
        for (let j = 0; j < cards[i].length; j++) {
          cards[i][j].train = 0;
          cards[i][j].playCorrect = 0;
          cards[i][j].playIncorrect = 0;
        }
      }
      createStats(generateArr(cards));
      localStorage.setItem('statisticsAndDataCards', JSON.stringify(cards));
    } else if (e.target.classList.contains('difficult')) {
      onMain = false;
      const sortArr = sortStats(cards, 'wrong');
      const newArr = [];
      sortArr.forEach((item) => {
        const wrong = isNaN((item.playIncorrect / (item.playIncorrect + item.playCorrect)) * 100) || (item.playIncorrect / (item.playIncorrect + item.playCorrect)) * 100 == Infinity || item.playIncorrect == 0 ? 0 : Math.floor((item.playIncorrect / (item.playIncorrect + item.playCorrect)) * 100);
        if (wrong != 0 && newArr.length < 8) {
          newArr.push(item);
        }
      });
      createContent(newArr, 0, switcher, true);
    }
  });

  // createMainPage(cards);

  document.querySelector('.switch-btn').addEventListener('click', (e) => {
    e.target.classList.toggle('switch-on');
    document.querySelector('.btn-block__play').classList.remove('btn-block__play_repeat');
    document.querySelector('.btn-block__play').textContent = 'play';
    document.querySelector('.result-block').innerHTML = '';
    const cardsGame = document.querySelectorAll('.card');
    onGame = false;
    cardsGame.forEach((item) => {
      item.classList.remove('card_overlay');
    });
    if (switcher == 'train') {
      cardsGame.forEach((item) => {
        item.classList.add('card_game');
        item.classList.remove('card_overlay');
      });
      if (!onMain && cardsGame.length != 0) {
        document.querySelector('.btn-block').classList.add('btn-block_active');
      }
      switcher = 'play';
    } else if (switcher == 'play') {
      cardsGame.forEach((item) => {
        item.classList.remove('card_game');
      });
      if (!onMain) {
        document.querySelector('.btn-block').classList.remove('btn-block_active');
      }
      switcher = 'train';
    }
  });
});
