// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const db = getDatabase();
    
    const user = db.users.find(u => u.email === email && u.password === password && u.active);
    
    if (user) {
        saveCurrentUser(user);
        window.location.href = 'dashboard.html';
    } else {
        const errorEl = document.getElementById('loginError');
        errorEl.textContent = 'Invalid email or password';
        errorEl.classList.add('show');
        setTimeout(() => errorEl.classList.remove('show'), 3000);
    }
});

// Quick login with demo accounts
function quickLogin(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}

// Toggle password visibility
function togglePassword() {
    const pwd = document.getElementById('password');
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
}

// Logout
function logout() {
    localStorage.removeItem('edupanel_user');
    window.location.href = 'index.html';
}

// Check authentication on dashboard
function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}
