export default class Result {
  constructor(element) {
    this.counter = element;
    this.root = this.counter.querySelector('.counter__result');
    this.caloriesNormElem = this.root.querySelector('#calories-norm');
    this.caloriesMinimalElem = this.root.querySelector('#calories-minimal');
    this.caloriesMaximalElem = this.root.querySelector('#calories-maximal');
  }

  show(calories) {
    this.caloriesNormElem.textContent = calories.norm;
    this.caloriesMinimalElem.textContent = calories.minimal;
    this.caloriesMaximalElem.textContent = calories.maximal;

    this.root.classList.remove('counter__result--hidden');
  }

  hide() {
    this.root.classList.add('counter__result--hidden');
    
    this.caloriesNormElem.textContent = 0;
    this.caloriesMinimalElem.textContent = 0;
    this.caloriesMaximalElem.textContent = 0;
  }
}
