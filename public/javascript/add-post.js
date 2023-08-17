const addPostForm = document.getElementById('addPost-form');

async function addPostHandler(event) {
  event.preventDefault();

  // Extract the values from the form
  const post_title = document.getElementById('add-post-title').value;
  const post_desc = document.getElementById('add-post-desc').value;
  const addPostStatusEl = document.getElementById('addpost-status');

  if (post_title.length <= 4 || post_desc.length <= 4) {
    // If any add post input value is under 4 character length, notify the user and restrict submission
    addPostStatusEl.textContent = 'Please make sure all inputs have at least 4 characters';
    addPostStatusEl.style.color = 'red';

    setTimeout(() => {
      addPostStatusEl.textContent = 'Fill in all required inputs with character count above 4';
      addPostStatusEl.style.color = 'black';
    }, 4000);
  } else {
    // Execute the fetch using the provided values
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: post_title,
        description: post_desc,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the response is OK, refresh the page
    if (response.ok) {
      addPostStatusEl.textContent = 'Successfully posted, refreshing...';
      addPostStatusEl.style.color = 'green';
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 750);
    } else {
      // Otherwise, alert the user with the response status text
      alert(response.statusText);
    }
  }
}

// Add the event handler for the form submission
addPostForm.addEventListener('submit', addPostHandler);
