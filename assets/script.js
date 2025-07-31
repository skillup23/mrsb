// +++++++++++ Раскрывающийся список в меню +++++++++
// Слушатель по всему документу
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".header__drop-link");
  const dropdownButtons = document.querySelectorAll(".header__nav-link");
  const dropdownLinks = document.querySelectorAll(".header__drop-wrap a");
  const navArrow = document.querySelector(".header__nav-arroy");

  // Закрыть все выпадающие меню кроме текущего
  function closestAllDropMenu(exceptThis) {
    dropdowns.forEach((dropdown) => {
      if (dropdown !== exceptThis) {
        dropdown
          .querySelector(".header__drop-menu")
          .classList.remove("visible-block");

        //Найти стрелку для переворота в родительском компоненте
        const arrowParent = dropdown.closest(".header__drop-link");
        arrowParent
          .querySelector(".header__nav-arroy")
          .classList.remove("rotate180");
      }
    });
  }

  // Обработчик клика по кнопке меню
  dropdownButtons.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const parentDropdown = this.parentElement;

      closestAllDropMenu(parentDropdown);

      parentDropdown
        .querySelector(".header__drop-menu")
        .classList.toggle("visible-block");

      parentDropdown
        .querySelector(".header__nav-arroy")
        .classList.toggle("rotate180");
    });
  });

  // Обработчик клика по ссылке в меню
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // this.closest(".header__drop-menu").classList.remove("visible-block");
      closestAllDropMenu(null);
    });
  });

  // Закрыть меню при клике вне его
  document.addEventListener("click", function () {
    closestAllDropMenu(null);
  });

  // Предотвратить закрытие при клике внутри меню
  document.querySelectorAll(".header__drop-menu").forEach((content) => {
    content.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
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

// +++++++++++ Отправка формы обратной связи в Телеграмм +++++++++
document
  .getElementById("feedback-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Проверяем согласие на обработку данных
    const agree = document.getElementById("agree").checked;
    if (!agree) {
      alert("Необходимо согласиться с обработкой персональных данных");
      return;
    }

    // Получаем данные из формы
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Ваши данные для Telegram
    const token = "8175144022:AAE1jHGKF6E2KbRb1Q6SLktRtgEDJuwVy3Q"; // токен вашего бота
    const chatId = "-1002743614095"; // ID чата для получения сообщений

    // Формируем текст сообщения
    const text = `Новая заявка:
Имя: ${name}
Телефон: ${phone}
Сообщение: ${message}
Согласие на обработку ПД: Да`;

    // URL для отправки сообщения
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${encodeURIComponent(
      text
    )}`;

    // Отправляем запрос
    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          alert("Спасибо за обращение!");
          this.reset();
        } else {
          alert("Произошла ошибка при отправке");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при отправке");
      });
  });

// +++++++++++ Скрытие и открытие блока Регионы при клике +++++++++
const buttonRegion = document.querySelector(".regions_button");
const buttonRegionArrow = document.querySelector(".regions_button-arrow");
const blockRegion = document.querySelector(".regions");

buttonRegion.addEventListener("click", function () {
  blockRegion.classList.toggle("visible-block");
  buttonRegionArrow.classList.toggle("rotate180");
});

// +++++++++++++++++++++ Бегущие цифры ++++++++++++++++++++++

// Анимации чисел с десятичным остатком
document.addEventListener("DOMContentLoaded", function () {
  // Функция для форматирования числа с запятой
  function formatNumberWithComma(number, decimals = 1) {
    // Форматируем число с нужным количеством десятичных знаков
    const fixedNumber = number.toFixed(decimals);
    // Заменяем точку на span с запятой и уменьшенным шрифтом
    return fixedNumber.replace(".", "<span>,</span>");
  }

  // Функция для анимации одного числа
  function animateNumber(element, targetNumber, duration = 1500) {
    const startNumber = 0;
    const startTime = performance.now();
    // Определяем количество десятичных знаков из data-атрибута или используем 1 по умолчанию
    const decimals = parseInt(element.getAttribute("data-decimals")) || 1;

    function updateNumber(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentNumber =
        startNumber + (targetNumber - startNumber) * progress;

      // Форматируем число с запятой
      element.innerHTML = formatNumberWithComma(currentNumber, decimals);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.innerHTML = formatNumberWithComma(targetNumber, decimals);
      }
    }

    requestAnimationFrame(updateNumber);
  }

  // Настройка Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numberElement = entry.target;
          const targetNumber =
            parseFloat(numberElement.getAttribute("data-target-number1")) || 0;

          animateNumber(numberElement, targetNumber);

          // Отключаем observer после срабатывания
          observer.unobserve(numberElement);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Находим все элементы с числами и начинаем наблюдение
  const numberElements = document.querySelectorAll("[data-target-number1]");
  numberElements.forEach((element) => {
    // Устанавливаем начальное значение 0
    element.innerHTML = formatNumberWithComma(
      0,
      parseInt(element.getAttribute("data-decimals")) || 1
    );
    // Начинаем наблюдение
    observer.observe(element);
  });
});

// Анимации целых чисел
document.addEventListener("DOMContentLoaded", function () {
  // Функция для анимации одного числа
  function animateInteger2(element, targetNumber, duration = 1500) {
    const startNumber = 0;
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentNumber = Math.floor(
        startNumber + (targetNumber - startNumber) * progress
      );

      element.textContent = currentNumber.toLocaleString(); // Добавляем разделители тысяч

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = targetNumber.toLocaleString();
      }
    }

    requestAnimationFrame(updateNumber);
  }

  // Настройка Intersection Observer
  const observer2 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numberElement = entry.target;
          const targetNumber =
            parseInt(numberElement.getAttribute("data-target-number2")) || 0;

          animateInteger2(numberElement, targetNumber);

          // Отключаем observer после срабатывания
          observer2.unobserve(numberElement);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Находим все элементы с числами и начинаем наблюдение
  const numberElements = document.querySelectorAll("[data-target-number2]");
  numberElements.forEach((element) => {
    // Устанавливаем начальное значение 0
    element.textContent = "0";
    // Начинаем наблюдение
    observer2.observe(element);
  });
});
