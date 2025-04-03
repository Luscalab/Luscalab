const clientId = 'YOUR_GITHUB_CLIENT_ID';

document.getElementById('githubLogin').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;
});