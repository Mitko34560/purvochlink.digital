function togglePassword() {
    const pwd = document.getElementById('password');
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
}

function setDemo(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
}

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('edupanel_currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid credentials';
    }
});

function getCurrentUser() {
    const user = localStorage.getItem('edupanel_currentUser');
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem('edupanel_currentUser');
    window.location.href = 'index.html';
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function toggleMenu() {
    document.querySelector('.dropdown-menu')?.classList.toggle('hidden');
}
