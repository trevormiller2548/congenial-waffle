const signupForm = document.getElementById('signup-form');

async function signupFormHandler(event) {
  event.preventDefault();
  // Extract the values from the sign-up form
  const username = document.getElementById('username-signup').value;
  const email = document.getElementById('email-signup').value;
  const password = document.getElementById('password-signup').value;
  const signupStatusEl = document.getElementById('signup-status');
  
  if (username.length <= 4 || email.length <= 4 || password.length <= 4) {
    // If any sign-up input value is under 4 characters, notify the user and restrict submission
    signupStatusEl.textContent = 'Please make all inputs are filled with character count above 4';
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

    // If the response is OK, refresh the page and redirect to the dashboard
    if (response.ok) {
      signupStatusEl.textContent = 'Sign-up successful, refreshing...';
      signupStatusEl.style.color = 'green';
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 1250);
    } else {
      // Otherwise, alert the user with the response status text
      alert(response.statusText);
    }
  }
}

// Add the event handler for the form submission
signupForm.addEventListener('submit', signupFormHandler);
