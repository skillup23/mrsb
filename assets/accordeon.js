// +++++++++++ Аккордеон +++++++++
document.addEventListener('DOMContentLoaded', () => {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach((header) => {
    header.addEventListener('click', function () {
      // Удаляем активный класс у всех заголовков
      headers.forEach((h) => h.classList.remove('active'));

      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.classList.remove('active');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        this.classList.add('active');
      }
    });
  });
});
