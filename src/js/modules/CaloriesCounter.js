import { formatInput } from '../utils/formatInput';

const caloriesFormulaConstants = new Map([
  ['male', 5],
  ['female', -161]
]);

const physicalActivityRatios = new Map([
  ['min', 1.2],
  ['low', 1.375],
  ['medium', 1.55],
  ['high', 1.725],
  ['max', 1.9]
]);

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

  getActivityRatio() {
    const activity = this.activityInputs.value;
    return physicalActivityRatios.get(activity);
  }

  getCaloriesNorm() {
    const weight = Number(this.weightInput.value);
    const height = Number(this.heightInput.value);
    const age = Number(this.ageInput.value);
    const gender = this.genderInputs.value;
    const caloriesNorm = (10 * weight + 6.25 * height - 5 * age) + caloriesFormulaConstants.get(gender);
    const activityRatio = this.getActivityRatio();

    return Math.round(caloriesNorm * activityRatio);
  };

  getCaloriesMinimal(caloriesNorm) {
    return Math.round(caloriesNorm * 0.85);
  }

  getCaloriesMaximal(caloriesNorm) {
    return Math.round(caloriesNorm * 1.15);
  }
};
