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

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const enteredUsername = loginForm.username.value;
    const enteredPassword = loginForm.password.value;

    if (enteredUsername == '' || enteredPassword == '') {
        alert('Please ensure that both correct username and password are entered')
    } else {
        if (users.find(user => user.username === enteredUsername && user.password === enteredPassword)) {
            alert(`Welcome,. Your role is`);
        } else {
            alert('Incorrect username or password');
        }
    }
})