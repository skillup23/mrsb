// +++++++++++++++++++++ Бегущие цифры ++++++++++++++++++++++

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
