const burger = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.overlay');
  burger.addEventListener('click', () => {
    // console.log(e.target);
    burger.classList.toggle('burger_active');
    nav.classList.toggle('nav_active');
    overlay.classList.toggle('overlay_active');
    document.body.classList.toggle('scroll-dis');
  });
  overlay.addEventListener('click', () => {
    // console.log(e.target);
    burger.classList.remove('burger_active');
    nav.classList.remove('nav_active');
    overlay.classList.remove('overlay_active');
    document.body.classList.remove('scroll-dis');
  });
};
export default burger;
