function showContent(contentId) {
    const contents = document.querySelectorAll('.content > div');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(contentId).style.display = 'block';

    // Remove outlines when switching tabs
    const outline = document.querySelector('.outline');
    if (outline) {
        outline.remove();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const todoContainer = document.querySelector('.todo-container');
    const todoInput = document.querySelector('.todo-input');
    const addButton = document.querySelector('.add-button');
    const todoItems = document.querySelectorAll('.todo-item');
    const todoButtons = document.querySelectorAll('.todo-item button');

    if (document.body.classList.contains('dark-mode')) {
        todoContainer.classList.add('dark-mode');
        todoInput.classList.add('dark-mode');
        addButton.classList.add('dark-mode');
        todoItems.forEach(item => item.classList.add('dark-mode'));
        todoButtons.forEach(button => button.classList.add('dark-mode'));
    } else {
        todoContainer.classList.remove('dark-mode');
        todoInput.classList.remove('dark-mode');
        addButton.classList.remove('dark-mode');
        todoItems.forEach(item => item.classList.remove('dark-mode'));
        todoButtons.forEach(button => button.classList.remove('dark-mode'));
    }
}

// To-do list functionality
let confettiEnabled = true;
let selectedPriority = 'normal';
let money = 0;

function toggleConfetti() {
    confettiEnabled = !confettiEnabled;
}

function selectPriority(priority) {
    if (selectedPriority === priority) return; // Prevent clicking on already selected button

    selectedPriority = priority;
    document.querySelectorAll('.priority-button').forEach(button => {
        button.classList.remove('selected');
        button.disabled = false; // Re-enable all buttons
    });
    const selectedButton = document.getElementById(`priority-${priority}`);
    selectedButton.classList.add('selected');
    selectedButton.disabled = true; // Disable the selected button
}

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('li');
    todoItem.className = `todo-item priority-${selectedPriority}`;
    todoItem.innerHTML = `
        <span>${todoText}</span>
        <button onclick="completeTodo(this)"></button>
    `;

    // Insert the new task based on priority
    let inserted = false;
    const items = todoList.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        if (selectedPriority === 'urgent' || 
            (selectedPriority === 'important' && items[i].classList.contains('priority-normal'))) {
            todoList.insertBefore(todoItem, items[i]);
            inserted = true;
            break;
        }
    }
    if (!inserted) {
        todoList.appendChild(todoItem);
    }

    todoInput.value = '';
}

function completeTodo(button) {
    const todoItem = button.parentElement;
    const todoText = todoItem.querySelector('span');
    button.classList.add('completed');
    todoText.style.textDecoration = 'line-through';
    setTimeout(() => {
        todoItem.classList.add('fade-out');
        todoItem.style.opacity = '0';
        setTimeout(() => {
            todoItem.remove();
            // Trigger confetti if enabled
            if (confettiEnabled) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            // Update money based on priority
            if (todoItem.classList.contains('priority-normal')) {
                updateMoney(10);
            } else if (todoItem.classList.contains('priority-important')) {
                updateMoney(20);
            } else if (todoItem.classList.contains('priority-urgent')) {
                updateMoney(30);
            }
        }, 500);
    }, 500);
}

function updateMoney(amount) {
    money += amount;
    document.getElementById('money-amount').textContent = money;
}

// Aeolus AI chat functionality
function startFlaskServer() {
    fetch('http://127.0.0.1:5000/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Flask server is not running. Starting Flask server...');
            const { exec } = require('child_process');
            exec('python /C:/Users/DELL/Downloads/School/CS/Term 2/Mental/project/app.py', (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error starting Flask server: ${err}`);
                    return;
                }
                console.log(`Flask server started: ${stdout}`);
            });
        });
}

function adjustInputWidth(input) {
    input.style.width = '10px'; // Start very short
    input.style.width = (input.scrollWidth + 2) + 'px';
}

function sendMessage() {
    startFlaskServer(); // Ensure Flask server is running
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.querySelector('.send-button');
    const userMessage = chatInput.value;
    if (userMessage.trim() === '') return;

    const chatBox = document.getElementById('chat-box');
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'chat-message user-message';
    userMessageElement.textContent = 'You: ' + userMessage;
    chatBox.appendChild(userMessageElement);

    chatInput.value = '';
    chatInput.disabled = true;
    sendButton.disabled = true;
    adjustInputWidth(chatInput); // Reset input width

    fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const aiMessageElement = document.createElement('div');
        aiMessageElement.className = 'chat-message ai-message';
        aiMessageElement.textContent = 'Aeolus: ' + data.response;
        chatBox.appendChild(aiMessageElement);
        chatInput.disabled = false;
        sendButton.disabled = false;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error('Fetch error:', error);
        const errorElement = document.createElement('div');
        errorElement.className = 'chat-message error-message';
        errorElement.textContent = 'Error: Unable to get response from Aeolus AI.';
        chatBox.appendChild(errorElement);
        chatInput.disabled = false;
        sendButton.disabled = false;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Meditation functionality
let meditationTime = 1;

function setMeditationTime(minutes) {
    meditationTime = minutes;
    document.querySelectorAll('.meditation-button').forEach(button => {
        button.classList.remove('selected');
    });
    document.querySelector(`.meditation-button[onclick="setMeditationTime(${minutes})"]`).classList.add('selected');
}

function startMeditation() {
    const overlay = document.getElementById('dark-overlay');
    const countdown = document.getElementById('countdown');
    const breatheText = document.getElementById('breathe-text');
    overlay.style.display = 'flex';
    let timeLeft = meditationTime * 60;
    countdown.textContent = formatTime(timeLeft);

    const interval = setInterval(() => {
        timeLeft--;
        countdown.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(interval);
            overlay.style.display = 'none';
        }
    }, 1000);

    const breatheInterval = setInterval(() => {
        breatheText.textContent = breatheText.textContent === "Breathe in" ? "Breathe out" : "Breathe in";
    }, 2000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function buyItem(itemName) {
    alert(`You have bought ${itemName}!`);
    // Implement further logic for buying items, such as deducting coins, updating inventory, etc.
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('todo-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Music player functionality
    const songs = [
        'Songs/song1.mp3',
        'Songs/song2.mp3',
        'Songs/song3.mp3'
        // Add more songs as needed
    ];
    let currentSongIndex = 0;
    const audio = new Audio(songs[currentSongIndex]);
    const playButton = document.getElementById('play-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');
    const songTitle = document.getElementById('song-title');

    function loadSong(index) {
        audio.src = songs[index];
        songTitle.textContent = songs[index].split('/').pop();
        audio.load();
    }

    function playSong() {
        audio.play();
        playButton.textContent = '⏸️';
    }

    function pauseSong() {
        audio.pause();
        playButton.textContent = '▶️';
    }

    function updateProgress() {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeElement.textContent = formatTime(audio.currentTime);
        durationElement.textContent = formatTime(audio.duration);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    });

    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    });

    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    });

    loadSong(currentSongIndex);
});
