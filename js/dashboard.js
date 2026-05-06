let currentUser = null;
let database = null;

document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    currentUser = getCurrentUser();
    database = getDatabase();
    
    initializeDashboard();
    buildSidebar();
    renderDashboard();
});

function initializeDashboard() {
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
}

function buildSidebar() {
    const nav = document.getElementById('sidebarNav');
    const menuItems = getMenuItems();
    
    nav.innerHTML = menuItems.map(item => `
        <div class="nav-item" onclick="navigateTo('${item.action}')">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.label}</span>
        </div>
    `).join('');
}

function getMenuItems() {
    const baseItems = [
        { icon: '📊', label: 'Dashboard', action: 'dashboard' }
    ];
    
    if (currentUser.role === 'director') {
        return [
            ...baseItems,
            { icon: '📝', label: 'My Lesson', action: 'myLesson' },
            { icon: '👨‍🎓', label: 'Students', action: 'students' },
            { icon: '🏫', label: 'Classes', action: 'classes' },
            { icon: '📚', label: 'Subjects', action: 'subjects' },
            { icon: '📈', label: 'Grades', action: 'allGrades' },
            { icon: '📋', label: 'Absences', action: 'allAbsences' },
            { icon: '⚙️', label: 'Settings', action: 'settings' }
        ];
    } else if (currentUser.role === 'teacher') {
        return [
            ...baseItems,
            { icon: '📝', label: 'My Lesson', action: 'myLesson' },
            { icon: '👨‍🎓', label: 'My Classes', action: 'myClasses' },
            { icon: '📚', label: 'My Subjects', action: 'mySubjects' },
            { icon: '📈', label: 'Grades', action: 'allGrades' },
            { icon: '📋', label: 'Absences', action: 'allAbsences' },
            { icon: '⚙️', label: 'Settings', action: 'settings' }
        ];
    } else if (currentUser.role === 'student') {
        return [
            ...baseItems,
            { icon: '📈', label: 'My Grades', action: 'myGrades' },
            { icon: '📋', label: 'My Absences', action: 'myAbsences' },
            { icon: '⭐', label: 'My Praises', action: 'myPraises' },
            { icon: '🚫', label: 'My Remarks', action: 'myRemarks' },
            { icon: '📅', label: 'Schedule', action: 'schedule' },
            { icon: '⚙️', label: 'Settings', action: 'settings' }
        ];
    } else if (currentUser.role === 'parent') {
        return [
            ...baseItems,
            { icon: '📈', label: "Child's Grades", action: 'childGrades' },
            { icon: '📋', label: "Child's Absences", action: 'childAbsences' },
            { icon: '⭐', label: "Child's Praises", action: 'childPraises' },
            { icon: '🚫', label: "Child's Remarks", action: 'childRemarks' },
            { icon: '🔔', label: 'Notifications', action: 'notifications' },
            { icon: '⚙️', label: 'Settings', action: 'settings' }
        ];
    }
    
    return baseItems;
}

function navigateTo(action) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
    
    if (action === 'dashboard') renderDashboard();
    else if (action === 'myLesson') renderMyLesson();
    else if (action === 'students') renderStudents();
    else if (action === 'classes') renderClasses();
    else if (action === 'subjects') renderSubjects();
    else if (action === 'allGrades') renderAllGrades();
    else if (action === 'allAbsences') renderAllAbsences();
    else if (action === 'myClasses') renderMyClasses();
    else if (action === 'mySubjects') renderMySubjects();
    else if (action === 'myGrades') renderMyGrades();
    else if (action === 'myAbsences') renderMyAbsences();
    else if (action === 'myPraises') renderMyPraises();
    else if (action === 'myRemarks') renderMyRemarks();
    else if (action === 'childGrades') renderChildGrades();
    else if (action === 'childAbsences') renderChildAbsences();
    else if (action === 'childPraises') renderChildPraises();
    else if (action === 'childRemarks') renderChildRemarks();
    else if (action === 'schedule') renderSchedule();
    else if (action === 'notifications') renderNotifications();
    else if (action === 'settings') renderSettings();
}

// Dashboard renderers
function renderDashboard() {
    if (currentUser.role === 'director') renderDirectorDashboard();
    else if (currentUser.role === 'teacher') renderTeacherDashboard();
    else if (currentUser.role === 'student') renderStudentDashboard();
    else if (currentUser.role === 'parent') renderParentDashboard();
}

function renderDirectorDashboard() {
    const students = database.users.filter(u => u.role === 'student').length;
    const teachers = database.users.filter(u => u.role === 'teacher').length;
    const classes = database.classes.length;
    const subjects = database.subjects.length;
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">👨‍💼 Director Dashboard</h1>
            <p class="page-subtitle">Welcome back, ${currentUser.name}. Here's your school overview.</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">Total Students</div>
                <div class="stat-value">${students}</div>
                <div class="stat-change">+3 this month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Teachers</div>
                <div class="stat-value">${teachers}</div>
                <div class="stat-change">All active</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Active Classes</div>
                <div class="stat-value">${classes}</div>
                <div class="stat-change">Fully staffed</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Subjects</div>
                <div class="stat-value">${subjects}</div>
                <div class="stat-change">All assigned</div>
            </div>
        </div>
        
        <h2 class="section-title">📊 Recent Grades</h2>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    ${database.grades.slice(-5).reverse().map(g => {
                        const student = database.users.find(u => u.id === g.studentId);
                        const subject = database.subjects.find(s => s.id === g.subjectId);
                        return `
                            <tr>
                                <td>${student?.name || 'Unknown'}</td>
                                <td>${subject?.name || 'Unknown'}</td>
                                <td><span class="grade grade-${g.grade}">${g.grade}</span></td>
                                <td>${g.type}</td>
                                <td>${g.date}</td>
                                <td>${g.comment}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        
        <h2 class="section-title">📋 Recent Absences</h2>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Reason</th>
                        <th>Excuse</th>
                    </tr>
                </thead>
                <tbody>
                    ${database.absences.slice(-5).reverse().map(a => {
                        const student = database.users.find(u => u.id === a.studentId);
                        return `
                            <tr>
                                <td>${student?.name || 'Unknown'}</td>
                                <td>${a.date}</td>
                                <td><span class="badge badge-${a.type}">${a.type}</span></td>
                                <td>${a.reason || '-'}</td>
                                <td>${a.excuse ? '✓ Yes' : '✗ No'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

function renderTeacherDashboard() {
    const myClasses = database.classes.filter(c => c.teacher === currentUser.id);
    const mySubjects = database.subjects.filter(s => s.teacher === currentUser.id);
    const gradeCount = database.grades.length;
    const absenceCount = database.absences.length;
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">👨‍🏫 Teacher Dashboard</h1>
            <p class="page-subtitle">Welcome, ${currentUser.name}. Manage your classes and grades.</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">My Classes</div>
                <div class="stat-value">${myClasses.length}</div>
                <div class="stat-change">Active classes</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">My Subjects</div>
                <div class="stat-value">${mySubjects.length}</div>
                <div class="stat-change">Assigned</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Grades Recorded</div>
                <div class="stat-value">${gradeCount}</div>
                <div class="stat-change">This term</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Absences Tracked</div>
                <div class="stat-value">${absenceCount}</div>
                <div class="stat-change">This term</div>
            </div>
        </div>
        
        <h2 class="section-title">📚 My Classes</h2>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Grade</th>
                        <th>Students</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${myClasses.map(cls => `
                        <tr>
                            <td><strong>${cls.name}</strong></td>
                            <td>${cls.grade}</td>
                            <td>${cls.students.length} students</td>
                            <td><span class="badge badge-present">Active</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

function renderStudentDashboard() {
    const myGrades = database.grades.filter(g => g.studentId === currentUser.id);
    const myAbsences = database.absences.filter(a => a.studentId === currentUser.id);
    const myPraises = database.praises.filter(p => p.studentId === currentUser.id);
    const avgGrade = myGrades.length ? (myGrades.reduce((a,b) => a + b.grade, 0) / myGrades.length).toFixed(2) : 'N/A';
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">👨‍🎓 My Dashboard</h1>
            <p class="page-subtitle">Hi ${currentUser.name}, here's your academic overview.</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">Average Grade</div>
                <div class="stat-value">${avgGrade}</div>
                <div class="stat-change">${myGrades.length} grades</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">My Grades</div>
                <div class="stat-value">${myGrades.length}</div>
                <div class="stat-change">This term</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Absences</div>
                <div class="stat-value">${myAbsences.length}</div>
                <div class="stat-change">This term</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Praises</div>
                <div class="stat-value">${myPraises.length}</div>
                <div class="stat-change">Received</div>
            </div>
        </div>
        
        <h2 class="section-title">📈 My Recent Grades</h2>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    ${myGrades.slice(-5).reverse().map(g => {
                        const subject = database.subjects.find(s => s.id === g.subjectId);
                        return `
                            <tr>
                                <td>${subject?.name || 'Unknown'}</td>
                                <td><span class="grade grade-${g.grade}">${g.grade}</span></td>
                                <td>${g.type}</td>
                                <td>${g.date}</td>
                                <td>${g.comment}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

function renderParentDashboard() {
    const child = database.users.find(u => u.id === currentUser.childId);
    if (!child) {
        document.getElementById('content').innerHTML = '<div class="page-header"><p>No child assigned to your account.</p></div>';
        return;
    }
    
    const childGrades = database.grades.filter(g => g.studentId === child.id);
    const childAbsences = database.absences.filter(a => a.studentId === child.id);
    const childPraises = database.praises.filter(p => p.studentId === child.id);
    const avgGrade = childGrades.length ? (childGrades.reduce((a,b) => a + b.grade, 0) / childGrades.length).toFixed(2) : 'N/A';
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">👨‍👩‍👧 Parent Dashboard</h1>
            <p class="page-subtitle">Monitoring ${child.name}'s progress</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">Child's Average</div>
                <div class="stat-value">${avgGrade}</div>
                <div class="stat-change">${childGrades.length} grades</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Grades Received</div>
                <div class="stat-value">${childGrades.length}</div>
                <div class="stat-change">This term</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Absences</div>
                <div class="stat-value">${childAbsences.length}</div>
                <div class="stat-change">This term</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Praises</div>
                <div class="stat-value">${childPraises.length}</div>
                <div class="stat-change">Received</div>
            </div>
        </div>
        
        <h2 class="section-title">📈 ${child.name}'s Grades</h2>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${childGrades.map(g => {
                        const subject = database.subjects.find(s => s.id === g.subjectId);
                        return `
                            <tr>
                                <td>${subject?.name || 'Unknown'}</td>
                                <td><span class="grade grade-${g.grade}">${g.grade}</span></td>
                                <td>${g.type}</td>
                                <td>${g.date}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// My Lesson
function renderMyLesson() {
    if (currentUser.role !== 'teacher' && currentUser.role !== 'director') {
        document.getElementById('content').innerHTML = '<div class="page-header"><p>Access denied. Only teachers and directors can use this feature.</p></div>';
        return;
    }
    
    const myClasses = database.classes.filter(c => c.teacher === currentUser.id);
    const mySubjects = database.subjects.filter(s => s.teacher === currentUser.id);
    const students = database.users.filter(u => u.role === 'student');
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">📝 My Lesson</h1>
            <p class="page-subtitle">Record grades, attendance, and remarks for your lessons</p>
        </div>
        
        <div class="lesson-container">
            <div class="lesson-grid">
                <div class="form-group">
                    <label>Select Class</label>
                    <select id="lessonClass">
                        <option value="">Choose a class...</option>
                        ${myClasses.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Select Subject</label>
                    <select id="lessonSubject">
                        <option value="">Choose a subject...</option>
                        ${mySubjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="lessonDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>Lesson Hour</label>
                    <select id="lessonHour">
                        <option value="1">1st Hour</option>
                        <option value="2">2nd Hour</option>
                        <option value="3">3rd Hour</option>
                        <option value="4">4th Hour</option>
                        <option value="5">5th Hour</option>
                        <option value="6">6th Hour</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Lesson Topic</label>
                    <input type="text" id="lessonTopic" placeholder="Enter topic...">
                </div>
            </div>
            
            <div class="topic-section">
                <input type="text" id="topicText" placeholder="Enter additional lesson notes..." style="flex: 1;">
                <button class="btn btn-primary" onclick="saveLessonTopic()">Save Topic</button>
            </div>
            
            <h2 class="section-title">👥 Students</h2>
            <div class="students-grid">
                ${students.map(student => `
                    <div class="student-row">
                        <div class="student-name">${student.name}</div>
                        <select class="att-${student.id}" style="padding: 0.5rem;">
                            <option value="">Attendance</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="late">Late</option>
                            <option value="excused">Excused</option>
                        </select>
                        <input type="number" min="2" max="6" placeholder="Grade" class="grade-${student.id}" style="padding: 0.5rem;">
                        <div class="action-buttons">
                            <button class="action-btn action-btn-success" onclick="addPraise(${student.id})">+Praise</button>
                            <button class="action-btn action-btn-primary" onclick="addRemark(${student.id})">+Remark</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="lesson-actions">
                <button class="btn btn-primary" onclick="saveLessonData()">💾 Save Lesson Data</button>
                <button class="btn btn-success" onclick="completeLessonData()">✓ Mark as Completed</button>
            </div>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

function saveLessonTopic() {
    const topic = document.getElementById('topicText').value;
    if (!topic) {
        showToast('Please enter a lesson topic', 'warning');
        return;
    }
    
    const lesson = {
        id: Date.now(),
        classId: document.getElementById('lessonClass').value,
        subjectId: document.getElementById('lessonSubject').value,
        date: document.getElementById('lessonDate').value,
        hour: document.getElementById('lessonHour').value,
        topic: topic,
        teacherId: currentUser.id,
        completed: false
    };
    
    database.lessons.push(lesson);
    saveDatabase(database);
    showToast('Lesson topic saved successfully!');
    document.getElementById('topicText').value = '';
}

function saveLessonData() {
    const classId = document.getElementById('lessonClass').value;
    if (!classId) {
        showToast('Please select a class', 'warning');
        return;
    }
    
    database.users.forEach(student => {
        if (student.role === 'student') {
            const gradeInput = document.querySelector(`.grade-${student.id}`);
            const attInput = document.querySelector(`.att-${student.id}`);
            
            if (gradeInput?.value) {
                database.grades.push({
                    id: Date.now() + Math.random(),
                    studentId: student.id,
                    subjectId: parseInt(document.getElementById('lessonSubject').value || 1),
                    grade: parseInt(gradeInput.value),
                    type: 'class activity',
                    date: document.getElementById('lessonDate').value,
                    comment: ''
                });
            }
            
            if (attInput?.value) {
                database.absences.push({
                    id: Date.now() + Math.random(),
                    studentId: student.id,
                    date: document.getElementById('lessonDate').value,
                    type: attInput.value,
                    reason: '',
                    excuse: false
                });
            }
        }
    });
    
    saveDatabase(database);
    showToast('Lesson data saved successfully!');
}

function completeLessonData() {
    const classId = document.getElementById('lessonClass').value;
    if (!classId) {
        showToast('Please select a class', 'warning');
        return;
    }
    
    showToast('Lesson marked as completed!');
}

function addPraise(studentId) {
    const praise = prompt('Enter praise message:');
    if (!praise) return;
    
    database.praises.push({
        id: Date.now(),
        studentId: studentId,
        praise: praise,
        date: new Date().toISOString().split('T')[0],
        teacherId: currentUser.id
    });
    
    saveDatabase(database);
    showToast('Praise added successfully!');
}

function addRemark(studentId) {
    const remark = prompt('Enter remark:');
    if (!remark) return;
    
    database.remarks.push({
        id: Date.now(),
        studentId: studentId,
        remark: remark,
        date: new Date().toISOString().split('T')[0],
        teacherId: currentUser.id
    });
    
    saveDatabase(database);
    showToast('Remark added successfully!');
}

// Students
function renderStudents() {
    const students = database.users.filter(u => u.role === 'student');
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">👨‍🎓 Students</h1>
            <p class="page-subtitle">Manage all students in the system</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(s => {
                        const cls = database.classes.find(c => c.id === s.classId);
                        return `
                            <tr>
                                <td>${s.name}</td>
                                <td>${s.email}</td>
                                <td>${cls?.name || '-'}</td>
                                <td><span class="badge badge-present">${s.active ? 'Active' : 'Inactive'}</span></td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Classes
function renderClasses() {
    const html = `
        <div class="page-header">
            <h1 class="page-title">🏫 Classes</h1>
            <p class="page-subtitle">Manage school classes</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Grade</th>
                        <th>Teacher</th>
                        <th>Students</th>
                    </tr>
                </thead>
                <tbody>
                    ${database.classes.map(c => {
                        const teacher = database.users.find(u => u.id === c.teacher);
                        return `
                            <tr>
                                <td><strong>${c.name}</strong></td>
                                <td>${c.grade}</td>
                                <td>${teacher?.name || 'Unassigned'}</td>
                                <td>${c.students.length} students</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Subjects
function renderSubjects() {
    const html = `
        <div class="page-header">
            <h1 class="page-title">📚 Subjects</h1>
            <p class="page-subtitle">Manage school subjects</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Teacher</th>
                        <th>Class</th>
                    </tr>
                </thead>
                <tbody>
                    ${database.subjects.map(s => {
                        const teacher = database.users.find(u => u.id === s.teacher);
                        const cls = database.classes.find(c => c.id === s.classId);
                        return `
                            <tr>
                                <td><strong>${s.name}</strong></td>
                                <td>${teacher?.name || 'Unassigned'}</td>
                                <td>${cls?.name || '-'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// All Grades
function renderAllGrades() {
    const html = `
        <div class="page-header">
            <h1 class="page-title">📈 All Grades</h1>
            <p class="page-subtitle">Complete grade records</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    ${database.grades.map(g => {
                        const student = database.users.find(u => u.id === g.studentId);
                        const subject = database.subjects.find(s => s.id === g.subjectId);
                        return `
                            <tr>
                                <td>${student?.name || 'Unknown'}</td>
                                <td>${subject?.name || 'Unknown'}</td>
                                <td><span class="grade grade-${g.grade}">${g.grade}</span></td>
                                <td>${g.type}</td>
                                <td>${g.date}</td>
                                <td>${g.comment}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// All Absences
function renderAllAbsences() {
    const html = `
        <div class="page-header">
            <h1 class="page-title">📋 All Absences</h1>
            <p class="page-subtitle">Complete absence records</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Reason</th>
                        <th>Excuse</th>
                    </tr>
                </thead>
                <tbody>
                    ${database.absences.map(a => {
                        const student = database.users.find(u => u.id === a.studentId);
                        return `
                            <tr>
                                <td>${student?.name || 'Unknown'}</td>
                                <td>${a.date}</td>
                                <td><span class="badge badge-${a.type}">${a.type}</span></td>
                                <td>${a.reason || '-'}</td>
                                <td>${a.excuse ? '✓' : '✗'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// My Classes
function renderMyClasses() {
    const myClasses = database.classes.filter(c => c.teacher === currentUser.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">👨‍🎓 My Classes</h1>
            <p class="page-subtitle">Classes you teach</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Grade</th>
                        <th>Students</th>
                    </tr>
                </thead>
                <tbody>
                    ${myClasses.map(c => `
                        <tr>
                            <td><strong>${c.name}</strong></td>
                            <td>${c.grade}</td>
                            <td>${c.students.length}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// My Subjects
function renderMySubjects() {
    const mySubjects = database.subjects.filter(s => s.teacher === currentUser.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">📚 My Subjects</h1>
            <p class="page-subtitle">Subjects you teach</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Class</th>
                    </tr>
                </thead>
                <tbody>
                    ${mySubjects.map(s => {
                        const cls = database.classes.find(c => c.id === s.classId);
                        return `
                            <tr>
                                <td>${s.name}</td>
                                <td>${cls?.name || '-'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// My Grades
function renderMyGrades() {
    const myGrades = database.grades.filter(g => g.studentId === currentUser.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">📈 My Grades</h1>
            <p class="page-subtitle">Your academic records</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    ${myGrades.map(g => {
                        const subject = database.subjects.find(s => s.id === g.subjectId);
                        return `
                            <tr>
                                <td>${subject?.name || 'Unknown'}</td>
                                <td><span class="grade grade-${g.grade}">${g.grade}</span></td>
                                <td>${g.type}</td>
                                <td>${g.date}</td>
                                <td>${g.comment}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// My Absences
function renderMyAbsences() {
    const myAbsences = database.absences.filter(a => a.studentId === currentUser.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">📋 My Absences</h1>
            <p class="page-subtitle">Your absence records</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Reason</th>
                        <th>Excuse</th>
                    </tr>
                </thead>
                <tbody>
                    ${myAbsences.map(a => `
                        <tr>
                            <td>${a.date}</td>
                            <td><span class="badge badge-${a.type}">${a.type}</span></td>
                            <td>${a.reason || '-'}</td>
                            <td>${a.excuse ? '✓' : '✗'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// My Praises
function renderMyPraises() {
    const myPraises = database.praises.filter(p => p.studentId === currentUser.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">⭐ My Praises</h1>
            <p class="page-subtitle">Positive feedback received</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Praise</th>
                        <th>Teacher</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${myPraises.map(p => {
                        const teacher = database.users.find(u => u.id === p.teacherId);
                        return `
                            <tr>
                                <td>${p.praise}</td>
                                <td>${teacher?.name || 'Unknown'}</td>
                                <td>${p.date}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// My Remarks
function renderMyRemarks() {
    const myRemarks = database.remarks.filter(r => r.studentId === currentUser.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">🚫 My Remarks</h1>
            <p class="page-subtitle">Behavior notes</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Remark</th>
                        <th>Teacher</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${myRemarks.map(r => {
                        const teacher = database.users.find(u => u.id === r.teacherId);
                        return `
                            <tr>
                                <td>${r.remark}</td>
                                <td>${teacher?.name || 'Unknown'}</td>
                                <td>${r.date}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Child Grades
function renderChildGrades() {
    const child = database.users.find(u => u.id === currentUser.childId);
    if (!child) {
        document.getElementById('content').innerHTML = '<div class="page-header"><p>No child assigned</p></div>';
        return;
    }
    
    const grades = database.grades.filter(g => g.studentId === child.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">📈 ${child.name}'s Grades</h1>
            <p class="page-subtitle">Academic performance</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${grades.map(g => {
                        const subject = database.subjects.find(s => s.id === g.subjectId);
                        return `
                            <tr>
                                <td>${subject?.name || 'Unknown'}</td>
                                <td><span class="grade grade-${g.grade}">${g.grade}</span></td>
                                <td>${g.type}</td>
                                <td>${g.date}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Child Absences
function renderChildAbsences() {
    const child = database.users.find(u => u.id === currentUser.childId);
    if (!child) {
        document.getElementById('content').innerHTML = '<div class="page-header"><p>No child assigned</p></div>';
        return;
    }
    
    const absences = database.absences.filter(a => a.studentId === child.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">📋 ${child.name}'s Absences</h1>
            <p class="page-subtitle">Attendance records</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Excuse</th>
                    </tr>
                </thead>
                <tbody>
                    ${absences.map(a => `
                        <tr>
                            <td>${a.date}</td>
                            <td><span class="badge badge-${a.type}">${a.type}</span></td>
                            <td>${a.excuse ? '✓' : '✗'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Child Praises
function renderChildPraises() {
    const child = database.users.find(u => u.id === currentUser.childId);
    if (!child) {
        document.getElementById('content').innerHTML = '<div class="page-header"><p>No child assigned</p></div>';
        return;
    }
    
    const praises = database.praises.filter(p => p.studentId === child.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">⭐ ${child.name}'s Praises</h1>
            <p class="page-subtitle">Positive feedback</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Praise</th>
                        <th>Teacher</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${praises.map(p => {
                        const teacher = database.users.find(u => u.id === p.teacherId);
                        return `
                            <tr>
                                <td>${p.praise}</td>
                                <td>${teacher?.name || 'Unknown'}</td>
                                <td>${p.date}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Child Remarks
function renderChildRemarks() {
    const child = database.users.find(u => u.id === currentUser.childId);
    if (!child) {
        document.getElementById('content').innerHTML = '<div class="page-header"><p>No child assigned</p></div>';
        return;
    }
    
    const remarks = database.remarks.filter(r => r.studentId === child.id);
    
    const html = `
        <div class="page-header">
            <h1 class="page-title">🚫 ${child.name}'s Remarks</h1>
            <p class="page-subtitle">Behavior notes</p>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Remark</th>
                        <th>Teacher</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${remarks.map(r => {
                        const teacher = database.users.find(u => u.id === r.teacherId);
                        return `
                            <tr>
                                <td>${r.remark}</td>
                                <td>${teacher?.name || 'Unknown'}</td>
                                <td>${r.date}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Schedule
function renderSchedule() {
    const html = `
        <div class="page-header">
            <h1 class="page-title">📅 Schedule</h1>
            <p class="page-subtitle">Coming soon</p>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Notifications
function renderNotifications() {
    const html = `
        <div class="page-header">
            <h1 class="page-title">🔔 Notifications</h1>
            <p class="page-subtitle">No new notifications</p>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Settings
function renderSettings() {
    const html = `
        <div class="page-header">
            <h1 class="page-title">⚙️ Settings</h1>
            <p class="page-subtitle">Account and application settings</p>
        </div>
        <div style="background: white; padding: 2rem; border-radius: 1rem; margin-top: 2rem;">
            <p>Settings interface coming soon...</p>
        </div>
    `;
    
    document.getElementById('content').innerHTML = html;
}

// Settings toggle
function toggleSettings() {
    showToast('Settings panel opening...');
}
