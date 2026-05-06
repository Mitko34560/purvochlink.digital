document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    if (!user) window.location.href = 'login.html';
    
    document.getElementById('userName').textContent = user.name;
    renderSidebar(user);
    renderDashboard(user);
});

function renderSidebar(user) {
    const nav = document.getElementById('sidebarNav');
    const menus = {
        director: ['Dashboard', 'My Lesson', 'Manage Classes', 'Manage Subjects', 'Users', 'Reports'],
        teacher: ['Dashboard', 'My Lesson', 'My Classes', 'My Subjects', 'Grades', 'Attendance'],
        student: ['Dashboard', 'My Grades', 'My Absences', 'My Schedule', 'Remarks', 'Praises'],
        parent: ['Dashboard', 'Child Grades', 'Child Absences', 'Notifications']
    };
    
    nav.innerHTML = (menus[user.role] || []).map(menu => 
        `<a onclick="selectMenu('${menu}')" class="${menu === 'Dashboard' ? 'active' : ''}">${menu}</a>`
    ).join('');
}

function selectMenu(menu) {
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    event.target.classList.add('active');
    renderContent(getCurrentUser(), menu);
}

function renderDashboard(user) {
    renderContent(user, 'Dashboard');
}

function renderContent(user, menu) {
    const content = document.getElementById('contentArea');
    
    if (menu === 'Dashboard') {
        if (user.role === 'director') renderDirectorDashboard();
        else if (user.role === 'teacher') renderTeacherDashboard();
        else if (user.role === 'student') renderStudentDashboard();
        else if (user.role === 'parent') renderParentDashboard();
    } else if (menu === 'My Lesson') {
        renderMyLesson(user);
    } else {
        content.innerHTML = `<h2>${menu}</h2><p>Content for ${menu}</p>`;
    }
}

function renderDirectorDashboard() {
    const users = getUsers();
    const classes = DATABASE.classes || [];
    const grades = getGrades();
    const absences = getAbsences();
    
    document.getElementById('contentArea').innerHTML = `
        <h1>Director Dashboard</h1>
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">Total Students</div>
                <div class="stat-number">${users.filter(u => u.role === 'student').length}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Teachers</div>
                <div class="stat-number">${users.filter(u => u.role === 'teacher').length}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Classes</div>
                <div class="stat-number">${classes.length || 0}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Grades</div>
                <div class="stat-number">${grades.length || 0}</div>
            </div>
        </div>
    `;
}

function renderTeacherDashboard() {
    const grades = getGrades();
    const absences = getAbsences();
    
    document.getElementById('contentArea').innerHTML = `
        <h1>Teacher Dashboard</h1>
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">Grades Given</div>
                <div class="stat-number">${grades.length || 0}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Absences Recorded</div>
                <div class="stat-number">${absences.length || 0}</div>
            </div>
        </div>
    `;
}

function renderStudentDashboard() {
    const user = getCurrentUser();
    const grades = getGrades().filter(g => g.student_id === user.id);
    const absences = getAbsences().filter(a => a.student_id === user.id);
    
    document.getElementById('contentArea').innerHTML = `
        <h1>My Dashboard</h1>
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">My Grades</div>
                <div class="stat-number">${grades.length || 0}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">My Absences</div>
                <div class="stat-number">${absences.length || 0}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Average Grade</div>
                <div class="stat-number">${grades.length ? (grades.reduce((a,b) => a + b.grade, 0) / grades.length).toFixed(2) : 'N/A'}</div>
            </div>
        </div>
        <h2>My Grades</h2>
        <table class="data-table">
            <tr><th>Subject</th><th>Grade</th><th>Type</th><th>Date</th></tr>
            ${grades.map(g => `<tr><td>Subject ${g.subject_id}</td><td class="grade-${g.grade}">${g.grade}</td><td>${g.type}</td><td>${g.date}</td></tr>`).join('')}
        </table>
    `;
}

function renderParentDashboard() {
    const user = getCurrentUser();
    const child = getUsers().find(u => u.id === user.child_id);
    
    if (!child) {
        document.getElementById('contentArea').innerHTML = '<p>No child assigned</p>';
        return;
    }
    
    const grades = getGrades().filter(g => g.student_id === child.id);
    const absences = getAbsences().filter(a => a.student_id === child.id);
    
    document.getElementById('contentArea').innerHTML = `
        <h1>Dashboard - Monitoring ${child.name}</h1>
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">Child's Grades</div>
                <div class="stat-number">${grades.length || 0}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Child's Absences</div>
                <div class="stat-number">${absences.length || 0}</div>
            </div>
        </div>
        <h2>${child.name}'s Grades</h2>
        <table class="data-table">
            <tr><th>Subject</th><th>Grade</th><th>Date</th></tr>
            ${grades.map(g => `<tr><td>Subject ${g.subject_id}</td><td class="grade-${g.grade}">${g.grade}</td><td>${g.date}</td></tr>`).join('')}
        </table>
    `;
}

function renderMyLesson(user) {
    const classes = DATABASE.classes || [];
    const subjects = DATABASE.subjects || [];
    const students = getUsers().filter(u => u.role === 'student' && u.class_id);
    
    document.getElementById('contentArea').innerHTML = `
        <div class="my-lesson-section">
            <h1>My Lesson</h1>
            <div class="lesson-header">
                <div>
                    <label>Class</label>
                    <select id="lessonClass">
                        <option value="">Select Class</option>
                        ${classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label>Subject</label>
                    <select id="lessonSubject">
                        <option value="">Select Subject</option>
                        ${subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" id="lessonDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div>
                    <label>Hour</label>
                    <select id="lessonHour">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <input type="text" id="lessonTopic" placeholder="Lesson Topic" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                <button onclick="saveLessonTopic()" class="btn btn-primary" style="margin-top: 10px;">Save Topic</button>
            </div>
            
            <h2>Students</h2>
            <table class="data-table">
                <tr>
                    <th>Student Name</th>
                    <th>Attendance</th>
                    <th>Grade</th>
                    <th>Actions</th>
                </tr>
                ${students.map(s => `
                    <tr>
                        <td>${s.name}</td>
                        <td>
                            <select class="attendance-${s.id}">
                                <option value="">-</option>
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="late">Late</option>
                                <option value="excused">Excused</option>
                            </select>
                        </td>
                        <td>
                            <input type="number" min="2" max="6" placeholder="Grade" class="grade-${s.id}" style="width: 60px;">
                        </td>
                        <td>
                            <button onclick="addPraise(${s.id})" class="btn btn-primary">Praise</button>
                            <button onclick="addRemark(${s.id})" class="btn btn-primary">Remark</button>
                        </td>
                    </tr>
                `).join('')}
            </table>
            
            <button onclick="saveLessonData()" class="btn btn-primary" style="margin-top: 20px;">Save Lesson Data</button>
            <button onclick="completeLessonData()" class="btn btn-primary" style="margin-top: 20px; margin-left: 10px;">Mark as Completed</button>
        </div>
    `;
}

function saveLessonTopic() {
    const topic = document.getElementById('lessonTopic').value;
    if (topic) {
        showToast('Topic saved: ' + topic);
    }
}

function saveLessonData() {
    const grades = getGrades();
    const absences = getAbsences();
    const students = getUsers().filter(u => u.role === 'student');
    
    students.forEach(s => {
        const gradeVal = document.querySelector(`.grade-${s.id}`)?.value;
        const attendanceVal = document.querySelector(`.attendance-${s.id}`)?.value;
        
        if (gradeVal) {
            grades.push({
                id: Date.now() + Math.random(),
                student_id: s.id,
                subject_id: parseInt(document.getElementById('lessonSubject').value || 1),
                grade: parseInt(gradeVal),
                type: 'class activity',
                date: document.getElementById('lessonDate').value,
                comment: ''
            });
        }
        
        if (attendanceVal && attendanceVal !== '') {
            absences.push({
                id: Date.now() + Math.random(),
                student_id: s.id,
                date: document.getElementById('lessonDate').value,
                type: attendanceVal,
                reason: '',
                excuse: false
            });
        }
    });
    
    saveGrades(grades);
    saveAbsences(absences);
    showToast('Lesson data saved successfully!');
}

function completeLessonData() {
    showToast('Lesson marked as completed!');
}

function addPraise(studentId) {
    const text = prompt('Enter praise:');
    if (text) {
        const praises = getPraises();
        praises.push({
            id: Date.now(),
            student_id: studentId,
            praise: text,
            date: new Date().toISOString().split('T')[0],
            teacher_id: getCurrentUser().id
        });
        savePraises(praises);
        showToast('Praise added!');
    }
}

function addRemark(studentId) {
    const text = prompt('Enter remark:');
    if (text) {
        const remarks = getRemarks();
        remarks.push({
            id: Date.now(),
            student_id: studentId,
            remark: text,
            date: new Date().toISOString().split('T')[0],
            teacher_id: getCurrentUser().id
        });
        saveRemarks(remarks);
        showToast('Remark added!');
    }
}
