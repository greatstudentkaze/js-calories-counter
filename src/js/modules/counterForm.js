import activityCoefficients from './activityCoefficients';

const counterForm = () => {
  const form = document.querySelector('.counter__form');
  const formInputs = [...form.querySelectorAll('input[type="number"]')];
  const genderInputs = form.elements.gender;
  const activityInputs = form.elements.activity;
  const ageInput = form.elements.age;
  const heightInput = form.elements.height;
  const weightInput = form.elements.weight;
  const calculateButton = form.elements['submit'];
  const resetButton = form.elements['reset'];

  const counterResult = document.querySelector('.counter__result');
  const caloriesNormElem = counterResult.querySelector('#calories-norm');
  const caloriesMinimalElem = counterResult.querySelector('#calories-minimal');
  const caloriesMaximalElem = counterResult.querySelector('#calories-maximal');

  const getActivityCoefficient = () => {
    const activity = activityInputs.value;
    return activityCoefficients.get(activity);
  };

  const getCaloriesNorm = () => {
    const gender = genderInputs.value;
    let caloriesNorm = 10 * Number(weightInput.value) + 6.25 * Number(heightInput.value) - 5 * Number(ageInput.value);

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

    return Math.round(caloriesNorm * getActivityCoefficient());
  };

  const getCaloriesMinimal = caloriesNorm => Math.round(caloriesNorm - caloriesNorm * 0.15);

  const getCaloriesMaximal = caloriesNorm => Math.round(caloriesNorm + caloriesNorm * 0.15);

  const handleInput = () => {
    let isAnyInputValid = false;
    let areAllInputsValid = true;

    formInputs.forEach(input => {
      if (input.value) {
        isAnyInputValid = true;
        areAllInputsValid &= true;
      } else {
        areAllInputsValid = false;
      }
    });

    calculateButton.disabled = !areAllInputsValid;
    resetButton.disabled = !isAnyInputValid;
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const caloriesNorm = getCaloriesNorm();

    counterResult.classList.remove('counter__result--hidden');

    caloriesNormElem.textContent = caloriesNorm;
    caloriesMinimalElem.textContent = getCaloriesMinimal(caloriesNorm);
    caloriesMaximalElem.textContent = getCaloriesMaximal(caloriesNorm);
  };

  const handleReset = () => {
    calculateButton.disabled = true;
    counterResult.classList.add('counter__result--hidden');
  };

  form.addEventListener('input', handleInput);
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('reset', handleReset);
};

export default counterForm;
