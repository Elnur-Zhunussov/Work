const users = [
    {
        'username': 'JackBoHorse',
        'email': 'horseman11@gmail.com',
        'password': 'ZyeehawpartnerZ',
        'role': 'user',
    },
    {
        'username': 'lilprince',
        'email': 'daprince@gmail.com',
        'password': 'indahood777',
        'role': 'user',
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

function validateForm(e) {
    e.preventDefault();
    const enteredUsername = loginForm.username.value;
    const enteredPassword = loginForm.password.value;
    const user = users.find(user => user.username === enteredUsername && user.password === enteredPassword)

    if (enteredUsername == '' || enteredPassword == '') {
        loginError.style.display = 'flex';
    } else {
        if (user) {
            loginSuccess.style.display = 'flex';
        } else {
            loginError.style.display = 'flex';
        }
    };
};