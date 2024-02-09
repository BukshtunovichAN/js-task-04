import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  amount: document.querySelector('[name="amount"]'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
};

refs.form.addEventListener('submit', promisesNotify);
refs.form.addEventListener('change', () => {
  inpDelay = +refs.delay.value;
  inpStep = +refs.step.value;
  inpAmount = +refs.amount.value;
});

let inpDelay = 0;
let inpStep = 0;
let inpAmount = 0;

function createPromise(position, delay) {
  return new Promise((resolve, regect) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        regect({ position, delay });
      }
    }, inpDelay);
  });
}

function promisesNotify(arg) {
  arg.preventDefault();
  for (let i = 1; i <= inpAmount; i++) {
    createPromise(i, inpDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    inpDelay += inpStep;
  }
}
