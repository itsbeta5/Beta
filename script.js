document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Mock admin credentials
const adminUsername = 'admin';
const adminPassword = 'password';

document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === adminUsername && password === adminPassword) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('upload-form').style.display = 'block';
        alert('Logged in as admin');
    } else {
        alert('Incorrect username or password');
    }
});

document.getElementById('upload-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('video-title').value;
    const description = document.getElementById('video-description').value;
    const file = document.getElementById('video-file').files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const videoURL = event.target.result;
            addVideoCard(title, description, videoURL);
            saveVideoToStorage(title, description, videoURL);
            alert('Video uploaded successfully');
        };
        reader.readAsDataURL(file);
    }
});

function addVideoCard(title, description, videoURL) {
    const videoContainer = document.getElementById('video-container');
    const videoCard = document.createElement('div');
    videoCard.classList.add('video-card');
    videoCard.innerHTML = `
        <video src="${videoURL}" controls></video>
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="rating">
            <button class="rate-up">👍</button>
            <span class="rate-count">0</span>
            <button class="rate-down">👎</button>
        </div>
        <div class="comments">
            <h4>Comments</h4>
            <div class="comment-list"></div>
            <textarea placeholder="Add a comment..."></textarea>
            <button class="add-comment">Submit</button>
        </div>
    `;
    videoContainer.appendChild(videoCard);
    attachRatingEventListeners(videoCard);
    attachCommentEventListeners(videoCard);
}

function attachRatingEventListeners(videoCard) {
    videoCard.querySelector('.rate-up').addEventListener('click', (event) => {
        let count = event.target.nextElementSibling;
        count.textContent = parseInt(count.textContent) + 1;
    });

    videoCard.querySelector('.rate-down').addEventListener('click', (event) => {
        let count = event.target.previousElementSibling;
        count.textContent = parseInt(count.textContent) - 1;
    });
}

function attachCommentEventListeners(videoCard) {
    videoCard.querySelector('.add-comment').addEventListener('click', (event) => {
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
}

function saveVideoToStorage(title, description, videoURL) {
    // Implement local storage or backend API call to save video data
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.push({ title, description, videoURL });
    localStorage.setItem('videos', JSON.stringify(videos));
}

function loadVideosFromStorage() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.forEach(video => addVideoCard(video.title, video.description, video.videoURL));
}

// Initially hide the admin panel elements
document.getElementById('upload-form').style.display = 'none';
document.getElementById('admin').style.display = 'none';

// Show the admin panel when the admin link is clicked
document.querySelector('a[href="#admin"]').addEventListener('click', () => {
    document.getElementById('admin').style.display = 'block';
    document.getElementById('login-form').style.display = 'block';
});

loadVideosFromStorage();
