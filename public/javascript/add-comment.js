const commentForm = document.getElementById('comment-form');

async function addCommentHandler(event) {
  event.preventDefault();

  // Extract the values from the form
  const comment_text = document.getElementById('comment-field').value;
  const commentStatusEl = document.getElementById('comment-status');
  const postId = window.location.pathname.split('/')[2];

  if (comment_text.length <= 4) {
    // If the comment text is under 4 characters, notify the user and restrict submission
    commentStatusEl.textContent = 'Comment must be at least 4 characters long';
    commentStatusEl.style.color = 'red';

    setTimeout(() => {
      commentStatusEl.textContent = 'Required character count above 4';
      commentStatusEl.style.color = 'black';
    }, 4000);
  } else {
    // Execute the fetch using the provided values
    const response = await fetch(`/api/comments/${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      commentStatusEl.textContent = 'Comment added successfully';
      commentStatusEl.style.color = 'green';
      setTimeout(() => {
        document.location.reload();
      }, 1000);
    } else {
      alert(response.statusText);
    }
  }
}

commentForm.addEventListener('submit', addCommentHandler);

