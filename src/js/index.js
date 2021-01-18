import CaloriesCounter from './modules/CaloriesCounter';

const counterElements = document.querySelectorAll('.counter');

counterElements.forEach(elem => {
  const counter = new CaloriesCounter(elem);
  counter.init();
});
