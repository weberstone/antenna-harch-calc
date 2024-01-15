//Темизация
document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch')

  // Функция для сохранения выбранной темы в localStorage
  function saveThemePreference(isDarkTheme) {
    localStorage.setItem('isDarkThemeEnabled', JSON.stringify(isDarkTheme))
  }

  // Функция для установки темы на основе предпочтений пользователя
  function applyThemeFromPreferences() {
    const storedValue = localStorage.getItem('isDarkThemeEnabled')
    const isDarkThemeEnabled = storedValue !== null ? JSON.parse(storedValue) : prefersDarkTheme()

    if (isDarkThemeEnabled) {
      document.documentElement.classList.add('dark')
      modeSwitch.classList.add('active')
    } else {
      document.documentElement.classList.remove('dark')
      modeSwitch.classList.remove('active')
    }
  }

  // Функция для определения предпочтительной темы браузера
  function prefersDarkTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Сохранение текущих предпочтений пользователя в localStorage
  modeSwitch.addEventListener('click', function () {
    const isDarkThemeEnabled = document.documentElement.classList.toggle('dark')
    modeSwitch.classList.toggle('active')
    saveThemePreference(isDarkThemeEnabled)
  })

  // Применение темы на основе предпочтений при загрузке страницы
  applyThemeFromPreferences()
})


//цепляем модалку на кнопку
const openModalButton = document.getElementById('openModalButton')
function checkScreenWidth() {
    if (window.innerWidth >= 992) {
        openModalButton.removeAttribute('data-bs-toggle')
        openModalButton.removeAttribute('data-bs-target')
    }
}
window.addEventListener('load', checkScreenWidth)
window.addEventListener('resize', checkScreenWidth)

//делаем слайд-панель
const panel = document.querySelector('.panel')
const toggleButton = document.querySelector('.toggle-btn')
const toggleButtonHead = document.querySelector('.toggle-btn-head')
const closeBtn = document.querySelector('.close-panel-btn')
const moreBtnPanel = document.getElementById('moreBtnPanel')

toggleButton.addEventListener('click', function() {
    panel.classList.toggle('open')
    document.body.classList.toggle('no-scroll')
  })
  toggleButtonHead.addEventListener('click', function() {
    panel.classList.toggle('open')
    document.body.classList.toggle('no-scroll')
  })
  moreBtnPanel.addEventListener('click', function() {
    panel.classList.toggle('open')
    document.body.classList.toggle('no-scroll')
  })
closeBtn.addEventListener('click', function() {
    panel.classList.remove('open')
    document.body.classList.remove('no-scroll')
  })