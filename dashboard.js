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
        this.orders = [];
        this.userData = null;
    }

    async init() {
        await this.loadUserData();
        this.setupEventListeners();
        this.loadOrders();
    }

    async loadUserData() {
        const code = localStorage.getItem('github_code');
        if (!code) {
            window.location.href = '/luscalab/index.html';
            return;
        }

        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${code}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to load user data');
            
            this.userData = await response.json();
            this.updateProfile();
        } catch (error) {
            console.error('Error:', error);
            window.location.href = '/luscalab/index.html';
        }
    }

    updateProfile() {
        document.getElementById('userAvatar').src = this.userData.avatar_url;
        document.getElementById('userName').textContent = this.userData.name || this.userData.login;
    }

    setupEventListeners() {
        document.getElementById('logout').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('github_code');
            window.location.href = '/luscalab/index.html';
        });
    }

    loadOrders() {
        // Placeholder for loading orders
        // This will be implemented when we add the order system
    }
}

// Initialize dashboard
const dashboard = new Dashboard();
document.addEventListener('DOMContentLoaded', () => dashboard.init());