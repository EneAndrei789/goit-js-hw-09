// Selectăm elementele din formular
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');

// Funcția pentru a crea o promisiune
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3; // 70% șanse să fie îndeplinită
      if (shouldResolve) {
        resolve({ position, delay }); // Promisiune îndeplinită
      } else {
        reject({ position, delay }); // Promisiune respinsă
      }
    }, delay);
  });
}

// Handler pentru trimiterea formularului
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevenim comportamentul implicit al formularului

  // Preluăm valorile din formular
  const firstDelay = Number(delayInput.value); // Prima întârziere
  const step = Number(stepInput.value); // Pasul pentru creșterea întârzierii
  const amount = Number(amountInput.value); // Numărul de promisiuni

  // Creăm promisiuni într-o buclă
  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * step;
    
    // Apelăm createPromise și gestionăm promisiunile
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        // Afișăm un mesaj când promisiunea este îndeplinită
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Afișăm un mesaj când promisiunea este respinsă
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});


