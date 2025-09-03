// +++++++++++ Скрытие и открытие блока Регионы при клике +++++++++
const buttonRegion1 = document.querySelector('.regions_button');
const buttonRegionArrow = document.querySelector('.regions_button-arrow');
const blockRegion = document.querySelector('.regions');

buttonRegion1.addEventListener('click', function () {
  blockRegion.classList.toggle('visible-block');
  buttonRegionArrow.classList.toggle('rotate180');
});
