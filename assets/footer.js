// Загрузка footer
fetch('footer.html')
  .then((response) => response.text())
  .then((data) => {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      footerContainer.innerHTML = data;

      // Обновляем год сразу после вставки HTML в DOM
      const yearEl = footerContainer.querySelector('#copyright-year');
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
    }
  })
  .catch((error) => console.error('Ошибка загрузки footer:', error));
