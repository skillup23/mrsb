// +++++++++++ Раскрывающийся список в меню +++++++++
const linkMenuDrop1 = document.querySelector('.box-menu-1');
const linkMenuDrop2 = document.querySelector('.box-menu-2');
const navArrow1 = document.querySelector('.header__nav-arroy1');
const navArrow2 = document.querySelector('.header__nav-arroy2');
const blockNav1 = document.querySelector('.header__drop-menu-1');
const blockNav2 = document.querySelector('.header__drop-menu-2');

linkMenuDrop1.addEventListener('click', function () {
  blockNav2.classList.remove('visible-block');
  navArrow2.classList.remove('rotate180');

  blockNav1.classList.toggle('visible-block');
  navArrow1.classList.toggle('rotate180');
});

linkMenuDrop2.addEventListener('click', function () {
  blockNav1.classList.remove('visible-block');
  navArrow1.classList.remove('rotate180');

  blockNav2.classList.toggle('visible-block');
  navArrow2.classList.toggle('rotate180');
});

// +++++++++++ Отправка формы обратной связи в Телеграмм +++++++++
document
  .getElementById('feedback-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    // Проверяем согласие на обработку данных
    const agree = document.getElementById('agree').checked;
    if (!agree) {
      alert('Необходимо согласиться с обработкой персональных данных');
      return;
    }

    // Получаем данные из формы
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Ваши данные для Telegram
    const token = '8175144022:AAE1jHGKF6E2KbRb1Q6SLktRtgEDJuwVy3Q'; // токен вашего бота
    const chatId = '-1002743614095'; // ID чата для получения сообщений

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
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          alert('Спасибо за обращение!');
          this.reset();
        } else {
          alert('Произошла ошибка при отправке');
        }
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке');
      });
  });

// +++++++++++ Скрытие и открытие блока Регионы при клике +++++++++
const buttonRegion = document.querySelector('.regions_button');
const buttonRegionArrow = document.querySelector('.regions_button-arrow');
const blockRegion = document.querySelector('.regions');

buttonRegion.addEventListener('click', function () {
  blockRegion.classList.toggle('visible-block');
  buttonRegionArrow.classList.toggle('rotate180');
});

// +++++++++++ Бегущие цифры +++++++++
// Функция для анимации числа с зяпятыми
// function animateNumber1(element, targetNumber, duration = 2000) {
//   const startNumber = 0;
//   const startTime = performance.now();

//   function updateNumber(currentTime) {
//     const elapsedTime = currentTime - startTime;
//     const progress = Math.min(elapsedTime / duration, 1);
//     const currentNumber = startNumber + (targetNumber - startNumber) * progress;

//     // Форматируем число и заменяем точку на span с запятой
//     const formattedNumber = formatNumberWithSmallComma(
//       currentNumber.toFixed(1)
//     );
//     element.innerHTML = formattedNumber;

//     if (progress < 1) {
//       requestAnimationFrame(updateNumber);
//     } else {
//       element.innerHTML = formatNumberWithSmallComma(targetNumber.toFixed(1));
//     }
//   }

//   // Функция для форматирования числа с маленькой запятой
//   function formatNumberWithSmallComma(numberString) {
//     return numberString.replace('.', '<span>,</span>');
//   }

//   requestAnimationFrame(updateNumber);
// }

// // Настройка Intersection Observer с зяпятыми
// const observer1 = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const numberElement = entry.target;
//         const targetNumber = parseFloat(
//           numberElement.getAttribute('data-target-number') || '8.4'
//         );

//         animateNumber1(numberElement, targetNumber);

//         // Отключаем observer после срабатывания
//         observer.unobserve(numberElement);
//       }
//     });
//   },
//   { threshold: 0.5 }
// ); // Срабатывает когда 50% элемента видно

// // Находим элемент с числом и начинаем наблюдать
// const numberElement1 = document.querySelector('.run-number-element1');
// const numberElement2 = document.querySelector('.run-number-element2');
// if (numberElement1) {
//   observer1.observe(numberElement1);
// }
// if (numberElement1) {
//   observer1.observe(numberElement2);
// }

// Анимации чисел с десятичным остатком
document.addEventListener('DOMContentLoaded', function () {
  // Функция для форматирования числа с запятой
  function formatNumberWithComma(number, decimals = 1) {
    // Форматируем число с нужным количеством десятичных знаков
    const fixedNumber = number.toFixed(decimals);
    // Заменяем точку на span с запятой и уменьшенным шрифтом
    return fixedNumber.replace('.', '<span>,</span>');
  }

  // Функция для анимации одного числа
  function animateNumber(element, targetNumber, duration = 1500) {
    const startNumber = 0;
    const startTime = performance.now();
    // Определяем количество десятичных знаков из data-атрибута или используем 1 по умолчанию
    const decimals = parseInt(element.getAttribute('data-decimals')) || 1;

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
            parseFloat(numberElement.getAttribute('data-target-number1')) || 0;

          animateNumber(numberElement, targetNumber);

          // Отключаем observer после срабатывания
          observer.unobserve(numberElement);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Находим все элементы с числами и начинаем наблюдение
  const numberElements = document.querySelectorAll('[data-target-number1]');
  numberElements.forEach((element) => {
    // Устанавливаем начальное значение 0
    element.innerHTML = formatNumberWithComma(
      0,
      parseInt(element.getAttribute('data-decimals')) || 1
    );
    // Начинаем наблюдение
    observer.observe(element);
  });
});

// Анимации целых чисел
document.addEventListener('DOMContentLoaded', function () {
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
            parseInt(numberElement.getAttribute('data-target-number2')) || 0;

          animateInteger2(numberElement, targetNumber);

          // Отключаем observer после срабатывания
          observer2.unobserve(numberElement);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Находим все элементы с числами и начинаем наблюдение
  const numberElements = document.querySelectorAll('[data-target-number2]');
  numberElements.forEach((element) => {
    // Устанавливаем начальное значение 0
    element.textContent = '0';
    // Начинаем наблюдение
    observer2.observe(element);
  });
});
