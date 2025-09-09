// +++++++++++ Скрытие и открытие блока Регионы при клике +++++++++
const buttonRegion1 = document.querySelector('.regions_button');
const buttonRegionArrow = document.querySelector('.regions_button-arrow');
const blockRegion = document.querySelector('.regions');

buttonRegion1.addEventListener('click', function () {
  blockRegion.classList.toggle('visible-block');
  buttonRegionArrow.classList.toggle('rotate180');
});

// +++++++++++ Cookie +++++++++
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkCookies() {
  let cookieNote = document.getElementById('cookie_notification');
  let cookieBtnAccept = cookieNote.querySelector('.cookie_accept');

  // Если куки cookies_policy нет или она просрочена, то показываем уведомление
  if (!getCookie('cookies_policy')) {
    // Показываем уведомление с задержкой 5 секунд
    setTimeout(function () {
      cookieNote.classList.add('show');
    }, 5000);
  }

  // При клике на кнопку устанавливаем куку cookies_policy на один год
  cookieBtnAccept.addEventListener('click', function () {
    setCookie('cookies_policy', 'true', 365);
    cookieNote.classList.remove('show');
  });
}

// Запускаем проверку при загрузке страницы
document.addEventListener('DOMContentLoaded', checkCookies);
