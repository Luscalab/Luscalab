<!-- filepath: c:\Users\Ruan&Luan\meu_site\index.html -->
<script src="auth.js" defer></script>

const clientId = 'Ov23liQxQxjHjqn4D8ee'; // Replace with your actual Client ID
const redirectUri = 'https://luscalab.github.io/luscalab/callback.html';

class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.userData = null;
    }

    init() {
        const loginButton = document.getElementById('githubLogin');
        if (loginButton) {
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.login();
            });
        }

        // Check if user is already logged in
        this.checkAuth();
    }

    login() {
        const scope = 'user';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    }

    checkAuth() {
        const code = localStorage.getItem('github_code');
        if (code) {
            this.isAuthenticated = true;
            this.loadUserData();
        }
    }

    async loadUserData() {
        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('github_code')}`
                }
            });
            
            if (response.ok) {
                this.userData = await response.json();
                this.updateUI();
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    updateUI() {
        const loginButton = document.getElementById('githubLogin');
        if (loginButton && this.isAuthenticated) {
            loginButton.textContent = 'Minha Conta';
            loginButton.href = '/luscalab/dashboard.html';
        }
    }
}

// Initialize authentication
const auth = new AuthManager();
document.addEventListener('DOMContentLoaded', () => auth.init());