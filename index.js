const form = document.querySelector('.my-form');
const nameError = document.getElementById('name-error');
const phoneError = document.getElementById('phone-error');
const passwordError = document.getElementById('password-error');
const confirmError = document.getElementById('confirmpassword-error');
const success = document.getElementById('success');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  let isError = false;

  nameError.textContent = '';
  phoneError.textContent = '';
  passwordError.textContent = '';
  confirmError.textContent = '';
  success.textContent = '';

  const datas = {
    name: formData.get('name').trim(),
    password: formData.get('password').trim(),
    confirmPassword: formData.get('confirmpassword').trim(),
    phoneNo: formData.get('tel').trim(),
  };

  if (datas.name) {
    if (datas.name.length < 5) {
      isError = true;
      nameError.textContent = 'name should be minimum 5 character long';
    }
  } else {
    isError = true;
    nameError.textContent = 'username is required';
  }

  if (datas.phoneNo) {
    if (!validatePhoneNo(datas.phoneNo)) {
      isError = true;
      phoneError.textContent = 'invalid phone number';
    }
  } else {
    isError = true;
    phoneError.textContent = 'phoneNo is required';
  }

  if (datas.password) {
    if (datas.password.length < 8) {
      isError = true;
      passwordError.textContent = 'password should be minimum 8 length';
    } else if (!validatePassword(datas.password)) {
      isError = true;
      passwordError.textContent =
        'password should contain an alphabet, number and a special chracters';
    }
  } else {
    isError = true;
    passwordError.textContent = 'password is required';
  }

  if (datas.password !== datas.confirmPassword) {
    isError = true;
    confirmError.textContent = 'password and confirm password dont match';
  }

  if (!isError) {
    form.reset();
    success.textContent = 'succesfully created account';
  }
});
function validatePhoneNo(number) {
  const regex = /^\+?[0-9]{1,3}?[-. ]?(\(?[0-9]{2,4}\)?[-. ]?)*[0-9]{1,10}$/;
  return regex.test(number);
}

function validatePassword(password) {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?\/~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;:'",.<>?\/~]{3,}$/;

  return regex.test(password);
}
