const createHtml = () => {
    let container = document.querySelector('#container');
    for (let i = 0; i < 5; i++) {
        let html = `
                <div class="post">
                <div class="post-info">    
                    <a href="https://shorturl.at/dtVZ7" target="_blank"><img src="user_icon.png" class="user-icon" alt="User icon" width="50px"></a>
                    <h3 class="userId">User ID: ${data[i]["userId"]}</h3>
                    <h3 class="postId">Post ID: ${data[i]["id"]}</h3>
                </div>
                    <h3 class="post-title">${data[i]["title"]}</h3>
                    <p class="post-content">${data[i]["body"]}</p>
                </div>
            `;
        container.insertAdjacentHTML('beforeend', html);
    }
}

let xhr = new XMLHttpRequest();
let data = null;

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        data = JSON.parse(xhr.response);
        console.log(data);
        createHtml();
    } else {
        console.log('Error');
    }
};

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();