// FocusGuard
// Global Variables
let currentTime = 25 * 60;
let timerInterval = null;
let isRunning = false;
let currentMode = 'study';
let streak = 0;
let todayCompleted = false; // streak logic: if a task is completed today, increment streak only once per day

const studyTips = [
  { id: 1, text: "Use the Pomodoro technique: 25 minutes focused work followed by a short break." },
  { id: 2, text: "Break up large tasks into smaller, manageable chunks to avoid overwhelm." },
  { id: 3, text: "Take short walks between study sessions to refresh your mind." },
  { id: 4, text: "Minimize distractions by putting your phone on Do Not Disturb." },
  { id: 5, text: "Review your notes at the end of each study session for better retention." }
];

// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modeBtns = document.querySelectorAll('.mode-btn');
const streakCount = document.getElementById('streak-count');
const dailyTip = document.getElementById('daily-tip');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const themeBtns = document.querySelectorAll('.theme-btn');

function updateDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function setMode(mode, minutes) {
  currentMode = mode;
  currentTime = minutes * 60;
  updateDisplay();
  modeBtns.forEach(btn => btn.classList.toggle('active', parseInt(btn.dataset.time) === minutes));
}

// timer start logic
function startTimer() {
  if (!timerInterval) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (currentTime > 0) {
        currentTime--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        // playCompletionSound();

        
        if (currentMode === 'study') {
          streak++;
          streakCount.textContent = `${streak} 🔥`;
          alert("Great work! Study session complete.");
        } else {
          alert("Break time over!");
        }
      }
    }, 1000);
  }
}
// timer pause logic
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
}
// timer reset logic
function resetTimer() {
  pauseTimer();
  const activeBtn = document.querySelector('.mode-btn.active');
  if (activeBtn) {
    setMode(activeBtn.dataset.mode || 'study', parseInt(activeBtn.dataset.time));
  } else {
    setMode('study', 25);
  }
}
// tasks array
let tasks = [];
// render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    
    li.querySelector('input').addEventListener('change', () => {
      const wasCompleted = tasks[index].completed;
      tasks[index].completed = !tasks[index].completed;
      
      // streak logic: increment once per day when completing a task
      if (!wasCompleted && !todayCompleted) {
        todayCompleted = true;
        streak++;
        streakCount.textContent = `${streak} 🔥`;
      }
      
      renderTasks();
    });
    
    li.querySelector('.delete-btn').addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });
    
    taskList.appendChild(li);
  });
}

//theme selector logic
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeBtns.forEach(btn => btn.classList.toggle('active', btn.id === `theme-${theme}`));
}

// event listeners for timer controls
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// event listeners for timer mode buttons
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const minutes = parseInt(btn.dataset.time);
    const mode = btn.dataset.mode || 'study';
    setMode(mode, minutes);
  });
});

// event listener for adding tasks
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

// event listeners for theme buttons
themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.id.replace('theme-', '');
    setTheme(theme);
  });
});

// initialize
function init() {
  setMode('study', 25);
  
  // random tip on every refresh
  const randomTip = studyTips[Math.floor(Math.random() * studyTips.length)];
  dailyTip.textContent = randomTip.text;
  
  streakCount.textContent = `${streak} 🔥`;
  renderTasks();
  setTheme('light');
  
  console.log('✅ FocusGuard ready with all requested features!');
}

init();