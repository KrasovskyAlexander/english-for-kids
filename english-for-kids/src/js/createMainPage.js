const createMainPage = (cards) => {
  document.querySelector('.btn-block').classList.remove('btn-block_active');
  function template(name, img) {
    return `
            <div class="card-main" data-id="${name}">
                <div class="card-main__img">
                    <img src="${img}" alt="">
                </div>
                <div class="card-main__name">${name}</div>
            </div>
        `;
  }
  const container = document.querySelector('.content');
  container.classList.remove('content_scroll');
  let fragment = '';
  let name = '';
  let img = '';
  for (let i = 1; i < cards.length; i++) {
    name = cards[0][i - 1];
    img = cards[i][0].image;
    fragment += template(name, img);
  }
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', fragment);
};

export default createMainPage;
