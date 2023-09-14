let xhr = new XMLHttpRequest();

let data = null;
let userRole = localStorage.getItem('role');
const container = document.querySelector('#container');
const header = document.querySelector('#header');

function createHtml() {
    for (let i = 0; i < 5; i++) {
        let base = `
            <div class="post">
            <div class="post-info">    
                <a href="https://shorturl.at/dtVZ7" target="_blank"><img src="user_icon.png" class="user-icon" alt="User icon" width="50px"></a>
                <h3 class="userId">User ID: ${data[i]["userId"]}</h3>
                <h3 class="postId">Post ID: ${data[i]["id"]}</h3>
            </div>
                <h3 class="post-title">${data[i]["title"]}</h3>
                <p class="post-content">${data[i]["body"]}</p>
            <div class="options">
                <button type="button" class="edit">Edit</button>
                <button type="button" class="delete">Delete</button>
            </div>    
            </div>
        `;
        container.insertAdjacentHTML('beforeend', base);
    }
};

function permissions() {
    const editButtons = document.querySelectorAll('.edit');
    const deleteButtons = document.querySelectorAll('.delete');
    const createButton = document.getElementById('create');

    if (userRole === 'reader') {
        editButtons.forEach(function (button) {
            button.style.display = 'none';
        });
        deleteButtons.forEach(function (button) {
            button.style.display = 'none';
        });
        createButton.style.display = 'none';
    } else if (userRole === 'editor') {
        deleteButtons.forEach(function (button) {
            button.style.display = 'none';
        });
        createButton.style.display = 'none';
    }
}

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        data = JSON.parse(xhr.response);
        createHtml();
        permissions();
    } else {
        alert('error')
    };
};

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();

header.addEventListener('click', function (event) {
    if (event.target.id === 'create') {
        showCreatePopup();
    }
});

function showCreatePopup() {
    const createModal = document.createElement('div');
    createModal.className = 'modal';

    createModal.innerHTML = `
        <div class="createModal-content">
            <h2>New Post</h2>
            <input type="text" id="postTitle" value="" placeholder="The title of your post">
            <textarea id="postContent" rows="6" cols="100%" placeholder="The content of your post"></textarea>
            <button id="postButton">Post</button>
        </div>
    `;

    document.body.appendChild(createModal);

    const postButton = createModal.querySelector('#postButton');
    postButton.addEventListener('click', function () {

        createModal.remove();
    });
}

container.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit')) {
        const parentDiv = event.target.closest('.post');
        const postTitle = parentDiv.querySelector('.post-title').textContent;
        const postContent = parentDiv.querySelector('.post-content').textContent;

        showEditPopup(postTitle, postContent);
    }
});

function showEditPopup(title, content) {
    const editModal = document.createElement('div');
    editModal.className = 'modal';

    editModal.innerHTML = `
        <div class="editModal-content">
            <h2>Edit Post</h2>
            <input type="text" id="editedTitle" value="${title}">
            <textarea id="editedContent" rows="6" cols="100%">${content}</textarea>
            <button id="saveButton">Save changes</button>
        </div>
    `;

    document.body.appendChild(editModal);

    const saveButton = editModal.querySelector('#saveButton');
    saveButton.addEventListener('click', function () {

        editModal.remove();
    });
}