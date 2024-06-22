// Toggle Dark Mode
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Ratings
document.querySelectorAll('.rate-up').forEach(button => {
    button.addEventListener('click', (event) => {
        let count = event.target.nextElementSibling;
        count.textContent = parseInt(count.textContent) + 1;
    });
});

document.querySelectorAll('.rate-down').forEach(button => {
    button.addEventListener('click', (event) => {
        let count = event.target.previousElementSibling;
        count.textContent = parseInt(count.textContent) - 1;
    });
});

// Comments
document.querySelectorAll('.add-comment').forEach(button => {
    button.addEventListener('click', (event) => {
        let textarea = event.target.previousElementSibling;
        let commentList = textarea.previousElementSibling;
        if (textarea.value.trim() !== "") {
            let newComment = document.createElement('div');
            newComment.textContent = textarea.value;
            commentList.appendChild(newComment);
            textarea.value = '';
        } else {
            alert("Comment cannot be empty.");
        }
    });
});
