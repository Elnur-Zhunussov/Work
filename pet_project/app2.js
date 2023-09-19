const container = document.querySelector('#container');
const header = document.querySelector('#header');
const createButton = document.getElementById('create');
const logout = document.getElementById('logout');
const userId = localStorage.getItem('ID');
const userRole = localStorage.getItem('role');
let data = null;

function createHtml() {
    for (let i = 0; i < 5; i++) {
        const post = data[i];
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-info">    
                <a href="https://shorturl.at/dtVZ7" target="_blank"><img src="user_icon.png" class="user-icon" alt="User icon" width="50px"></a>
                <h3 class="userId">User ID: ${post.userId}</h3>
                <h3 class="postId">Post ID: ${post.id}</h3>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.body}</p>
            <div class="options">
                <button type="button" class="edit">Edit</button>
                <button type="button" class="delete">Delete</button>
            </div>
        `;
        container.appendChild(postElement);
    }
}

function toggleButtons() {
    const editButtons = document.querySelectorAll('.edit');
    const deleteButtons = document.querySelectorAll('.delete');

    if (userRole === 'reader') {
        editButtons.forEach(button => button.style.display = 'none');
        deleteButtons.forEach(button => button.style.display = 'none');
        createButton.style.display = 'none';
    } else if (userRole === 'editor') {
        deleteButtons.forEach(button => button.style.display = 'none');
        createButton.style.display = 'none';
    }
}

function fetchData() {
    const getData = new XMLHttpRequest();
    getData.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    getData.onload = function () {
        if (getData.status >= 200 && getData.status < 300) {
            data = JSON.parse(getData.response);
            createHtml();
            toggleButtons();
        } else {
            console.error('Failed to fetch data');
        }
    };
    getData.send();
}

createButton.addEventListener('click', function () {
    showCreatePopup();
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
        title = createModal.querySelector('#postTitle').value;
        body = createModal.querySelector('#postContent').value;

        const newPost = {};

        newPost.title = title;
        newPost.body = body;
        newPost.userId = userId;

        let createData = new XMLHttpRequest();

        createData.open('POST', 'https://jsonplaceholder.typicode.com/posts');
        createData.setRequestHeader('Content-Type', 'application/json');

        createData.addEventListener('load', function () {
            if (createData.status === 201 && createData.readyState === 4) {
                const result = JSON.parse(createData.responseText);

                const post =
                    `   <div class="post">
                            <div class="post-info">
                                <a href="https://shorturl.at/dtVZ7" target="_blank"><img src="user_icon.png" class="user-icon" alt="User icon" width="50px"></a>
                                <h3 class="userId">User ID: ${result.userId}</h3>
                                <h3 class="postId">Post ID: ${result.id}</h3>
                            </div>
                            <h3 class="post-title">${result.title}</h3>
                            <p class="post-content">${result.body}</p>
                            <div class="options">
                                <button type="button" class="edit">Edit</button>
                                <button type="button" class="delete">Delete</button>
                            <div>
                        </div>`

                container.insertAdjacentHTML('afterbegin', post);

                createModal.remove();
            } else {
                throw new Error("Bad request");
            }
        });
        createData.send(JSON.stringify(newPost));
    });
}

container.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit')) {
        const parentDiv = event.target.closest('.post');
        const postId = parentDiv.querySelector('.postId').textContent.match(/\d+/);
        const postTitle = parentDiv.querySelector('.post-title').textContent;
        const postContent = parentDiv.querySelector('.post-content').textContent;

        showEditPopup(postId, postTitle, postContent, parentDiv);
    }
    if (event.target.classList.contains('delete')) {
        let post = event.target.closest('.post');
        let idH3 = post.querySelector('.postId');
        let id = idH3.textContent.match(/\d+/);

        let deleteData = new XMLHttpRequest();

        deleteData.open('DELETE', `https://jsonplaceholder.typicode.com/posts/${id}`);

        deleteData.onload = function () {
            if (deleteData.status === 200 && deleteData.readyState === 4) {
                post.remove()
            } else {
                console.error('Failed to delete post');
            }
        };
        deleteData.send();
    }
});

function showEditPopup(postId, title, content, parentDiv) {
    const editModal = document.createElement('div');
    editModal.className = 'modal';

    editModal.innerHTML = `
        <div class="editModal-content">
            <h2>Edit Post</h2>
            <h3 id="postId">Post ID: ${postId}</h3>
            <input type="text" id="postTitle" value="${title}">
            <textarea id="postContent" rows="6" cols="100">${content}</textarea>
            <button id="saveButton">Save changes</button>
        </div>
    `;

    document.body.appendChild(editModal);

    const saveButton = editModal.querySelector('#saveButton');

    saveButton.addEventListener('click', function () {
        editedTitle = editModal.querySelector('#postTitle').value;
        editedBody = editModal.querySelector('#postContent').value;

        const editedPost = {};

        editedPost.title = editedTitle;
        editedPost.body = editedBody;
        editedPost.userId = userId;


        let updateData = new XMLHttpRequest();
        updateData.open('PUT', `https://jsonplaceholder.typicode.com/posts/${postId}`);
        updateData.setRequestHeader('Content-Type', 'application/json');

        updateData.addEventListener('load', function () {
            if (updateData.status === 200 && updateData.readyState === 4) {
                parentDiv.querySelector('.post-title').textContent = editedTitle;
                parentDiv.querySelector('.post-content').textContent = editedBody;
                editModal.remove();
            } else {
                throw new Error("Bad request");
            }
        });
        updateData.send(JSON.stringify(editedPost));
    });
}

logout.addEventListener('click', function () {
    document.location.href = 'index1.html';
    localStorage.removeItem('role');
    localStorage.removeItem('ID');
});

// Fetch data when the page loads
// fetchData();


async function send() {
    await axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => { console.log('list: ', response.data); data = response.data; })
    createHtml();
    permissions();
}

send()