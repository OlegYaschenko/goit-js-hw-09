const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

let position = 0;

function handleSubmit(event) {
  event.preventDefault();

  let delay = event.currentTarget.elements.delay.value;
  let step = event.currentTarget.elements.step.value;
  const amount = event.currentTarget.elements.amount.value;

  event.currentTarget.reset();

  if (amount <= 0) {
    return;
  }
  
  let delayTimeout = Number(delay);
  
  for (let i = 0; i < amount; i += 1){
    setTimeout(() => {
      position += 1;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay = Number(delay) + Number(step);
    }, delayTimeout);

    delayTimeout = Number(delayTimeout) + Number(step);
  }
  position = 0;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
