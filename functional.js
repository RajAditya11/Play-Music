const audioArray = [];
const audioButtons = [];
const audioPlayers = [];
let currentTrack = null; 
let repeating = false;
let shuffledOrder = [];
let queue = []; // To store the upcoming tracks
let isShuffling = false; // To track whether shuffling is active

// Initialize audio, button, and player arrays
for (let i = 1; i <= 8; i++) {
    audioArray.push(`audio${i}`);
    audioButtons.push(document.getElementById(`audio${i}`));
    audioPlayers.push(document.getElementById(`audioPlayer${i}`));
}

audioButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        toggleAudio(index);
    });
});

// Function to play music
function playMusic(index) {
    const currentPlayer = audioPlayers[index];
    currentPlayer.play();
    audioButtons[index].textContent = `Stop`;
}

// Function to pause music
function pauseMusic(index) {
    const currentPlayer = audioPlayers[index];
    currentPlayer.pause(); // Just pause the current music
    audioButtons[index].textContent = `Play`;
}

// Function to toggle audio playback
function toggleAudio(index) {
    if (currentTrack !== null && audioPlayers[currentTrack]) {
        const previousPlayer = audioPlayers[currentTrack];

        // Check if the previous player is playing
        if (!previousPlayer.paused) {
            pauseMusic(currentTrack);
            return; // Exit the function to avoid replaying the same track
        }
    }

    currentTrack = index; 
    const currentPlayer = audioPlayers[currentTrack];

    // Toggle play/pause
    if (currentPlayer.paused) {
        playMusic(currentTrack);
    } else {
        pauseMusic(currentTrack);
    }

    currentPlayer.onended = () => {
        if (repeating) {
            currentPlayer.currentTime = 0;
            playMusic(currentTrack);
        } else {
            nextTrack();
        }
    };
}

// Shuffle button functionality
document.getElementById("Shuffle").addEventListener("click", () => {
    // Pause the current track if playing
    if (currentTrack !== null && audioPlayers[currentTrack]) {
        pauseMusic(currentTrack);
    }

    // Shuffle logic
    isShuffling = true;
    shuffledOrder = shuffleArray([...Array(8).keys()]); // Create a new shuffled order
    queue.push(shuffledOrder[0]); // Add the next track to the queue

    // If there's a current track, just queue the next one
    if (currentTrack !== null) {
        console.log(`Next track queued: audio${shuffledOrder[0] + 1}`);
    } else {
        playMusic(shuffledOrder[0]); // If no current track, play the first track
    }
});

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to play the next track
function nextTrack() {
    // If shuffling is active and there's a queue, play the next queued track
    if (isShuffling && queue.length > 0) {
        currentTrack = queue.shift(); // Get the next track from the queue
        toggleAudio(currentTrack);
    } else {
        currentTrack++;
        if (currentTrack >= audioArray.length) {
            currentTrack = 0; 
        }
        toggleAudio(currentTrack);
    }
}

// Repeat button functionality
document.getElementById("Repeat").addEventListener("click", () => {
    repeating = !repeating; 
    document.getElementById("Repeat").textContent = repeating ? "ON" : "OFF";
});

// Add this code after defining the audioPlayers array
const timelines = []; // To hold timeline elements

for (let i = 1; i <= 8; i++) {
    timelines.push(document.getElementById(`timeline${i}`));
}

// Add event listeners for each timeline
timelines.forEach((timeline, index) => {
    timeline.addEventListener("input", () => {
        const currentPlayer = audioPlayers[index];
        currentPlayer.currentTime = (currentPlayer.duration || 0) * (timeline.value / 100); // Adjust current time based on the range value
    });
});

// Update the timeline value as the audio plays
function updateTimeline(index) {
    const currentPlayer = audioPlayers[index];
    if (currentPlayer.duration) {
        timelines[index].value = (currentPlayer.currentTime / currentPlayer.duration) * 100; // Update timeline value
    }
}

// Update the timeline value as the audio plays
function updateTimeline(index) {
    const currentPlayer = audioPlayers[index];
    if (currentPlayer.duration) {
        // Update timeline thumb position based on song progress (not the timeline size)
        timelines[index].value = (currentPlayer.currentTime / currentPlayer.duration) * 100;
    }
}

// When the user changes the timeline, adjust the song's current time proportionally
timelines.forEach((timeline, index) => {
    timeline.addEventListener("input", () => {
        const currentPlayer = audioPlayers[index];
        // Adjust the current time based on the percentage (0-100)
        currentPlayer.currentTime = (timeline.value / 100) * currentPlayer.duration;
    });
});




const navbar = document.getElementById('navbar');

// Array of background image URLs
const backgrounds = [
    'url(./bck1.jpg)',
    'url(./bck2.jpg)',
    'url(./bck3.jpg)',
    .url(./bck1.jpg)',
];

let currentIndex = 0;

// Function to change the background
function changeBackground() {
    navbar.style.backgroundImage = backgrounds[currentIndex];
    currentIndex = (currentIndex + 1) % backgrounds.length; // Cycle through the array
}

// Initial call to set the first background
changeBackground();

// Change background every 10 seconds
setInterval(changeBackground, 10000);
