<!-- filepath: c:\Users\Ruan&Luan\meu_site\index.html -->
<script src="auth.js" defer></script>

const clientId = 'Ov23liQxQxjHjqn4D8ee'; // Substitua pelo seu Client ID
const redirectUri = 'https://luscalab.github.io/luscalab/callback.html';
const backendUrl = 'https://seu-backend.com/oauth'; // URL do backend para troca de código por token

class AuthManager {
    constructor() {
        this.clientId = 'Ov23liQxQxjHjqn4D8ee';
        this.redirectUri = 'https://luscalab.github.io/luscalab/callback.html';
    }

    init() {
        console.log('AuthManager initialized'); // Debug log
        const loginButton = document.getElementById('githubLogin');
        if (loginButton) {
            console.log('Login button found'); // Debug log
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Login button clicked'); // Debug log
                this.login();
            });
        } else {
            console.error('Login button not found!');
        }
        this.checkAuth();
    }

    login() {
        try {
            const scope = 'user';
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scope}`;
            console.log('Redirecting to:', authUrl); // Debug log
            window.location.href = authUrl;
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    checkAuth() {
        const token = localStorage.getItem('github_token');
        if (token) {
            this.redirectToDashboard();
        }
    }

    redirectToDashboard() {
        window.location.href = '/luscalab/dashboard.html';
    }
}

// Initialize authentication
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug log
    const auth = new AuthManager();
    auth.init();
});

// Add scroll handler
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});