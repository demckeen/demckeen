
    const sounds = {
        "65": { sound: new Audio('./sounds/clap.wav'), timesPlayed: 0 },
        "83": { sound: new Audio('./sounds/hihat.wav'), timesPlayed: 0 },
        "68": { sound: new Audio('./sounds/kick.wav'), timesPlayed: 0 },
        "70": { sound: new Audio('./sounds/openhat.wav'), timesPlayed: 0 },
        "71": { sound: new Audio('./sounds/boom.wav'), timesPlayed: 0 },
        "72": { sound: new Audio('./sounds/ride.wav'), timesPlayed: 0 },
        "74": { sound: new Audio('./sounds/snare.wav'), timesPlayed: 0 },
        "75": { sound: new Audio('./sounds/tom.wav'), timesPlayed: 0 },
        "76": { sound: new Audio('./sounds/tink.wav'), timesPlayed: 0 },
      }
  
      document.addEventListener('keydown', (e) => {
        const { sound, timesPlayed } = sounds[e.keyCode]
        if (sound) {
          const element = document.querySelector(`[data-key="${e.keyCode}"]`)
          sounds[e.keyCode].timesPlayed += 1
          element.classList.add('playing')
        //   let scale = ((timesPlayed + 1) % 5) * 1 
        //   element.style.transform = `scale(1.${ scale })`
          sound.currentTime = 0
          sound.play()
          sound.addEventListener('ended', () => {
            element.classList.remove('playing')
          })
        }
      })
    