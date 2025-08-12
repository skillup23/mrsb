// +++++++++++ Скрытие и открытие блока Регионы при клике +++++++++
const buttonRegion = document.querySelector('.regions_button');
const buttonRegionArrow = document.querySelector('.regions_button-arrow');
const blockRegion = document.querySelector('.regions');

buttonRegion.addEventListener('click', function () {
  blockRegion.classList.toggle('visible-block');
  buttonRegionArrow.classList.toggle('rotate180');
});
