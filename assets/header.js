function loadAndInitHeader() {
  const headerPlaceholder = document.getElementById('header');
  if (!headerPlaceholder) return;

  fetch('header.html')
    .then((response) => response.text())
    .then((html) => {
      headerPlaceholder.innerHTML = html;
      executeHeaderScripts();
    });
}

function executeHeaderScripts() {
  const scripts = document.getElementById('header').querySelectorAll('script');

  scripts.forEach((script) => {
    const newScript = document.createElement('script');
    if (script.src) {
      newScript.src = script.src;
      document.head.appendChild(newScript);
    } else {
      newScript.textContent = script.textContent;
      document.body.appendChild(newScript).remove();
    }
  });
}

// Запускаем когда DOM готов
document.addEventListener('readystatechange', () => {
  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    loadAndInitHeader();
  }
});

// const linkMenuDrop1 = document.querySelector(".box-menu-1");
// const linkMenuDrop2 = document.querySelector(".box-menu-2");
// const navArrow1 = document.querySelector(".header__nav-arroy1");
// const navArrow2 = document.querySelector(".header__nav-arroy2");
// const blockNav1 = document.querySelector(".header__drop-menu-1");
// const blockNav2 = document.querySelector(".header__drop-menu-2");

// linkMenuDrop1.addEventListener("click", function () {
//   blockNav2.classList.remove("visible-block");
//   navArrow2.classList.remove("rotate180");

//   blockNav1.classList.toggle("visible-block");
//   navArrow1.classList.toggle("rotate180");
// });

// linkMenuDrop2.addEventListener("click", function () {
//   blockNav1.classList.remove("visible-block");
//   navArrow1.classList.remove("rotate180");

//   blockNav2.classList.toggle("visible-block");
//   navArrow2.classList.toggle("rotate180");
// });

// // Обработчик клика по ссылке в меню
// document.querySelectorAll(".header__drop-wrap a").forEach((link) => {
//   link.addEventListener("click", function () {
//     this.closest(".header__drop-menu").classList.remove("visible-block");
//   });
// });

// // Закрыть меню при клике вне его
// document.addEventListener("click", function (event) {
//   // Проверяем, был ли клик вне кнопки меню
//   if (!linkMenuDrop1.contains(event.target)) {
//     blockNav1.classList.remove("visible-block");
//     navArrow1.classList.remove("rotate180");
//   }
//   if (!linkMenuDrop2.contains(event.target)) {
//     blockNav2.classList.remove("visible-block");
//     navArrow2.classList.remove("rotate180");
//   }
// });
