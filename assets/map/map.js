// document.addEventListener("DOMContentLoaded", () => {
//   // Функция для импорта SVG
//   async function importSVG() {
//     try {
//       const response = await fetch("assets/files/mapRu.svg");
//       const svgString = await response.text();

//       // Вставляем SVG в контейнер
//       const svgContainer = document.getElementById("svg-container");
//       svgContainer.innerHTML = svgString;

//       // Добавляем интерактивность после загрузки
//       addInteractivity();
//     } catch (error) {
//       console.error("Ошибка загрузки SVG:", error);
//     }
//   }

//   // Логика взаимодействия
//   function addInteractivity() {
//     const regions = document.querySelectorAll(".regions path");
//     const tooltip = document.querySelector(".tooltip");

//     regions.forEach((region) => {
//       region.addEventListener("mouseover", (e) => {
//         const regionName = e.target.id; // Ваша функция получения названия

//         tooltip.style.display = "block";
//         tooltip.querySelector(".tooltip-content").textContent = regionName;

//         // Позиционирование подсказки
//         const rect = e.target.getBoundingClientRect();
//         const x = rect.left + window.scrollX + rect.width / 2;
//         const y = rect.top + window.scrollY + rect.height / 2;

//         tooltip.style.left = `${x}px`;
//         tooltip.style.top = `${y}px`;
//       });

//       region.addEventListener("mouseout", () => {
//         tooltip.style.display = "none";
//       });
//     });

//     // regions.forEach((region) => {
//     //   region.addEventListener("mouseover", (e) => {
//     //     // e.target.style.fill = "#4CAF50";
//     //     e.target.classList.add("region-hover");
//     //   });

//     //   region.addEventListener("mouseout", (e) => {
//     //     //   e.target.style.fill = "#ccc";
//     //     e.target.classList.remove("region-hover");
//     //   });

//     //   region.addEventListener("click", (e) => {
//     //     // Ваша логика при клике
//     //     console.log(`Нажата область: ${e.target.id}`);
//     //   });
//     // });
//   }

//   // Запускаем импорт
//   importSVG();
// });

// ++++++++++++++++++++ Карусель партнеры ++++++++++++++++++++++

// document.addEventListener('DOMContentLoaded', function () {
//   const logosContainer = document.getElementById('logosContainer');
//   const logosTrack = document.getElementById('logosTrack');
//   const logos = Array.from(document.querySelectorAll('.partners_logo'));

//   const logoWidth = logos[0].offsetWidth + 32; // ширина логотипа + margin
//   const visibleLogos = 5;
//   let speed = 2;

//   // Клонируем логотипы для бесконечной анимации
//   function cloneLogos() {
//     // Клонируем все логотипы для плавного перехода
//     const clones = logos.map((logo) => logo.cloneNode(true));
//     clones.forEach((clone) => logosTrack.appendChild(clone));
//   }

//   cloneLogos();

//   let animationId;
//   let position = 0;
//   let isDragging = false;
//   let startX;
//   let startPosition;

//   // Автоматическая прокрутка
//   function autoScroll() {
//     position -= speed;

//     // Если прошли половину длины - перескакиваем в начало
//     if (position <= -logos.length * logoWidth) {
//       position = 0;
//     }

//     updatePosition();
//     animationId = requestAnimationFrame(autoScroll);
//   }

//   // Обновление позиции
//   function updatePosition() {
//     logosTrack.style.transform = `translateX(${position}px)`;
//   }

//   // Обработчики для перетаскивания
//   logosContainer.addEventListener('mousedown', startDrag);
//   logosContainer.addEventListener('touchstart', startDrag, { passive: false });

//   function startDrag(e) {
//     isDragging = true;
//     cancelAnimationFrame(animationId);

//     startX = e.clientX || e.touches[0].clientX;
//     startPosition = position;

//     logosContainer.style.cursor = 'grabbing';

//     document.addEventListener('mousemove', drag);
//     document.addEventListener('touchmove', drag, { passive: false });
//     document.addEventListener('mouseup', endDrag);
//     document.addEventListener('touchend', endDrag);

//     e.preventDefault();
//   }

//   function drag(e) {
//     if (!isDragging) return;

//     const x = e.clientX || e.touches[0].clientX;
//     const diff = x - startX;
//     position = startPosition + diff;

//     updatePosition();

//     e.preventDefault();
//   }

//   function endDrag() {
//     isDragging = false;
//     logosContainer.style.cursor = 'grab';

//     document.removeEventListener('mousemove', drag);
//     document.removeEventListener('touchmove', drag);
//     document.removeEventListener('mouseup', endDrag);
//     document.removeEventListener('touchend', endDrag);

//     // Продолжаем анимацию после перетаскивания
//     autoScroll();
//   }

//   // Инициализация
//   updatePosition();
//   autoScroll(); // Запускаем автоматическую прокрутку
// });
