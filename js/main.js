var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var userInfo = [];
var storedData = JSON.parse(localStorage.getItem('userData'));


function signUp_1() {
    var name = userName.value;
    var email = userEmail.value;
    var password = userPassword.value;

    document.querySelector('.wrong-form').classList.add('d-none');
    document.querySelector('.wrong-name').classList.add('d-none');
    document.querySelector('.wrong-email').classList.add('d-none');
    document.querySelector('.wrong-password').classList.add('d-none');
    document.querySelector('.email-exists').classList.add('d-none');

    if (name === '' || email === '' || password === '') {
        document.querySelector('.wrong-form').classList.remove('d-none');
        return;
    }

    if (validateName(name) === false) {
        document.querySelector('.wrong-name').classList.remove('d-none');
        return;
    }

    if (validateEmail(email) === false) {
        document.querySelector('.wrong-email').classList.remove('d-none');
        return;
    }

    if (validatePassword(password) === false) {
        document.querySelector('.wrong-password').classList.remove('d-none');
        return;
    }

    if (storedData && storedData.length) {
        for (var i = 0; i < storedData.length; i++) {
            if (name === storedData[i].name && email === storedData[i].email && password === storedData[i].password) {
                document.querySelector('.email-exists').classList.remove('d-none');
                return;
            }
        }
    }

    var user = {
        name: name,
        email: email,
        password: password
    };
    userInfo.push(user);
    localStorage.setItem('userData', JSON.stringify(userInfo));
    document.querySelector('.success-form').classList.remove('d-none');
    window.location.href = './index.html';
}





function logIn() {
    var email = userEmail.value;
    var password = userPassword.value;

    document.querySelector('.wrong-form').classList.add('d-none');
    document.querySelector('.wrong-email').classList.add('d-none');
    document.querySelector('.wrong-password').classList.add('d-none');
    document.querySelector('.wrong-account').classList.add('d-none');

    if (email === '' || password === '') {
        document.querySelector('.wrong-form').classList.remove('d-none');
        return;
    }

    if (validateEmail(email) === false) {
        document.querySelector('.wrong-email').classList.remove('d-none');
        return;
    }

    if (validatePassword(password) === false) {
        document.querySelector('.wrong-password').classList.remove('d-none');
        return;
    }

    for (var i = 0; i < storedData.length; i++) {
        if (storedData[i].email === email && storedData[i].password === password) {
            localStorage.setItem('userName', storedData[i].name);
            window.location.href = './welcome.html';
            return;
        }
    }

    document.querySelector('.wrong-account').classList.remove('d-none');
}



if (localStorage.getItem('userName')) {
    document.getElementById('welcomeMessage').innerHTML = 'Welcome ' + localStorage.getItem('userName');
}

function signIn() {
    window.location.href = './index.html';
}

function signUp() {
    window.location.href = './signup.html';
}

function logOut() {
    localStorage.removeItem('userName');
    window.location.href = './index.html';
}

function validateName(name) {
    var nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    var passwordRegex = /^[a-zA-Z0-9]{3,}$/;
    return passwordRegex.test(password);
}
