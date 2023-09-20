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
    for (let i = 99; i >= 90; i--) {
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

// Create post block:
const createModal = document.createElement('div');

async function createPost() {
    await axios.post('https://jsonplaceholder.typicode.com/posts', {
        'title': title,
        'body': body,
        'userId': userId,
    })
        .then(response => {
            const post =
                `   <div class="post">
                    <div class="post-info">
                        <a href="https://shorturl.at/dtVZ7" target="_blank"><img src="user_icon.png" class="user-icon" alt="User icon" width="50px"></a>
                        <h3 class="userId">User ID: ${response.data.userId}</h3>
                        <h3 class="postId">Post ID: ${response.data.id}</h3>
                    </div>
                    <h3 class="post-title">${response.data.title}</h3>
                    <p class="post-content">${response.data.body}</p>
                    <div class="options">
                        <button type="button" class="edit">Edit</button>
                        <button type="button" class="delete">Delete</button>
                    <div>
                </div>`
            container.insertAdjacentHTML('afterbegin', post);
        })
        .catch(function (error) {
            console.log(error);
        })
};

function showCreatePopup() {
    const createModal = document.createElement('div');
    createModal.className = 'modal';
    createModal.innerHTML = `
        <div class="createModal-content">
            <h2>New Post</h2>
            <input type="text" class="post-title" id="postTitle" value="" placeholder="The title of your post">
            <textarea class="post-content" id="postContent" rows="6" cols="100%" placeholder="The content of your post"></textarea>
            <button id="postButton">Post</button>
        </div>
    `;
    document.body.appendChild(createModal);

    const postButton = createModal.querySelector('#postButton');
    postButton.addEventListener('click', function () {
        title = createModal.querySelector('#postTitle').value;
        body = createModal.querySelector('#postContent').value;
        createPost();
        createModal.remove();
    })
}
// Create post end

// Edit post block:
const editModal = document.createElement('div');

async function editPost(postId, parentDiv, editedTitle, editedBody) {
    await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        'title': editedTitle,
        'body': editedBody,
        'userId': userId,
    })
        .then(response => {
            console.log(response);
            parentDiv
        })
        .catch(function (error) {
            console.log(error);
        })
    parentDiv.querySelector('.post-title').textContent = editedTitle;
    parentDiv.querySelector('.post-content').textContent = editedBody;
    editModal.remove();
}

function showEditPopup(postId, postTitle, postContent, parentDiv) {
    const editModal = document.createElement('div');
    editModal.className = 'modal';
    editModal.innerHTML = `
        <div class="editModal-content">
            <h2>Edit Post</h2>
            <h3 id="postId">Post ID: ${postId}</h3>
            <input type="text" class="post-content" id="editedTitle" value="${postTitle}">
            <textarea class="post-content" id="editedContent" rows="6" cols="100">${postContent}</textarea>
            <button id="saveButton">Save changes</button>
        </div>
    `;
    document.body.appendChild(editModal);
    const saveButton = editModal.querySelector('#saveButton');
    saveButton.addEventListener('click', function () {
        const editedTitle = editModal.querySelector('#editedTitle').value;
        const editedContent = editModal.querySelector('#editedContent').value;
        editPost(postId, parentDiv, editedTitle, editedContent);
        editModal.remove();
    });
}
// Edit post end

// Delete post block:
function deletePost(postId, parentDiv) {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            console.log(response);
            parentDiv.remove();
        })
        .catch(error => {
            console.error(error);
        });
}
// Delete post end

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

create.addEventListener('click', function () {
    showCreatePopup();
})
// Logout:
logout.addEventListener('click', function () {
    document.location.href = 'index1.html';
    localStorage.removeItem('role');
    localStorage.removeItem('ID');
})
// Logout end
// Event handlers end

getPostList()