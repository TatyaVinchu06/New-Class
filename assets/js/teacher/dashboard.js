// teacher-dashboard.js
// Handles interaction for the teacher dashboard

document.addEventListener('DOMContentLoaded', () => {
    // Load Stats from Storage
    const stats = Storage.getStats();

    if (stats) {
        document.getElementById('statBatches').textContent = stats.activeBatches;
        document.getElementById('statReviews').textContent = stats.pendingReviews;
        document.getElementById('statStudents').textContent = stats.totalStudents;
    }
});

// (Keep existing code if any, or start fresh if duplicate logic exists)
// Original DOMContentLoaded might conflict, checking for separation...

// Set Teacher Session for Sidebar
sessionStorage.setItem('currentUser', JSON.stringify({
    id: 'CS_012',
    name: 'Dr. Sharma',
    email: 'dr.sharma@college.edu',
    role: 'teacher',
    subjects: ['CS301', 'CS204']
}));

// Get Current Teacher Subjects
const teacherMeta = JSON.parse(sessionStorage.getItem('currentUser'));
const mySubjects = teacherMeta.subjects || [];

console.log('Teacher Dashboard Loaded. Subjects:', mySubjects);

// Filter "My Classes" list
// Filter "My Classes" list - DISABLED to show all demo classes as requested
// const classItems = document.querySelectorAll('.feed-item');
// classItems.forEach(item => { ... });

console.log('Teacher Dashboard Loaded');



// Animate stats numbers on load
const statsNumbers = document.querySelectorAll('.t-stat-info h3');
statsNumbers.forEach(stat => {
    const finalValue = parseInt(stat.innerText);
    animateValue(stat, 0, finalValue, 1500);
});

// "Grade" button interaction
const gradeButtons = document.querySelectorAll('button[style*="color: #3b82f6"]');
gradeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.innerHTML = '<i class="fas fa-check"></i> Done';
        btn.style.color = '#10b981';
        btn.disabled = true;
    });
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}