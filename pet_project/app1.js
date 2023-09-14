const users = [
    {
        'username': 'JackBoHorse',
        'email': 'horseman11@gmail.com',
        'password': 'ZyeehawpartnerZ',
        'role': 'reader',
    },
    {
        'username': 'lilprince',
        'email': 'daprince@gmail.com',
        'password': 'indahood777',
        'role': 'editor',
    },
    {
        'username': 'Simon',
        'email': 'simonjones@gmail.com',
        'password': '123Admin123',
        'role': 'admin',
    }
];

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");
const loginSuccess = document.getElementById("login-success-container")
const loginError = document.getElementById("login-error-container")

loginButton.addEventListener("click", validateForm);

function nextPage() {
    setTimeout(() => {
        document.location.href = 'index2.html';
    }, 3000);
}

function reload() {
    setTimeout(() => {
        location.reload();;
    }, 3000);
}

function validateForm(e) {
    e.preventDefault();
    const enteredUsername = loginForm.username.value;
    const enteredPassword = loginForm.password.value;
    const user = users.find(user => user.username === enteredUsername && user.password === enteredPassword)

    if (user) {
        loginSuccess.style.display = 'flex';
        localStorage.setItem('role', `${user.role}`);
        nextPage();
    } else {
        loginError.style.display = 'flex';
        reload();
    }
};