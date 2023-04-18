function playTone(frequency:number, duration:number) {
    const audioContext = new (window.AudioContext )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
  
    oscillator.type = 'sine'; // Set the oscillator waveform type
    oscillator.frequency.value = frequency; // Set the frequency of the tone
    gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Set the gain level
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration); // Fade out the tone
  
    oscillator.connect(gainNode); // Connect the oscillator to the gain node
    gainNode.connect(audioContext.destination); // Connect the gain node to the output (speakers)
    oscillator.start(audioContext.currentTime); // Start the oscillator
    oscillator.stop(audioContext.currentTime + duration); // Stop the oscillator after the specified duration
  }

  