document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const modal = document.getElementById('forgotPasswordModal');
    const closeButton = document.querySelector('.close');

    // Toggle between sign in and sign up forms
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // Forgot password modal
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = "block";
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Silakan isi semua field');
            return;
        }
        
        // Here you would typically send data to server
        console.log('Login attempt with:', { email, password });
        alert('Login berhasil! (Simulasi)');
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Silakan isi semua field');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Password tidak cocok');
            return;
        }
        
        if (password.length < 8) {
            alert('Password minimal 8 karakter');
            return;
        }
        
        // Here you would typically send data to server
        console.log('Registration attempt with:', { name, email, password });
        alert('Pendaftaran berhasil! (Simulasi)');
        
        // Switch to login after registration
        container.classList.remove("right-panel-active");
    });

    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        
        if (!email) {
            alert('Silakan masukkan email Anda');
            return;
        }
        
        // Here you would typically send reset request to server
        console.log('Password reset requested for:', email);
        alert('Link reset password telah dikirim ke email Anda (Simulasi)');
        modal.style.display = "none";
    });

    // Password strength indicator (could be enhanced)
    const regPassword = document.getElementById('regPassword');
    regPassword.addEventListener('input', function() {
        const password = this.value;
        const strengthText = document.createElement('small');
        strengthText.style.display = 'block';
        strengthText.style.marginTop = '-10px';
        strengthText.style.marginBottom = '10px';
        strengthText.style.fontSize = '12px';
        
        if (password.length === 0) {
            strengthText.textContent = '';
            strengthText.style.color = '';
        } else if (password.length < 8) {
            strengthText.textContent = 'Lemah - minimal 8 karakter';
            strengthText.style.color = 'red';
        } else if (password.length < 12) {
            strengthText.textContent = 'Sedang';
            strengthText.style.color = 'orange';
        } else {
            strengthText.textContent = 'Kuat';
            strengthText.style.color = 'green';
        }
        
        // Remove previous indicator if exists
        const existingIndicator = this.nextElementSibling;
        if (existingIndicator && existingIndicator.tagName === 'SMALL') {
            existingIndicator.remove();
        }
        
        this.after(strengthText);
    });
});
