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

// Fetch user data from GitHub
async function getUserData() {
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
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const userData = await response.json();
        document.getElementById('userAvatar').src = userData.avatar_url;
        document.getElementById('userName').textContent = userData.name || userData.login;
    } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/luscalab/index.html';
    }
}

document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('github_code');
    window.location.href = '/luscalab/index.html';
});

getUserData();