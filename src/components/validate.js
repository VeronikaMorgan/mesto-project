export function enableValidation(formData) {
  const forms = Array.from(document.querySelectorAll(formData.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      // const submitBtn = form.querySelector(formData.submitBtnSelector);
  })
    setFormValidityHandler(form, formData);
  });
}

function setFormValidityHandler(currentForm, formData) {
  const submitBtn = currentForm.querySelector(formData.submitBtnSelector);
  //  to make btn disabled before validation
  toggleBtnState(currentForm, submitBtn, formData);
  
  currentForm.addEventListener('reset', () => {
    setTimeout(() => {
      toggleBtnState(currentForm, submitBtn, formData)
    }, 0);
  });
  //   set validity handler on every input evt
  currentForm.addEventListener('input', (evt) => {
  const currentInput = evt.target;
  validate(currentInput, currentForm, formData);
  toggleBtnState(currentForm, submitBtn, formData);
 });
}

function validate(currentInput, currentForm, formData) {
  // value is valid and unused
  if (currentInput.validity.valid) {
    currentInput.onblur = () => {
    currentInput.setAttribute('data-used', 'true');
    }
    clearError(currentInput, currentForm, formData);
    return;
  }
  // value is unvalid and used
  if(currentInput.dataset.used === 'true') {
    setError(currentInput, currentForm, currentInput.validationMessage, formData);
    return;
  }
  // value is unvalid and unused
  currentInput.onblur = () => {
  currentInput.setAttribute('data-used', 'true');
  setError(currentInput, currentForm, currentInput.validationMessage, formData);
  return;
  }
}

export function resetErrors(currentForm, formData) {
   currentForm.reset();
   const inputList = Array.from(currentForm.querySelectorAll(formData.inputSelector));
   inputList.forEach(input => { 
   clearError(input, currentForm, formData);
   input.removeAttribute('data-used');
 })
}

function hasInvalidInput(currentForm, formData) {
  const inputList = Array.from(currentForm.querySelectorAll(formData.inputSelector));
  return inputList.some(input => { 
    validate(input, currentForm, formData);
    // returns true, if it has invalid input
    return !input.validity.valid;
  }) 
}

function toggleBtnState(currentForm, btn, formData) {
  if (hasInvalidInput(currentForm, formData)) {
    btn.classList.add(formData.disabledBtnClass);
    btn.setAttribute('disabled', '');
  } else {
    btn.classList.remove(formData.disabledBtnClass);
    btn.removeAttribute('disabled', '');
  }
}

function setError(currentInput, currentForm, errorMessage, formData) {
  const error = currentForm.querySelector(`#${currentInput.id}-error`);
  error.textContent = errorMessage;
  currentInput.classList.add(formData.inputInvalidClass);
  error.classList.add(formData.errorClass);
}

export function clearError(currentInput, currentForm, formData) {
  const error = currentForm.querySelector(`#${currentInput.id}-error`);
  error.textContent = "";
  currentInput.classList.remove(formData.inputInvalidClass);
  error.classList.remove(formData.errorClass);
};
