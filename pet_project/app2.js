let xhr = new XMLHttpRequest();

let data = null;
let userRole = localStorage.getItem('role');
const container = document.querySelector('#container');

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

    if (userRole === 'reader') {
        editButtons.forEach(function (button) {
            button.style.display = 'none';
        });
        deleteButtons.forEach(function (button) {
            button.style.display = 'none';
        });
    } else if (userRole === 'editor') {
        deleteButtons.forEach(function (button) {
            button.style.display = 'none';
        });
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