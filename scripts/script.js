const setLimitCounHistory = 8 // Количество выводимых карточек в краткой истории
const $toastTxt = document.getElementById('toastTxt')

// Делаю функцию которая будет формировать список из локального хранилища и обновлять его
function updateListHistory(data, limitCount, idElementOut) {
    const $cardResultList = document.getElementById(idElementOut) // определяем куда будем все ложить

    // Очищаем если на странице уже что-то есть
    if ($cardResultList && $cardResultList.childElementCount > 0) {
        $cardResultList.innerHTML = '' // Очистка содержимого элемента
      }

    //Делаю копию чтоб внести некоторые изменения
    let copyResultsArrayNow = [...data].reverse()
   
    copyResultsArrayNow.forEach((item) => {
    if (item.selectedValueLambdaItem === 1) {
      item.selectedValueLambdaItem = 'λ1'
     }
     if (item.selectedValueLambdaItem === 2) {
        item.selectedValueLambdaItem = 'λ1/2'
       }
       if (item.selectedValueLambdaItem === 4) {
        item.selectedValueLambdaItem = 'λ1/4'
       }
    })

    // Цикл из массива для краткого списка истории
    
    let count = 0
    const $moreBtn = document.getElementById('moreBtn')
    const $removeHistoryAll = document.getElementById('removeHistoryAll')

    //Если нет ничего в истории то говорю
    if (Array.isArray(copyResultsArrayNow) && copyResultsArrayNow.length === 0) {
        $cardResultList.innerHTML = `
        <div class="empty-result"> История расчетов пока отсутствует ;( </div>
        `
        $removeHistoryAll.style.display = 'none'
        $moreBtn.style.display = 'none'
    
    } else{   $cardResultList.innerHTML = ``
              $removeHistoryAll.style.display = 'block'
    }

    //Если есть то формирую выдачу
    if (copyResultsArrayNow.length > limitCount ) {
        $moreBtn.style.display = 'block'
    } 
    
    copyResultsArrayNow.forEach((historyCard, index) => {
        if (count < limitCount) {
            const $cardResultItem = document.createElement("div")
            $cardResultItem.classList.add("card-result-item")
            $cardResultItem.setAttribute("data-id", index)
            $cardResultItem.innerHTML = `
            <div class="data-card">
                <div class="card-result-head" id="cardResultItemHead">Для ${historyCard.frequencyItem} МГц (${historyCard.selectedValueLambdaItem} )</div>
                <div class="card-result-second" id="cardResultItemSecond">${historyCard.dateItem}</div>
            </div>
            <svg class="arrow-left-card" width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
             <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path>
            </svg>
            `
            // Добавляем карточку в контейнер
            $cardResultList.appendChild($cardResultItem)
            count++
            
            $cardResultItem.addEventListener("click", () => {
                const $clickHistoryResultModal = new bootstrap.Modal(document.getElementById('clickHistoryResultModal'))
                $clickHistoryResultModal.show()
                const $clickHistoryResultModalBody = document.getElementById('clickHistoryResultModalBody')
                $clickHistoryResultModalBody.innerHTML = `
                <div class="modal-header">
                    <h5 id="freqNumResultMob" class="modal-title" id="exampleModalLabel">Время расчета: ${historyCard.dateItem}</h5>
                    <button type="button" class="round-light-btn" style="margin-bottom: 0px;" data-bs-dismiss="modal" aria-label="Закрыть"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                </div>
                <div class="modal-body">
                <div class="svg-antenna-modal-bg">
                    <div class="svg-antenna-modal">
                        <svg width="227" height="108" viewBox="0 0 227 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M58.425 6.2788L7.88489 51.0045C6.08605 52.5964 6.08604 55.4036 7.88489 56.9955L58.4249 101.721C59.9057 103.032 62.1217 103.063 63.6395 101.796L109.961 63.1201C111.434 61.8898 113.574 61.8797 115.059 63.096L162.388 101.861C163.897 103.096 166.076 103.064 167.548 101.785L219.029 57.0184C220.863 55.4239 220.863 52.5761 219.029 50.9816L167.548 6.21524C166.076 4.9358 163.897 4.90366 162.388 6.13914L115.059 44.904C113.574 46.1203 111.434 46.1102 109.961 44.8799L63.6395 6.20384C62.1217 4.93656 59.9057 4.96841 58.425 6.2788Z" stroke="white" stroke-width="4"/>
                            <rect x="24" y="19" width="18" height="20" rx="4" fill="white"/>
                            <path d="M27.8154 34L31.5957 23.999H33.7969L37.6455 34H35.3896L32.8262 26.959C32.7715 26.8086 32.7282 26.6628 32.6963 26.5215C32.6644 26.3802 32.6348 26.2367 32.6074 26.0908H32.5459C32.5231 26.2367 32.4935 26.3802 32.457 26.5215C32.4251 26.6628 32.3818 26.8086 32.3271 26.959L29.7637 34H27.8154ZM29.9619 31.8057L30.4473 30.2471H34.8428L35.3281 31.8057H29.9619Z" fill="black"/>
                            <rect x="77" y="72" width="18" height="20" rx="4" fill="white"/>
                            <path d="M82.0596 87V77.0469H85.7715C86.8743 77.0469 87.7402 77.2611 88.3691 77.6895C88.998 78.1133 89.3125 78.7764 89.3125 79.6787C89.3125 80.2256 89.1849 80.6745 88.9297 81.0254C88.679 81.3763 88.3691 81.6178 88 81.75V81.7773C88.4557 81.9095 88.8317 82.1738 89.1279 82.5703C89.4287 82.9668 89.5791 83.4863 89.5791 84.1289C89.5791 85.0404 89.2464 85.7467 88.5811 86.248C87.9202 86.7493 87.0498 87 85.9697 87H82.0596ZM84.1377 85.5166H85.9219C86.4642 85.5166 86.8607 85.3822 87.1113 85.1133C87.3665 84.8444 87.4941 84.4798 87.4941 84.0195C87.4941 83.5638 87.3665 83.2038 87.1113 82.9395C86.8607 82.6706 86.4642 82.5361 85.9219 82.5361H84.1377V85.5166ZM84.1377 81.1348H85.7305C86.2637 81.1348 86.6488 81.0208 86.8857 80.793C87.1227 80.5605 87.2412 80.2393 87.2412 79.8291C87.2412 79.4144 87.1227 79.0954 86.8857 78.8721C86.6488 78.6488 86.2637 78.5371 85.7305 78.5371H84.1377V81.1348Z" fill="black"/>
                            <rect x="138" y="43" width="18" height="20" rx="4" fill="white"/>
                            <path d="M142.684 53.3311V52.709C142.684 51.1185 143.094 49.9108 143.914 49.0859C144.734 48.2565 145.805 47.8418 147.127 47.8418C148.38 47.8418 149.374 48.1699 150.107 48.8262C150.841 49.4824 151.208 50.3232 151.208 51.3486V51.5127H149.096V51.3213C149.096 50.7243 148.932 50.264 148.604 49.9404C148.275 49.6169 147.776 49.4551 147.106 49.4551C146.427 49.4551 145.878 49.6898 145.459 50.1592C145.044 50.6286 144.837 51.4033 144.837 52.4834V53.5566C144.837 54.5592 145.04 55.3158 145.445 55.8262C145.855 56.3366 146.418 56.5918 147.134 56.5918C147.772 56.5918 148.248 56.4209 148.562 56.0791C148.882 55.7327 149.057 55.277 149.089 54.7119L149.096 54.5342H151.208V54.7119C151.162 55.7236 150.784 56.5576 150.073 57.2139C149.362 57.8701 148.38 58.1982 147.127 58.1982C145.801 58.1982 144.728 57.7812 143.907 56.9473C143.091 56.1133 142.684 54.9079 142.684 53.3311Z" fill="black"/>
                            <path d="M129 47L126.113 52H131.887L129 47ZM129 59L131.887 54H126.113L129 59ZM121 46H130V45H121V46ZM121 61H130V60H121V61ZM128.5 51.5V54.5H129.5L129.5 51.5H128.5Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                    <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                            Расчет для частоты
                            <span>${copyResultsArrayNow[index].frequencyItem} МГц (${copyResultsArrayNow[index].selectedValueLambdaItem})</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Длинная сторона рамки (A)
                            <span>${copyResultsArrayNow[index].longFrameItem} мм</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Короткая сторона рамки (B)
                            <span>${copyResultsArrayNow[index].shortFrameItem} мм</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                             Между точк. крепл. каблеля (C)
                            <span>${copyResultsArrayNow[index].pointDistanceValueItem} мм</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Длина волны
                            <span>${copyResultsArrayNow[index].frequencyValueItem} мм</span>
                        </li>
                    
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Длина прута
                            <span>${copyResultsArrayNow[index].provolkaItem} мм</span>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" onclick="deleteOneCardHistory(${index})" data-bs-dismiss="modal" class="btn btn-outline-secondary">Удалить с истории</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                </div>
                `
            })
        } 
  })
}

let resultsArrayNow = JSON.parse(localStorage.getItem('harchenkoAntennaKey')) // Забираю данные с локального хранилища

// Проверяю чего там в этой переменной пришло. Если ничего не пришло и значение нал то создаю пустую
if (resultsArrayNow === null) {
    resultsArrayNow = []
}

updateListHistory(resultsArrayNow, setLimitCounHistory, 'cardResultList') // Выполняю функцию формирования результатов из хранилища
updateListHistory(resultsArrayNow, Infinity, 'resultsListFull') // Вывожу полный список в блок с другим ID

//Массив со списком вариантов подсчетов для сeлектора
const lambdaSelectorArray = [
    {text: 'Целая волна λ1', value: '1'},
    {text: 'Половина волны λ1/2', value: '2'},
    {text: 'Четверть волны λ1/4', value: '4'}
]
const selectElement = document.getElementById("waveLengthSelector"); //Получаю айди селектора в который нужно записать список

//Через цикл формирую списко из массива и отправляю в дом
for (let i = 0; i < lambdaSelectorArray.length; i++) {
    const option = document.createElement("option");
    option.text = lambdaSelectorArray[i].text
    option.value = lambdaSelectorArray[i].value
    selectElement.appendChild(option)
}

//Идем считать
function calculate() {
    //вылидация
    const frequencyInput = document.getElementById('frequency')
    const pointDistancInput = document.getElementById('pointDistance') //Получаю значение из поля дистанции между точками
    
    // Валидация для частоты
    let isValid = true
    function validFreq() {
        if (!isNaN(parseFloat(frequencyInput.value)) 
            && parseFloat(frequencyInput.value) > 0
            ) {
            console.log('Частота введена числом и больше нуля. Все ок')
            frequencyInput.classList.remove('is-invalid')
        } else {
            console.log('Частота введена плохо. Выключите компьютер и бросайте это дело')
            frequencyInput.classList.add('is-invalid')
            isValid = false
        }
    } validFreq()

    //Валидация для расстояния между точками
    function validPoint() {
        if (!isNaN(parseFloat(pointDistancInput.value)) 
            && parseFloat(pointDistancInput.value) > 0
            ) {
            console.log('Расстояние между точками крепления число и больше нуля. Все ок')
            pointDistancInput.classList.remove('is-invalid')
        } else {
            console.log('Расстояние межту точками некорректно. Выключите компьютер и бросайте это дело')
            pointDistancInput.classList.add('is-invalid')
            isValid = false
        }
    }validPoint()

    if (isValid === true) {
        console.log(' Валидно')
        if (window.innerWidth < 992) {
            new bootstrap.Modal(document.getElementById('resultMobileModal')).show();
        }
    } else{
        console.log(' Не валидно')
        
        //Показываю уведомление
        const toastElement = document.querySelector('.toast')
        $toastTxt.textContent = 'Введены некорректные значения'
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
        return
    }
    // End Validation

    const selectedValueLambda = parseFloat(selectElement.value) // Присваиваю выбранное значение  селектора отдельной переменной
    const frequencyValue = 300000 / parseFloat(document.getElementById('frequency').value) //Получаю значение с поля и сразу считаю длину волны
    const pointDistanceValue = document.getElementById('pointDistance').value //Получаю значение из поля дистанции между точками

    function longFrame() {
        if (selectedValueLambda === 1) {
            return frequencyValue / 4
        }
        if (selectedValueLambda === 2) {
            return (frequencyValue / selectedValueLambda) / 4
        }
        if (selectedValueLambda === 4) {
            return (frequencyValue / selectedValueLambda) / 4
        }
    }

    const shortFrame = longFrame() - (pointDistanceValue / 2 * Math.sqrt(2))
    const provolka = (longFrame() + shortFrame) * 4

    console.log('Раччтояние между точками крепления кабеля - ' + pointDistanceValue)
    console.log('Расчет для длины волны - ' + selectedValueLambda)
    console.log('Длинная сторонеа рамки - ' + longFrame())
    console.log('Короткая сторонеа рамки - ' + shortFrame)
    console.log('Общая длина прута без учета изгибов - ' + provolka)
    console.log('Длина волны - '+ frequencyValue)

    //Записываем в LocalStorage
    //УЗНАЕМ ДАТУ и время
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${day}.${month}.${year} ${hours}:${minutes}`
    }
      
    // Получение текущей даты и времени
    const currentDate = new Date()
      
    //Форматирование даты и времени
    const formattedDateTime = formatDate(currentDate)
     
    // Создаем объект с результатом
    let harchenkoAntennaBase = {
        frequencyItem: parseFloat(document.getElementById('frequency').value),
        selectedValueLambdaItem: selectedValueLambda,
        longFrameItem: Math.round(longFrame()),
        shortFrameItem: Math.round(shortFrame),
        pointDistanceValueItem: pointDistanceValue,
        provolkaItem: Math.round(provolka),
        frequencyValueItem: Math.round(frequencyValue),
        dateItem: formattedDateTime
    }

    resultsArrayNow.push(harchenkoAntennaBase) // Пихаю обьект в массив
    localStorage.setItem('harchenkoAntennaKey', JSON.stringify(resultsArrayNow)) // Фигачу обрато в хранилище

    updateListHistory(resultsArrayNow, setLimitCounHistory, 'cardResultList') // Обновляю таблоицу
    updateListHistory(resultsArrayNow, Infinity, 'resultsListFull') 

    //Выводим 1 текущий подсчет на страницу в блок
    //Для частоты
    
    let selectedValueLambdaForm = 1
    function formatLamdaToTxt() {
                if (selectedValueLambda === 1) {
                    selectedValueLambdaForm = 'λ1'
                }
                if (selectedValueLambda === 2) {
                    selectedValueLambdaForm = 'λ1/2'
                }
                if (selectedValueLambda === 4) {
                    selectedValueLambdaForm = 'λ1/4'
                }
        }
        formatLamdaToTxt()

    //десктоп
    const $freqNumResult = document.getElementById('freqNumResult')
    const $formatLamdaToTxtDom = document.getElementById('formatLamdaToTxtDom')
    $freqNumResult.textContent = 'Для ' + document.getElementById('frequency').value + ' ' + 'МГц'
    $formatLamdaToTxtDom.textContent = selectedValueLambdaForm
    //мобайл
    const $freqNumResultMob = document.getElementById('freqNumResultMob')
    const $formatLamdaToTxtDomMob = document.getElementById('formatLamdaToTxtDomMob')
    $freqNumResultMob.textContent = 'Для ' + document.getElementById('frequency').value + ' ' + 'МГц' + ' (' + selectedValueLambdaForm + ')'

    //Для длинной стороны
    //Десктоп
    const $resultLongFrameNow = document.getElementById('resultLongFrameNow')
    $resultLongFrameNow.textContent =  Math.round(longFrame()) + ' '  + 'мм'
    //Mобайл
    const $resultLongFrameNowMob = document.getElementById('resultLongFrameNowMob')
    $resultLongFrameNowMob.textContent =  Math.round(longFrame()) + ' '  + 'мм'

    //Для короткой стороны
    //десктоп
    const $resultShortFrameNow = document.getElementById('resultShortFrameNow')
    $resultShortFrameNow.textContent =  Math.round(shortFrame) + ' ' + 'мм'
    //мобайл
    const $resultShortFrameNowMob = document.getElementById('resultShortFrameNowMob')
    $resultShortFrameNowMob.textContent =  Math.round(shortFrame) + ' ' + 'мм'

    // Для длины волны
    //десктоп
    const $waveLengthResultNow = document.getElementById('waveLengthResultNow')
    $waveLengthResultNow.textContent =  Math.round(frequencyValue) + ' ' + 'мм'
    //мобайл
    const $waveLengthResultNowMob = document.getElementById('waveLengthResultNowMob')
    $waveLengthResultNowMob.textContent =  Math.round(frequencyValue) + ' ' + 'мм'

    // Для расстояния между точками крепления 
    //десктоп
    const $pointDistanceValueNow = document.getElementById('pointDistanceValueNow')
    $pointDistanceValueNow.textContent =  pointDistanceValue + ' ' + 'мм'
    //мобайл
    const $pointDistanceValueNowMob = document.getElementById('pointDistanceValueNowMob')
    $pointDistanceValueNowMob.textContent =  pointDistanceValue + ' ' + 'мм'
 
    // Для длины прута
    //десктоп
    const $provolkaValueNow = document.getElementById('provolkaValueNow')
    $provolkaValueNow.textContent =  Math.round(provolka) + ' ' + 'мм'
    //мобайл
    const $provolkaValueNowMob = document.getElementById('provolkaValueNowMob')
    $provolkaValueNowMob.textContent =  Math.round(provolka) + ' ' + 'мм'

    // Делаем лоадер
    const $loaderOnClick = document.getElementById('loaderOnClick')
    $loaderOnClick.classList.add('load-result')

    const $svgLoader = document.getElementById('svgLoader')
    $svgLoader.classList.toggle('visible')
    $svgLoader.style.display = 'block'

    setTimeout(function() {
        $loaderOnClick.classList.remove('load-result')
        $svgLoader.style.display = 'none'
    }, 2300);

    //Очищаю поля
    frequencyInput.value = ''
    frequencyInput.placeholder = 'Частота'
    pointDistancInput.value = ''
    pointDistancInput.placeholder = 'Расстояние'
}

//Удаляю всю историю
function deleteAllHistoryBtn() {
    const harchenkoAntennaKey = 'harchenkoAntennaKey'
    // Проверяем существование ключа в локальном хранилище перед удалением
    if (localStorage.getItem(harchenkoAntennaKey) !== null) {
        localStorage.removeItem(harchenkoAntennaKey)
        resultsArrayNow = []
        updateListHistory(resultsArrayNow, setLimitCounHistory, 'cardResultList') // Выполняю функцию формирования результатов из хранилища
        updateListHistory(resultsArrayNow, Infinity, 'resultsListFull') // Вывожу полный список в блок с другим ID
        //Показываю уведомление
        const toastElement = document.querySelector('.toast')
        $toastTxt.textContent = 'История подсчетов успешно очищена!'
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
         
    } else {
        console.log('Ключ не существует в локальном хранилище')
        return
    }
}

//Удаляю одну карточку
function deleteOneCardHistory(index) {
    resultsArrayNow.reverse().splice(index, 1)
    resultsArrayNow.reverse()
    localStorage.setItem('harchenkoAntennaKey', JSON.stringify(resultsArrayNow)) // Фигачу обрато в хранилище
    updateListHistory(resultsArrayNow, setLimitCounHistory, 'cardResultList') // Выполняю функцию формирования результатов из хранилища
    updateListHistory(resultsArrayNow, Infinity, 'resultsListFull') // Вывожу полный список в блок с другим ID

    //Показываю уведомление
    const toastElement = document.querySelector('.toast')
    $toastTxt.textContent = 'Запись успешно удалена'
    const toast = new bootstrap.Toast(toastElement)
    toast.show()
}