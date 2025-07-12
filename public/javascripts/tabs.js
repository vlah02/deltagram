document.addEventListener('DOMContentLoaded', () => {
    const followersTab = document.getElementById('followersTab');
    const followingTab = document.getElementById('followingTab');
    const followersContent = document.getElementById('followersContent');
    const followingContent = document.getElementById('followingContent');

    if (followersTab && followingTab && followersContent && followingContent) {
        followersTab.addEventListener('click', () => {
            followersTab.classList.add('active');
            followingTab.classList.remove('active');
            followersContent.style.display = '';
            followingContent.style.display = 'none';
        });
        followingTab.addEventListener('click', () => {
            followersTab.classList.remove('active');
            followingTab.classList.add('active');
            followersContent.style.display = 'none';
            followingContent.style.display = '';
        });
    }
});
