const createStatic = () => {
  document.querySelector('.app').innerHTML = `
    <header class="header">
            <div class="burger">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="switch">
                <div class="switch-train switch__item"><img src="./assets/online-education.svg" alt=""></div>
                <div class="switch-btn"></div>
                <div class="switch-play switch__item"><img src="./assets/game-controller.svg" alt=""></div>
            </div>
        </header>
        <nav class="nav">
            <div class="nav_item nav_item_active" data-id="main">Main pages</div>
            <div class="nav_item" data-id="Fruits 1">Fruits 1</div>
            <div class="nav_item" data-id="Fruits 2">Fruits 2</div>
            <div class="nav_item" data-id="Kitchen">Kitchen</div>
            <div class="nav_item" data-id="Stationery">Stationery</div>
            <div class="nav_item" data-id="Vegetables">Vegetables</div>
            <div class="nav_item" data-id="Verbs">Verbs</div>
            <div class="nav_item" data-id="School">School</div>
            <div class="nav_item" data-id="Animals">Animals</div>
            <div class="nav_item" data-id="Stats">Stats</div>
        </nav>
        <div class="overlay"></div>
        <div class="btn-block">
            <button class="btn-block__play">play</button>
        </div>
        <div class="result-block"></div>
        <main class="content">
            
        </main>
        <footer class="footer">
            <a href="https://github.com/KrasovskyAlexander">©2020 Krasovsky</a>
            <a href="https://rs.school/js/"><img src="./assets/rs_school_js.svg" alt=""></a>
        </footer>
    `;
};
export default createStatic;
