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

// ++++++++++++++++++++ Карусель партнеры ++++++++++++++++++++++

document.addEventListener('DOMContentLoaded', function () {
  const logosContainer = document.getElementById('logosContainer');
  const logosTrack = document.getElementById('logosTrack');
  const logos = Array.from(document.querySelectorAll('.partners_logo'));

  const logoWidth = logos[0].offsetWidth + 32; // ширина логотипа + margin
  const visibleLogos = 5;
  let speed = 2;

  // Клонируем логотипы для бесконечной анимации
  function cloneLogos() {
    // Клонируем все логотипы для плавного перехода
    const clones = logos.map((logo) => logo.cloneNode(true));
    clones.forEach((clone) => logosTrack.appendChild(clone));
  }

  cloneLogos();

  let animationId;
  let position = 0;
  let isDragging = false;
  let startX;
  let startPosition;

  // Автоматическая прокрутка
  function autoScroll() {
    position -= speed;

    // Если прошли половину длины - перескакиваем в начало
    if (position <= -logos.length * logoWidth) {
      position = 0;
    }

    updatePosition();
    animationId = requestAnimationFrame(autoScroll);
  }

  // Обновление позиции
  function updatePosition() {
    logosTrack.style.transform = `translateX(${position}px)`;
  }

  // Обработчики для перетаскивания
  logosContainer.addEventListener('mousedown', startDrag);
  logosContainer.addEventListener('touchstart', startDrag, { passive: false });

  function startDrag(e) {
    isDragging = true;
    cancelAnimationFrame(animationId);

    startX = e.clientX || e.touches[0].clientX;
    startPosition = position;

    logosContainer.style.cursor = 'grabbing';

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;

    const x = e.clientX || e.touches[0].clientX;
    const diff = x - startX;
    position = startPosition + diff;

    updatePosition();

    e.preventDefault();
  }

  function endDrag() {
    isDragging = false;
    logosContainer.style.cursor = 'grab';

    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);

    // Продолжаем анимацию после перетаскивания
    autoScroll();
  }

  // Инициализация
  updatePosition();
  autoScroll(); // Запускаем автоматическую прокрутку
});
