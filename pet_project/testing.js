let createData = new XMLHttpRequest();
 
createData.onload = function () {
    alert('POSTED')
};

createData.open('POST', 'https://jsonplaceholder.typicode.com/posts');
createData.send();


let deleteData = new XMLHttpRequest();
 
deleteData.onload = function () {
    alert('DELETED')
};

deleteData.open('DELETE', 'https://jsonplaceholder.typicode.com/posts/1');
deleteData.send();




let updateData = new XMLHttpRequest();

updateData.onload = function () {
    alert('EDITED')
};

updateData.open('PUT', 'https://jsonplaceholder.typicode.com/posts');
updateData.send();