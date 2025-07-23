// initMap();

// async function initMap() {
//   // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
//   await ymaps3.ready;

//   // Импортируем необходимые компоненты
//   const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } =
//     ymaps3;
//   const { YMapDefaultMarker } = await ymaps3.import(
//     '@yandex/ymaps3-default-ui-theme'
//   );

//   // Создаем карту
//   const map = new YMap(
//     // Передаём ссылку на HTMLElement контейнера
//     document.getElementById('map'),

//     // Передаём параметры инициализации карты
//     {
//       location: {
//         center: [37.438376, 55.634714],
//         zoom: 16,
//       },
//     }
//   );

//   // Добавляем базовый слой карты
//   map.addChild(new YMapDefaultSchemeLayer());

//   // Добавляем стандартный маркер
//   const defaultMarker = new YMapDefaultMarker({
//     coordinates: [37.438376, 55.634714],
//     title: 'Стандартный маркер',
//     subtitle: 'Яндекс.Карты 3.0',
//     color: '#1e98ff',
//   });
//   map.addChild(defaultMarker);

//   // Добавляем кастомный маркер
//   const customMarkerElement = document.createElement('div');
//   customMarkerElement.className = 'custom-marker';
//   customMarkerElement.textContent = 'A';

//   const customMarker = new YMapMarker(
//     {
//       coordinates: [37.440376, 55.634714],
//       draggable: true,
//     },
//     customMarkerElement
//   );
//   map.addChild(customMarker);
// }

window.map = null;

// Главная функция, вызывается при запуске скрипта
main();
async function main() {
  // ожидание загрузки модулей
  await ymaps3.ready;
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapMarker,
  } = ymaps3;

  // Импорт модулей для элементов управления на карте
  const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import(
    '@yandex/ymaps3-controls@0.0.1'
  );

  // Координаты центра карты
  const CENTER_COORDINATES = [37.438376, 55.634714];
  // координаты метки на карте
  const MARKER_COORDINATES = [37.438376, 55.634714];

  // Объект с параметрами центра и зумом карты
  const LOCATION = { center: CENTER_COORDINATES, zoom: 17 };

  // Создание объекта карты
  map = new YMap(document.getElementById('map'), { location: LOCATION });

  // Добавление слоев на карту
  map.addChild((scheme = new YMapDefaultSchemeLayer()));
  map.addChild(new YMapDefaultFeaturesLayer());

  // Добавление элементов управления на карту
  map.addChild(
    new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({}))
  );
  map.addChild(
    new YMapControls({ position: 'top right' }).addChild(
      new YMapGeolocationControl({})
    )
  );

  // Создание маркера
  const el = document.createElement('img');
  el.className = 'my-marker';
  el.src = '/assets/files/marker-map.png';
  el.title = 'Маркер';
  // При клике на маркер меняем центр карты на LOCATION с заданным duration
  el.onclick = () => map.update({ location: { ...LOCATION, duration: 400 } });

  // Создание заголовка маркера
  const markerTitle = document.createElement('div');
  markerTitle.className = 'marker-title';
  //   markerTitle.innerHTML = 'Заголовок маркера';

  // Контейнер для элементов маркера
  const imgContainer = document.createElement('div');
  imgContainer.appendChild(el);
  imgContainer.appendChild(markerTitle);

  // Добавление центра карты
  map.addChild(new YMapMarker({ coordinates: CENTER_COORDINATES }));

  // Добавление маркера на карту
  map.addChild(
    new YMapMarker({ coordinates: MARKER_COORDINATES }, imgContainer)
  );
}
