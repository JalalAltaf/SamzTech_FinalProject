

// const form = document.getElementById('bookingForm');
// const card = document.getElementById('flip-card');

// // Show a custom dialog box
// function showAlert(message) {
//   const alertBox = document.getElementById('customAlert');
//   alertBox.querySelector('p').innerText = message;
//   alertBox.style.display = 'block';

//   alertBox.querySelector('button').onclick = () => {
//     alertBox.style.display = 'none';
//   };
// }

// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   const name = document.getElementById('name').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const phone = document.getElementById('phone').value.trim();
//   const guests = document.getElementById('guests').value.trim();
//   const date = document.getElementById('date').value.trim();

//   const nameRegex = /^[A-Za-z\s]+$/;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^[0-9]+$/;

//   if (!name || !email || !phone || !guests || !date) {
//     showAlert('Please fill in all required fields.');
//     return;
//   }

//   if (!nameRegex.test(name)) {
//     showAlert('Name should only contain alphabets and spaces.');
//     return;
//   }

//   if (!emailRegex.test(email)) {
//     showAlert('Please enter a valid email address.');
//     return;
//   }

//   if (!phoneRegex.test(phone)) {
//     showAlert('Phone number should contain only digits.');
//     return;
//   }

//   // Flip card to show back
//   card.classList.add('flipped');

//   // Flip back after 4 seconds and reset
//   setTimeout(() => {
//     card.classList.remove('flipped');
//     form.reset();
//   }, 4000);
// });

const form = document.getElementById('bookingForm');
const card = document.getElementById('flip-card');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear all previous errors
  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const guests = document.getElementById('guests').value.trim();
  const date = document.getElementById('date').value.trim();

  let isValid = true;

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]+$/;

  if (!name) {
    document.getElementById('nameError').textContent = 'Name is required.';
    isValid = false;
  } else if (!nameRegex.test(name)) {
    document.getElementById('nameError').textContent = 'Only alphabets and spaces allowed.';
    isValid = false;
  }

  if (!email) {
    document.getElementById('emailError').textContent = 'Email is required.';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Enter a valid email address.';
    isValid = false;
  }

  if (!phone) {
    document.getElementById('phoneError').textContent = 'Phone number is required.';
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    document.getElementById('phoneError').textContent = 'Phone should contain only digits.';
    isValid = false;
  }

  if (!guests) {
    document.getElementById('guestsError').textContent = 'Number of persons is required.';
    isValid = false;
  } else if (parseInt(guests) < 1) {
    document.getElementById('guestsError').textContent = 'At least 1 guest required.';
    isValid = false;
  }

  if (!date) {
    document.getElementById('dateError').textContent = 'Please select a date and time.';
    isValid = false;
  }

  if (!isValid) return;

  // Flip card to back
  card.classList.add('flipped');

  // Reset after 4 seconds
  setTimeout(() => {
    card.classList.remove('flipped');
    form.reset();
  }, 4000);
});
