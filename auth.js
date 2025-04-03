<!-- filepath: c:\Users\Ruan&Luan\meu_site\index.html -->
<script src="auth.js" defer></script>

const clientId = 'Ov23liQxQxjHjqn4D8ee'; // Substitua pelo seu Client ID
const redirectUri = 'https://luscalab.github.io/luscalab/callback.html';
const backendUrl = 'https://seu-backend.com/oauth'; // URL do backend para troca de código por token

class AuthManager {
    constructor() {
        this.clientId = 'Ov23liQxQxjHjqn4D8ee';
        this.redirectUri = 'https://luscalab.github.io/luscalab/callback.html';
        this.isAuthenticated = false;
        this.userData = null;
    }

    init() {
        this.loginButton = document.getElementById('githubLogin');
        if (this.loginButton) {
            this.loginButton.addEventListener('click', (e) => {
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
        const code = localStorage.getItem('github_code');
        if (code) {
            this.exchangeCodeForToken(code);
        }
    }

    async exchangeCodeForToken(code) {
        try {
            const response = await fetch(`${backendUrl}/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, clientId, redirectUri })
            });

            if (!response.ok) throw new Error('Erro ao trocar código por token');
            const data = await response.json();
            localStorage.setItem('github_token', data.access_token);
            this.isAuthenticated = true;
            this.loadUserData();
        } catch (error) {
            console.error('Erro na troca de código:', error);
        }
    }

    async loadUserData() {
        const token = localStorage.getItem('github_token');
        if (!token) return;

        try {
            const response = await fetch('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                this.userData = await response.json();
                this.updateUI();
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
        }
    }

    updateUI() {
        if (this.loginButton && this.isAuthenticated) {
            this.loginButton.textContent = 'Área do Cliente';
            this.loginButton.href = '/luscalab/cliente.html'; // Redireciona para a área do cliente
        }
    }
}

// Initialize authentication
document.addEventListener('DOMContentLoaded', () => {
    const auth = new AuthManager();
    auth.init();
});