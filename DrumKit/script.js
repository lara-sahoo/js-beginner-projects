// Open the preview in a new tab so you can see all the keys full screen. Save your Repl and Refresh the page every time you want to test functionality
const soundClassList = ['clap','hihat','kick','openhat','boom','ride','snare','tom','tink']

const keys = Array.from(document.querySelectorAll('.keys div'))

const audios =Array.from(document.querySelectorAll('audio')) 
console.log(audios)

function highLight(no){
  keys[no].classList.add('is-playing')
  // document.querySelector(`.${soundClassList[no]}-key`).classList.add('is-playing');
}

function removeLight(no){
  keys[no].classList.remove('is-playing')
  // document.querySelector(`.${soundClassList[no]}-key`).classList.remove('is-playing');
}

function playSound(no){
  audios[no].play()
  // document.querySelector(`.${soundClassList[no]}-sound`).play();
  setTimeout(function(){
    removeLight(no);
  }, 100);//wait 2 seconds
}


document.addEventListener('keypress', function(e) {
  console.log(e)
  audios.forEach((audio)=>{
    audio.pause()
    audio.currentTime = 0
  })
  if(e.code == 'KeyA'){
    console.log("Pressed A")
    highLight(0)
    playSound(0)
  }
  if(e.code == 'KeyS'){
    console.log("Pressed S")
    highLight(1)
    playSound(1)
  }
  if(e.code == 'KeyD'){
    console.log("Pressed D")
    highLight(2)
    playSound(2)
  }
  if(e.code == 'KeyF'){
    console.log("Pressed F")
    highLight(3)
    playSound(3)
  }
  if(e.code == 'KeyG'){
    console.log("Pressed G")
    highLight(4)
    playSound(4)
  }
  if(e.code == 'KeyH'){
    console.log("Pressed H")
    highLight(5)
    playSound(5)
  }
  if(e.code == 'KeyJ'){
    console.log("Pressed J")
    highLight(6)
    playSound(6)
  }
  if(e.code == 'KeyK'){
    console.log("Pressed K")
    highLight(7)
    playSound(7)
  }
  if(e.code == 'KeyL'){
    console.log("Pressed L")
    highLight(8)
    playSound(8)
  }
  
});
// When the user presses a key on their keyboard, play the accompanying sound and highlight the key element pressed (hint: look in the CSS file for more details)

// Once the sound has ended, remove the highlighting

// If the user presses another key before the sound has finished, stop the first sound and immediately start the next one.

// TIPS:
// look into keyboard events keyup, keydown, keypress
// read up on HTML5 data-* attributes
// look up CSS attribute selectors which can be used with querySelectorAll 
// look into the transitionEnd event
