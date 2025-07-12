document.addEventListener('DOMContentLoaded', function () {
    const data = window.followHistory || [];
    const ctx = document.getElementById('followerChart').getContext('2d');
    const dateLabels = data.map(d => d.date);

    let currentType = 'followers';
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabels,
            datasets: [{
                label: 'Followers',
                data: data.map(d => d.followers),
                borderColor: '#405DE6',
                backgroundColor: 'rgba(64,93,230,0.07)',
                fill: true,
                tension: 0.2,
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            responsive: true,
            scales: { y: { beginAtZero: false } }
        }
    });

    document.getElementById('followersTab').addEventListener('click', function() {
        if(currentType !== 'followers') {
            chart.data.datasets[0].label = 'Followers';
            chart.data.datasets[0].data = data.map(d => d.followers);
            chart.update();
            currentType = 'followers';
        }
    });

    document.getElementById('followingTab').addEventListener('click', function() {
        if(currentType !== 'following') {
            chart.data.datasets[0].label = 'Following';
            chart.data.datasets[0].data = data.map(d => d.following);
            chart.update();
            currentType = 'following';
        }
    });
});
