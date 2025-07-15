document.addEventListener("DOMContentLoaded", () => {
  // Функция для импорта SVG
  async function importSVG() {
    try {
      const response = await fetch("assets/files/mapRu.svg");
      const svgString = await response.text();

      // Вставляем SVG в контейнер
      const svgContainer = document.getElementById("svg-container");
      svgContainer.innerHTML = svgString;

      // Добавляем интерактивность после загрузки
      addInteractivity();
    } catch (error) {
      console.error("Ошибка загрузки SVG:", error);
    }
  }

  // Логика взаимодействия
  function addInteractivity() {
    const regions = document.querySelectorAll(".regions path");
    const tooltip = document.querySelector(".tooltip");

    regions.forEach((region) => {
      region.addEventListener("mouseover", (e) => {
        const regionName = e.target.id; // Ваша функция получения названия

        tooltip.style.display = "block";
        tooltip.querySelector(".tooltip-content").textContent = regionName;

        // Позиционирование подсказки
        const rect = e.target.getBoundingClientRect();
        const x = rect.left + window.scrollX + rect.width / 2;
        const y = rect.top + window.scrollY + rect.height / 2;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      });

      region.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
      });
    });

    // regions.forEach((region) => {
    //   region.addEventListener("mouseover", (e) => {
    //     // e.target.style.fill = "#4CAF50";
    //     e.target.classList.add("region-hover");
    //   });

    //   region.addEventListener("mouseout", (e) => {
    //     //   e.target.style.fill = "#ccc";
    //     e.target.classList.remove("region-hover");
    //   });

    //   region.addEventListener("click", (e) => {
    //     // Ваша логика при клике
    //     console.log(`Нажата область: ${e.target.id}`);
    //   });
    // });
  }

  // Запускаем импорт
  importSVG();
});
