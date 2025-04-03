const clientId = 'Ov23liQxQxjHjqn4D8ee';
const redirectUri = 'https://luscalab.github.io/luscalab/callback.html';

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('githubLogin');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botão de login clicado');
            const scope = 'user';
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        });
    }
});

class Dashboard {
    constructor() {
        this.userData = null;
    }

    async init() {
        await this.loadUserData();
        this.setupLogout();
    }

    async loadUserData() {
        const token = localStorage.getItem('github_token');
        if (!token) {
            window.location.href = '/luscalab/index.html';
            return;
        }

        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to load user data');
            }
            
            this.userData = await response.json();
            this.updateProfile();
        } catch (error) {
            console.error('Error:', error);
            window.location.href = '/luscalab/index.html';
        }
    }

    updateProfile() {
        const avatar = document.getElementById('userAvatar');
        const name = document.getElementById('userName');
        
        if (this.userData) {
            avatar.src = this.userData.avatar_url;
            name.textContent = this.userData.name || this.userData.login;
        }
    }

    setupLogout() {
        document.getElementById('logout').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('github_code');
            window.location.href = '/luscalab/index.html';
        });
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    dashboard.init();
});