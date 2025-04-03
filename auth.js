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
        const loginButton = document.getElementById('githubLogin');
        if (loginButton) {
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.login();
            });
        }
        this.checkAuth();
    }

    login() {
        const scope = 'user';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scope}`;
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
    const auth = new AuthManager();
    auth.init();
});