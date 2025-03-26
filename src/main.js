import './scss/style.scss';

const form = document.getElementById('form');
const emailInput = document.querySelector('.newsletter__email-input');
const emailError = document.getElementById('email-error');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal__btn');
const modalEmail = document.querySelector('.modal__email');
const submitButton =  document.querySelector('.newsletter__btn');
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;


const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const {email} = Object.fromEntries(formData);
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail === '' || !emailPattern.test(cleanEmail)) {
        emailError.textContent = 'Valid email required';
        emailInput.classList.add('newsletter__email-input--error');
        return;
    }
    
    submitButton.disabled = true;
    submitButton.value = 'Sending...';

    setTimeout(() => { 
        modalEmail.textContent = cleanEmail;
        modal.showModal();
        modal.focus();
        submitButton.disabled = false;
        submitButton.value = 'Subscribe';
    }, 1500);
}

const removeError = () => {
    emailError.textContent = '';
    emailInput.classList.remove('newsletter__email-input--error');
}

const checkInput = () => {
    const emailValue = emailInput.value.trim().toLowerCase();

    if (emailValue !== '' && emailPattern.test(emailValue)) {
        removeError();
    }
}


const closeModal = () => {
    modal.close();
    modalEmail.textContent = '';
    emailInput.value = '';

    const signUpTitle = document.querySelector('.newsletter__title');

    if(signUpTitle) {
        signUpTitle.focus();
    }
}

const handleEscape = e => {
    if (e.key === 'Escape' && modal.open) {
        closeModal();
    }
}

form.addEventListener('submit', handleSubmit);
emailInput.addEventListener('input', checkInput);
emailInput.addEventListener('blur', removeError);
modalCloseButton.addEventListener('click', closeModal);
document.addEventListener('keydown', handleEscape);