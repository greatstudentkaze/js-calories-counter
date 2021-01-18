import activityCoefficients from './activityCoefficients';
import { formatInput } from '../utils/formatInput';

export default class CaloriesCounter {
  constructor(element) {
    this.root = element;
    this.form = this.root.querySelector('.counter__form');
    this.elements = this.form.elements;
    this.parameters = [...this.elements.parameters.elements];
    this.genderInputs = this.form.elements.gender;
    this.activityInputs = this.form.elements.activity;
    this.ageInput = this.form.elements.age;
    this.heightInput = this.form.elements.height;
    this.weightInput = this.form.elements.weight;
    this.calculateButton = this.form.elements['submit'];
    this.resetButton = this.form.elements['reset'];

    this.counterResult = this.root.querySelector('.counter__result');
    this.caloriesNormElem = this.counterResult.querySelector('#calories-norm');
    this.caloriesMinimalElem = this.counterResult.querySelector('#calories-minimal');
    this.caloriesMaximalElem = this.counterResult.querySelector('#calories-maximal');

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleInput(evt) {
    const target = evt.target;

    if (target.closest('[name="parameters"]')) {
      target.value = formatInput(target);
    }

    this.calculateButton.disabled = !this.form.checkValidity();
    this.resetButton.disabled = !this.parameters.some(input => input.value);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const caloriesNorm = this.getCaloriesNorm();

    this.counterResult.classList.remove('counter__result--hidden');

    this.caloriesNormElem.textContent = caloriesNorm;
    this.caloriesMinimalElem.textContent = this.getCaloriesMinimal(caloriesNorm);
    this.caloriesMaximalElem.textContent = this.getCaloriesMaximal(caloriesNorm);
  }

  handleReset() {
    this.calculateButton.disabled = true;
    this.resetButton.disabled = true;
    this.counterResult.classList.add('counter__result--hidden');
  }

  addEventListeners() {
    this.form.addEventListener('input', this.handleInput);
    this.form.addEventListener('submit', this.handleSubmit);
    this.form.addEventListener('reset', this.handleReset);
  }

  init() {
    this.addEventListeners();
  }

  getActivityCoefficient() {
    const activity = this.activityInputs.value;
    return activityCoefficients.get(activity);
  }

  getCaloriesNorm() {
    const gender = this.genderInputs.value;
    let caloriesNorm = 10 * Number(this.weightInput.value) + 6.25 * Number(this.heightInput.value) - 5 * Number(this.ageInput.value);

    switch (gender) {
      case 'male':
        caloriesNorm += 5;
        break;
      case 'female':
        caloriesNorm -= 161;
        break;
      default:
        throw Error('Пол не выбран');
    }

    return Math.round(caloriesNorm * this.getActivityCoefficient());
  };

  getCaloriesMinimal(caloriesNorm) {
    return Math.round(caloriesNorm * 0.85);
  }

  getCaloriesMaximal(caloriesNorm) {
    return Math.round(caloriesNorm * 1.15);
  }
};
