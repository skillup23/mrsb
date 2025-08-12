const dialogElement = document.querySelector('.servises-dialog');
const dialogOpener = document.querySelector('.servises_button-feedback');
const dialogClose = document.querySelector('.popup-close');

// Открытие модального окна
dialogOpener.addEventListener('click', openModalAndLockScroll);
dialogClose.addEventListener('click', closeModalAndReturnScroll);

function openModalAndLockScroll() {
  dialogElement.showModal();
  document.body.classList.add('scroll-lock');
}

function closeModalAndReturnScroll() {
  dialogElement.close();
  document.body.classList.remove('scroll-lock');
}

// Закрытие модального окна
dialogElement.addEventListener('click', closeOnBackDropClick);

function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;
  if (isClickedOnBackDrop) {
    dialogElement.close();
    document.body.classList.remove('scroll-lock');
  }
}
