// Simpan data user di localStorage
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([
    { username: "admin", password: "admin123" } // Akun default
  ]));
}

// === REGISTER ===
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  
  const users = JSON.parse(localStorage.getItem('users'));
  if (users.some(user => user.username === username)) {
    document.getElementById('errorMsg').textContent = "Username sudah digunakan!";
    return;
  }
  
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert("Registrasi berhasil! Silakan login.");
  window.location.href = "index.html";
});

// === LOGIN ===
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const users = JSON.parse(localStorage.getItem('users'));
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    localStorage.setItem('currentUser', username);
    window.location.href = "admin.html";
  } else {
    document.getElementById('errorMsg').textContent = "Username/password salah!";
  }
});

// === ADMIN PANEL ===
if (document.getElementById('adminUsername')) {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = "index.html";
  }
  
  document.getElementById('adminUsername').textContent = currentUser;
  document.getElementById('totalUsers').textContent = 
    JSON.parse(localStorage.getItem('users')).length;
  
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
  });
}
