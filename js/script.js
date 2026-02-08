// ========== УПРАЖНЕНИЯ (ГЛОБАЛЬНЫЕ ФУНКЦИИ) ==========

// Проверка кнопок (правильно/неправильно)
function check(button, correct) {
    console.log('check вызвана', correct);
    const result = button.parentElement.querySelector('.result');
    
    if (!result) {
        console.error('Не найден .result элемент');
        return;
    }
    
    if (correct) {
        result.textContent = ' Верно!';
        result.style.color = 'green';
    } else {
        result.textContent = ' Неверно :(';
        result.style.color = 'red';
    }
}

// Открыть/закрыть упражнение
function toggleExercise(id) {
    console.log('toggleExercise вызван для id:', id);
    const block = document.getElementById(id);
    
    if (!block) {
        console.error('Не найден элемент с id:', id);
        return;
    }
    
    console.log('Найден блок:', block);
    console.log('Текущие классы:', block.className);
    
    block.classList.toggle("active");
    console.log('Новые классы:', block.className);
}

// Добавить слово в предложение
function addWord(btn) {
    console.log('addWord вызвана');
    const task = btn.closest('.task');
    if (!task) {
        console.error('Не найден .task элемент');
        return;
    }
    
    const sentence = task.querySelector('.sentence');
    if (sentence) {
        sentence.textContent += btn.textContent + ' ';
        btn.disabled = true;
        btn.style.opacity = '0.6';
        console.log('Слово добавлено:', btn.textContent);
    }
}

function addWord(btn) {
    const task = btn.closest(".task");
    const sentence = task.querySelector(".sentence");

    sentence.textContent += btn.textContent + " ";
}

function checkSentence(btn) {
    const task = btn.closest(".task");
    const sentence = task.querySelector(".sentence");
    const result = task.querySelector(".result");

    const correct = sentence.dataset.answer;
    const userAnswer = sentence.textContent.trim();

    if (userAnswer === correct) {
        result.textContent = "Верно!";
        result.style.color = "green";
    } else {
        result.textContent = "Неверно :(";
        result.style.color = "red";
    }
}



function clearOrder(button) {
    const task = button.closest(".task");
    const sentence = task.querySelector(".sentence");

    sentence.textContent = "";
    sentence.classList.remove("active");
}


function addWord(button) {
    const task = button.closest(".task");
    const sentence = task.querySelector(".sentence");

    sentence.textContent += (sentence.textContent ? " " : "") + button.textContent;
    sentence.classList.add("active");
}

function checkInputs(exerciseId) {
    const exercise = document.getElementById(exerciseId);
    const inputs = exercise.querySelectorAll("input");

    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            input.classList.add("correct");
            input.classList.remove("wrong");
        } else {
            input.classList.add("wrong");
            input.classList.remove("correct");
        }
    });
}

function clearInputs(exerciseId) {
    const exercise = document.getElementById(exerciseId);
    const inputs = exercise.querySelectorAll("input");

    inputs.forEach(input => {
        input.value = "";
        input.classList.remove("correct", "wrong");
    });
}



// ========== НАВИГАЦИЯ ==========

// Загрузка времени
async function loadTense(tenseName) {
    try {
        console.log('Загружаем время:', tenseName);
        
        const response = await fetch(`tenses/${tenseName}.html`);
        
        if (!response.ok) {
            throw new Error(`Файл не найден: ${tenseName}.html`);
        }
        
        const html = await response.text();
        
        // Скрываем меню
        document.getElementById('levels-menu').style.display = 'none';
        
        // Вставляем контент
        const container = document.getElementById('tense-container');
        container.innerHTML = html;
        
        // Добавляем кнопку "Назад"
        const backButton = document.createElement('button');
        backButton.className = 'back';
        backButton.innerHTML = '← Назад к уровням';
        backButton.onclick = goHome;
        container.insertBefore(backButton, container.firstChild);
        
        // Ждем немного и проверяем загрузку функций
        setTimeout(() => {
            console.log('Загружено время:', tenseName);
            console.log('toggleExercise доступна?', typeof toggleExercise);
            console.log('check доступна?', typeof check);
            
            // Проверяем кнопки на странице
            const buttons = container.querySelectorAll('button');
            console.log('Кнопок на странице:', buttons.length);
            
            // Проверяем кнопки упражнений
            const startBtns = container.querySelectorAll('.start-btn');
            console.log('Кнопок .start-btn:', startBtns.length);
            
            startBtns.forEach(btn => {
                console.log('Кнопка:', btn.textContent);
                console.log('onclick:', btn.getAttribute('onclick'));
            });
        }, 100);
        
    } catch (error) {
        console.error('Ошибка загрузки времени:', error);
        document.getElementById('tense-container').innerHTML = `
            <div style="text-align:center; padding:40px; color:red;">
                <h3> Ошибка загрузки</h3>
                <p>${error.message}</p>
                <button onclick="goHome()" style="margin-top:20px;">Вернуться</button>
            </div>
        `;
    }
}

// Возврат на главную
function goHome() {
    console.log('Возвращаемся на главную');
    document.getElementById('tense-container').innerHTML = '';
    document.getElementById('levels-menu').style.display = 'block';
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('========== TensesUp загружен ==========');
    console.log('Все функции доступны:');
    console.log('- check:', typeof check);
    console.log('- toggleExercise:', typeof toggleExercise);
    console.log('- addWord:', typeof addWord);
    console.log('- checkSentence:', typeof checkSentence);
    
    // Назначаем обработчики кнопок навигации
    const btnIds = [
'btn-present-simple',
'btn-present-continuous',
'btn-present-perfect',
'btn-present-perfect-continuous',

'btn-past-simple',
'btn-past-continuous',
'btn-past-perfect',
'btn-past-perfect-continuous',

'btn-future-simple',
'btn-future-continuous',
'btn-future-perfect',
'btn-future-perfect-continuous',

    ];
    
    btnIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            console.log('Найдена кнопка:', id);
            btn.addEventListener('click', function() {
                const tenseName = id.replace('btn-', '');
                console.log('Нажата кнопка:', tenseName);
                loadTense(tenseName);
            });
        } else {
            console.warn('Не найдена кнопка:', id);
        }
    });
    
    console.log('Инициализация завершена!');
    console.log('====================================');
});

// Экспортируем функции в глобальную область видимости
if (typeof window !== 'undefined') {
    window.check = check;
    window.toggleExercise = toggleExercise;
    window.addWord = addWord;
    window.checkSentence = checkSentence;
    window.checkSpecialSentence = checkSpecialSentence;
    window.clearSentence = clearSentence;
    window.loadTense = loadTense;
    window.goHome = goHome;
    
    console.log('Функции экспортированы в window');
}