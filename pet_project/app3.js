// Constants
let data = null;
const userRole = localStorage.getItem('role');
const userId = localStorage.getItem('ID');
const container = document.querySelector('#container');
const logout = document.querySelector('#logout');
const create = document.querySelector('#create');
// Constants end

// Function to create HTML
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
            <div> 
            </div>
        `;
        container.insertAdjacentHTML('beforeend', base);
    }
};
// Function to create HTML end

// Function to handle permissions
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
// Function to handle permissions end

// Function to create the page:
async function getPostList() {
    await axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => data = response.data)
    createHtml();
    permissions();
}
// Function to create the page end

// Functions to handle create popup:
const createModal = document.createElement('div');

async function send() {
    await axios.post('https://jsonplaceholder.typicode.com/posts', {
        id: id,
        title: title,
        body: body,
        userId: userId,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function showCreatePopup() {
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

        async function send() {
            await axios.post('https://jsonplaceholder.typicode.com/posts', {
                // id: id,
                title: title,
                body: body,
                userId: userId,
            })
                .then(response => {
                    const result = JSON.parse(response.responseText);

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
                })
                .catch(function (error) {
                    console.log(error);
                });
        } send();
    })
};
// Functions to handle create popup end

// Function to handle edit popup:
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
//Function to handle edit popup end

// Function to handle delete:
function deletePost(postId, parentDiv) {
    let deleteData = new XMLHttpRequest();
    deleteData.open('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    deleteData.onload = function () {
        if (deleteData.status === 200 && deleteData.readyState === 4) {
            parentDiv.remove()
        } else {
            console.error('Failed to delete post');
        }
    };
    deleteData.send();
}
// Function to handle delete end

// Event handlers:
container.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit')) {
        const parentDiv = event.target.closest('.post');
        const postId = parentDiv.querySelector('.postId').textContent.match(/\d+/);
        const postTitle = parentDiv.querySelector('.post-title').textContent;
        const postContent = parentDiv.querySelector('.post-content').textContent;
        showEditPopup(postId, postTitle, postContent, parentDiv);
    } else if (event.target.classList.contains('delete')) {
        const parentDiv = event.target.closest('.post');
        const postId = parentDiv.querySelector('.postId').textContent.match(/\d+/);
        deletePost(postId, parentDiv);
    }
});

logout.addEventListener('click', function () {
    document.location.href = 'index1.html';
    localStorage.removeItem('role');
    localStorage.removeItem('ID');
})

create.addEventListener('click', function () {
    showCreatePopup();
})
// Event handlers end

// Logout
logout.addEventListener('click', function () {
    document.location.href = 'index1.html';
    localStorage.removeItem('role');
    localStorage.removeItem('ID');
});
// Logout end


getPostList();