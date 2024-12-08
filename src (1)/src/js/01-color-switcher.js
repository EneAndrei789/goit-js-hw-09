// Functia pentru a genera o culoare aleatorie
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  
  // Elemente DOM
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  let colorChangeInterval = null; 
  
  function startColorChange() {
    startButton.disabled = true;
  
    colorChangeInterval = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
  
  function stopColorChange() {
    
    clearInterval(colorChangeInterval);
    startButton.disabled = false;
  }
  
  // Atașăm evenimentele la butoane
  startButton.addEventListener('click', startColorChange);
  stopButton.addEventListener('click', stopColorChange);
  
