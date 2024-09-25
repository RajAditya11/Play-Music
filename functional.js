const audioButton = document.getElementById("audioButton");
const audioPlayer = document.getElementById("audioPlayer");

// Add an event listener to the button to play the audio when clicked
audioButton.addEventListener("click", function() {
  if(audioPlayer.paused){
    audioPlayer.play();
    audioButton.textContent = "Stop";
  }else{
    audioPlayer.pause();
    //audioPlayer.currentTime = 0;
    audioButton.textContent = "Play";
  }
});

const repeatButton = document.getElementById("repeatButton")
const shuffle = document.getElementById("shuffleButton")

repeatButton.addEventListener("click", function(){
    if(repeatButton.played){
        while(repeatButton.played == true){
            if(audioButton.paused){
                audioButton.play();
            }
        }
    }else{
        audioButton.pause();
    }
});
