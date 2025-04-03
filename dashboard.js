// Fetch user data from GitHub
async function getUserData() {
    const token = localStorage.getItem('github_token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        const userData = await response.json();
        
        document.getElementById('userAvatar').src = userData.avatar_url;
        document.getElementById('userName').textContent = userData.name || userData.login;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('github_token');
    window.location.href = 'index.html';
});

getUserData();