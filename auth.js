const clientId = 'Ov23liQxQxjHjqn4D8ee'; // Replace with your actual Client ID
const redirectUri = 'https://luscalab.github.io/luscalab/callback.html';

document.getElementById('githubLogin').addEventListener('click', (e) => {
    e.preventDefault();
    const scope = 'user';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
});