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
