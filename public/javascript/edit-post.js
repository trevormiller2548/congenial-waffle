const editPosts = document.querySelectorAll('.edit-post-id');

async function editPost(newTitle, newBody, postId) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: newTitle,
      description: newBody,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

// Handle the confirm button event, return the new data and update the existing post
const handleSubmit = (btn, postId) => {
  btn.addEventListener('click', () => {
    const newTitle = document.querySelector(`#edit-title-${postId}`).value;
    const newBody = document.querySelector(`#edit-body-${postId}`).value;

    if (newTitle.length <= 4 || newBody.length <= 4) {
      document.getElementById('edit-post-status').style.display = 'flex';
      setTimeout(() => {
        document.getElementById('edit-post-status').style.display = 'none';
      }, 3000);
    } else {
      editPost(newTitle, newBody, postId);
    }
  });
};

editPosts.forEach((post) => {
  post.addEventListener('click', () => {
    const postId = post.dataset.postId;
    const confirmBtn = document.getElementById(`confirm-post-${postId}`);
    const editTitle = document.getElementById(`edit-title-${postId}`);
    const editBody = document.getElementById(`edit-body-${postId}`);

    confirmBtn.style.display = 'flex';
    editTitle.removeAttribute('readonly');
    editBody.removeAttribute('readonly');

    handleSubmit(confirmBtn, postId);
  });
});
