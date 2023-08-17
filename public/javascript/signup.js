const signupForm = document.getElementById('signup-form');

async function signupFormHandler(event) {
  event.preventDefault();
  // Extract the values from the sign-up form
  const username = document.getElementById('username-signup').value;
  const email = document.getElementById('email-signup').value;
  const password = document.getElementById('password-signup').value;
  const signupStatusEl = document.getElementById('signup-status');

  if (username.length <= 4 || email.length <= 4 || password.length <= 4) {
    // If any input value is under 4 characters, notify the user and restrict submission
    signupStatusEl.textContent = 'Please fill in all fields with at least 4 characters';
    signupStatusEl.style.color = 'red';

    setTimeout(() => {
      signupStatusEl.textContent = 'Fill in all required inputs with character count above 4';
      signupStatusEl.style.color = 'black';
    }, 4000);
  } else {
    // Execute the fetch using the provided values
    const response = await fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      signupStatusEl.textContent = 'Sign-up successful, redirecting...';
      signupStatusEl.style.color = 'green';
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 1250);
    } else {
      alert(response.statusText);
    }
  }
}

signupForm.addEventListener('submit', signupFormHandler);
