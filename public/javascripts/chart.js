document.addEventListener('DOMContentLoaded', function () {
    const data = window.followHistory || [];
    const ctx = document.getElementById('followerChart').getContext('2d');
    const dateLabels = data.map(d => d.date);
    const accent2 = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent2')
        .trim() || '#F56040';

    let currentType = 'followers';
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabels,
            datasets: [{
                label: 'Followers',
                data: data.map(d => d.followers),
                borderColor: accent2,
                backgroundColor: accent2 + '33',
                pointBackgroundColor: accent2,
                pointBorderColor: accent2,
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
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
