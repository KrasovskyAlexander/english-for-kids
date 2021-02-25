const createContent = (arr, id, switcher, simpleArr = false) => {
  const index = simpleArr ? '' : arr[0].indexOf(id);
  const container = document.querySelector('.content');
  container.classList.remove('content_scroll');
  if (switcher === 'play' && arr.length != 0) {
    document.querySelector('.btn-block').classList.add('btn-block_active');
  }
  function template(name, img) {
    return `
            <div class="card ${switcher === 'play' ? 'card_game' : ''} ">
                <div class="card__img">
                    <img src="${img}" alt="">
                </div>
                <div class="card__name">${name}</div>
                <div class="card__btn-swap"><img src="./assets/refresh.svg" alt=""></div>
            </div>
        `;
  }
  let fragment = '';
  if (simpleArr) {
    arr.forEach((item) => {
      fragment += template(item.word, item.image);
    });
  } else {
    arr[index + 1].forEach((item) => {
      fragment += template(item.word, item.image);
    });
  }
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', fragment);
};

export default createContent;
