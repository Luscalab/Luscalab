<!-- filepath: c:\Users\Ruan&Luan\meu_site\index.html -->
<script src="auth.js" defer></script>

const clientId = 'Ov23liQxQxjHjqn4D8ee'; // Replace with your actual Client ID
const redirectUri = 'https://luscalab.github.io/luscalab/callback.html';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('githubLogin');
    
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botão de login clicado');
            const scope = 'user';
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        });
    } else {
        console.error('Botão de login não encontrado');
    }
});